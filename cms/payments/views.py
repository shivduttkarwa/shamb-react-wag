from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from .models import BasicFormSubmission, PaymentFormSubmission


@staff_member_required
def basic_submissions_view(request):
    """Wagtail admin view for basic form submissions"""
    submissions = BasicFormSubmission.objects.all().order_by('-submitted_at')
    
    context = {
        'submissions': submissions,
        'title': 'Basic Form Submissions',
        'header_icon': 'form',
    }
    
    return render(request, 'payments/admin/basic_submissions.html', context)


@staff_member_required
def payment_submissions_view(request):
    """Wagtail admin view for payment form submissions"""
    submissions = PaymentFormSubmission.objects.all().order_by('-submitted_at')
    
    context = {
        'submissions': submissions,
        'title': 'Payment Form Submissions',
        'header_icon': 'money',
    }
    
    return render(request, 'payments/admin/payment_submissions.html', context)
