import json
import time
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.conf import settings
import stripe
from payments.models import BasicFormSubmission, PaymentFormSubmission

# Initialize Stripe with your secret key
stripe.api_key = 'sk_test_YOUR_STRIPE_SECRET_KEY'  # Replace with your actual secret key

def get_client_ip(request):
    """Get the client's IP address"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


@csrf_exempt
@require_http_methods(["POST"])
def submit_basic_form(request):
    """Handle basic form submission"""
    try:
        data = json.loads(request.body)
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone']
        for field in required_fields:
            if not data.get(field):
                return JsonResponse({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }, status=400)
        
        # Save to database
        submission = BasicFormSubmission.objects.create(
            name=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone'),
            message=data.get('message', ''),
            ip_address=get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )
        
        # Send email notification (you can implement this later)
        # send_basic_form_notification(submission)
        
        # Integrate with CRM (you can implement this later)
        # sync_with_crm(submission)
        return JsonResponse({
            'success': True,
            'message': 'Basic form submitted successfully',
            'data': data
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': 'An error occurred while processing your request'
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def submit_payment_form(request):
    """Handle payment form submission"""
    try:
        data = json.loads(request.body)
        
        # Validate required fields for each step
        step1_fields = ['fullName', 'email', 'phone', 'amount']
        step2_fields = ['address', 'city', 'postalCode', 'country']
        
        # Check if all required data is present
        all_required_fields = step1_fields + step2_fields
        for field in all_required_fields:
            if not data.get(field):
                return JsonResponse({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }, status=400)
        
        # Calculate amount (handle custom amount)
        amount = data.get('amount')
        if amount == 'custom':
            custom_amount = data.get('customAmount')
            if not custom_amount or float(custom_amount) < 1:
                return JsonResponse({
                    'success': False,
                    'error': 'Custom amount must be at least $1'
                }, status=400)
            amount = float(custom_amount)
        else:
            amount = float(amount)
        
        # Create Stripe payment intent
        try:
            payment_intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),  # Convert to cents
                currency='usd',
                payment_method_types=['card'],
                metadata={
                    'customer_name': data.get('fullName'),
                    'customer_email': data.get('email'),
                    'customer_phone': data.get('phone'),
                }
            )
        except stripe.error.StripeError as e:
            return JsonResponse({
                'success': False,
                'error': f'Payment processing error: {str(e)}'
            }, status=400)
        
        # Save to database
        submission = PaymentFormSubmission.objects.create(
            # Personal Information
            full_name=data.get('fullName'),
            email=data.get('email'),
            phone=data.get('phone'),
            
            # Billing Address
            address=data.get('address'),
            city=data.get('city'),
            postal_code=data.get('postalCode'),
            country=data.get('country'),
            
            # Payment Information
            card_last4='****',  # Will be updated after payment confirmation
            card_name=data.get('cardName', ''),
            expiry_date='****',  # Will be updated after payment confirmation
            
            # Transaction Details
            transaction_id=payment_intent.id,
            payment_status='pending',
            amount=amount,
            currency='USD',
            
            # Metadata
            ip_address=get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )
        
        return JsonResponse({
            'success': True,
            'message': 'Payment intent created successfully',
            'transaction_id': payment_intent.id,
            'client_secret': payment_intent.client_secret,
            'amount': amount,
            'currency': 'USD',
            'data': {
                'customer': {
                    'name': data.get('fullName'),
                    'email': data.get('email'),
                    'phone': data.get('phone'),
                },
                'billing': {
                    'address': data.get('address'),
                    'city': data.get('city'),
                    'postalCode': data.get('postalCode'),
                    'country': data.get('country'),
                }
            }
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': 'An error occurred while processing your payment'
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def confirm_payment(request):
    """Confirm payment after Stripe confirmation"""
    try:
        data = json.loads(request.body)
        payment_intent_id = data.get('payment_intent_id')
        
        if not payment_intent_id:
            return JsonResponse({
                'success': False,
                'error': 'Payment intent ID is required'
            }, status=400)
        
        # Retrieve the payment intent from Stripe
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        # Update our database record
        try:
            submission = PaymentFormSubmission.objects.get(transaction_id=payment_intent_id)
            submission.payment_status = 'completed' if payment_intent.status == 'succeeded' else 'failed'
            
            # Update card details if available
            if payment_intent.payment_method:
                payment_method = stripe.PaymentMethod.retrieve(payment_intent.payment_method)
                if payment_method.type == 'card':
                    submission.card_last4 = f"****{payment_method.card.last4}"
                    submission.card_name = payment_method.billing_details.name or ''
                    submission.expiry_date = f"{payment_method.card.exp_month:02d}/{payment_method.card.exp_year}"
            
            submission.save()
            
            return JsonResponse({
                'success': True,
                'message': 'Payment confirmed successfully',
                'payment_status': submission.payment_status,
                'transaction_id': submission.transaction_id
            })
            
        except PaymentFormSubmission.DoesNotExist:
            return JsonResponse({
                'success': False,
                'error': 'Payment record not found'
            }, status=404)
            
    except stripe.error.StripeError as e:
        return JsonResponse({
            'success': False,
            'error': f'Stripe error: {str(e)}'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': 'An error occurred while confirming payment'
        }, status=500)
