from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField, RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.images import get_image_model_string
from django.utils import timezone


class BasicFormSubmission(models.Model):
    """
    Model to store basic form submissions
    """
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField(blank=True)
    submitted_at = models.DateTimeField(default=timezone.now)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True)
    
    class Meta:
        verbose_name = "Basic Form Submission"
        verbose_name_plural = "Basic Form Submissions"
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"{self.name} - {self.submitted_at.strftime('%Y-%m-%d %H:%M')}"


class PaymentFormSubmission(models.Model):
    """
    Model to store payment form submissions
    """
    # Personal Information
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
    # Billing Address
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    
    # Payment Information (stored securely - in production, use proper encryption)
    card_last4 = models.CharField(max_length=4, blank=True)
    card_name = models.CharField(max_length=255, blank=True)
    expiry_date = models.CharField(max_length=10, blank=True)  # MM/YY format
    
    # Transaction Details
    transaction_id = models.CharField(max_length=100, blank=True)
    payment_status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('completed', 'Completed'),
            ('failed', 'Failed'),
            ('refunded', 'Refunded'),
        ],
        default='pending'
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=3, default='USD')
    
    # Metadata
    submitted_at = models.DateTimeField(default=timezone.now)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True)
    
    class Meta:
        verbose_name = "Payment Form Submission"
        verbose_name_plural = "Payment Form Submissions"
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"{self.full_name} - {self.submitted_at.strftime('%Y-%m-%d %H:%M')}"
    
    def get_masked_card_number(self):
        """Return masked card number for display"""
        if self.card_last4:
            return f"****-****-****-{self.card_last4}"
        return "N/A"


class PaymentsPage(Page):
    """
    A Payments page with configurable forms and content
    """
    intro_title = models.CharField(
        max_length=255,
        default="Payments",
        help_text="Main title for the payments page"
    )
    
    intro_text = RichTextField(
        blank=True,
        help_text="Introduction text for the payments page"
    )
    
    featured_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Featured image for the payments page"
    )
    
    # Basic Form Settings
    basic_form_enabled = models.BooleanField(
        default=True,
        help_text="Enable the basic information form"
    )
    
    basic_form_title = models.CharField(
        max_length=255,
        default="Basic Information Form",
        help_text="Title for the basic form"
    )
    
    basic_form_description = models.TextField(
        blank=True,
        help_text="Description for the basic form"
    )
    
    # Payment Form Settings
    payment_form_enabled = models.BooleanField(
        default=True,
        help_text="Enable the payment form"
    )
    
    payment_form_title = models.CharField(
        max_length=255,
        default="Payment Form",
        help_text="Title for the payment form"
    )
    
    payment_form_description = models.TextField(
        blank=True,
        help_text="Description for the payment form"
    )
    
    # Step 1 Settings
    step1_title = models.CharField(
        max_length=255,
        default="Personal Information",
        help_text="Title for payment form step 1"
    )
    
    step1_description = models.TextField(
        blank=True,
        help_text="Description for payment form step 1"
    )
    
    # Step 2 Settings
    step2_title = models.CharField(
        max_length=255,
        default="Billing Address",
        help_text="Title for payment form step 2"
    )
    
    step2_description = models.TextField(
        blank=True,
        help_text="Description for payment form step 2"
    )
    
    # Step 3 Settings
    step3_title = models.CharField(
        max_length=255,
        default="Payment Information",
        help_text="Title for payment form step 3"
    )
    
    step3_description = models.TextField(
        blank=True,
        help_text="Description for payment form step 3"
    )
    
    # Payment Processing Settings
    payment_processor = models.CharField(
        max_length=50,
        choices=[
            ('stripe', 'Stripe'),
            ('paypal', 'PayPal'),
            ('square', 'Square'),
            ('manual', 'Manual Processing'),
        ],
        default='manual',
        help_text="Choose payment processor"
    )
    
    publish_key = models.CharField(
        max_length=255,
        blank=True,
        help_text="Publishable key for payment processor"
    )
    
    success_message = models.TextField(
        default="Thank you for your payment! We will process your request shortly.",
        help_text="Message to show after successful payment"
    )
    
    error_message = models.TextField(
        default="There was an error processing your payment. Please try again.",
        help_text="Message to show if payment fails"
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('intro_title'),
            FieldPanel('intro_text'),
            FieldPanel('featured_image'),
        ], heading="Page Content"),
        
        MultiFieldPanel([
            FieldPanel('basic_form_enabled'),
            FieldPanel('basic_form_title'),
            FieldPanel('basic_form_description'),
        ], heading="Basic Form Settings"),
        
        MultiFieldPanel([
            FieldPanel('payment_form_enabled'),
            FieldPanel('payment_form_title'),
            FieldPanel('payment_form_description'),
        ], heading="Payment Form Settings"),
        
        MultiFieldPanel([
            FieldPanel('step1_title'),
            FieldPanel('step1_description'),
            FieldPanel('step2_title'),
            FieldPanel('step2_description'),
            FieldPanel('step3_title'),
            FieldPanel('step3_description'),
        ], heading="Payment Form Steps"),
        
        MultiFieldPanel([
            FieldPanel('payment_processor'),
            FieldPanel('publish_key'),
        ], heading="Payment Processing"),
        
        MultiFieldPanel([
            FieldPanel('success_message'),
            FieldPanel('error_message'),
        ], heading="Messages"),
    ]

    api_fields = [
        APIField('intro_title'),
        APIField('intro_text'),
        APIField('featured_image'),
        APIField('basic_form_enabled'),
        APIField('basic_form_title'),
        APIField('basic_form_description'),
        APIField('payment_form_enabled'),
        APIField('payment_form_title'),
        APIField('payment_form_description'),
        APIField('step1_title'),
        APIField('step1_description'),
        APIField('step2_title'),
        APIField('step2_description'),
        APIField('step3_title'),
        APIField('step3_description'),
        APIField('payment_processor'),
        APIField('publish_key'),
        APIField('success_message'),
        APIField('error_message'),
        APIField('form_config'),
        APIField('payment_config'),
        APIField('messages'),
    ]

    class Meta:
        verbose_name = "Payments Page"
        verbose_name_plural = "Payments Pages"

    @property
    def form_config(self):
        """Return form configuration for frontend"""
        return {
            'basic_form': {
                'enabled': self.basic_form_enabled,
                'title': self.basic_form_title,
                'description': self.basic_form_description,
            },
            'payment_form': {
                'enabled': self.payment_form_enabled,
                'title': self.payment_form_title,
                'description': self.payment_form_description,
                'steps': [
                    {
                        'step': 1,
                        'title': self.step1_title,
                        'description': self.step1_description,
                    },
                    {
                        'step': 2,
                        'title': self.step2_title,
                        'description': self.step2_description,
                    },
                    {
                        'step': 3,
                        'title': self.step3_title,
                        'description': self.step3_description,
                    },
                ]
            }
        }

    @property
    def payment_config(self):
        """Return payment configuration for frontend"""
        return {
            'processor': self.payment_processor,
            'publish_key': self.publish_key if self.payment_processor != 'manual' else None,
            'currency': 'USD',  # Can be made configurable
            'requires_payment_method': self.payment_processor != 'manual',
        }

    @property
    def messages(self):
        """Return messages for frontend"""
        return {
            'success': self.success_message,
            'error': self.error_message,
        }

    def get_api_response_data(self):
        """Return API response data for headless frontend"""
        return {
            'id': self.id,
            'title': self.title,
            'slug': self.slug,
            'intro_title': self.intro_title,
            'intro_text': str(self.intro_text),
            'featured_image': {
                'url': self.featured_image.file.url,
                'title': self.featured_image.title,
                'width': self.featured_image.width,
                'height': self.featured_image.height,
            } if self.featured_image else None,
            'seo_title': self.seo_title,
            'search_description': self.search_description,
            'form_config': self.form_config,
            'payment_config': self.payment_config,
            'messages': self.messages,
        }
