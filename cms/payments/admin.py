from django.contrib import admin
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from .models import BasicFormSubmission, PaymentFormSubmission
from wagtail import hooks
from wagtail.admin.menu import MenuItem


# Register Wagtail admin menu items
@hooks.register('register_admin_menu_item')
def register_payments_menu_item():
    """Add Payments menu item to Wagtail admin"""
    return MenuItem(
        _('Payments'),
        reverse('payments_basic_submissions'),
        classname='icon icon-form',
        order=300
    )


@hooks.register('register_admin_menu_item')
def register_payment_submissions_menu_item():
    """Add Payment Submissions menu item to Wagtail admin"""
    return MenuItem(
        _('Payment Submissions'),
        reverse('payments_payment_submissions'),
        classname='icon icon-money',
        order=301
    )


@admin.register(BasicFormSubmission)
class BasicFormSubmissionAdmin(admin.ModelAdmin):
    """
    Admin interface for Basic Form Submissions
    """
    list_display = [
        'name', 'email', 'phone', 'submitted_at', 'ip_address'
    ]
    list_filter = [
        'submitted_at', 'email'
    ]
    search_fields = [
        'name', 'email', 'phone', 'message'
    ]
    readonly_fields = [
        'submitted_at', 'ip_address', 'user_agent'
    ]
    ordering = ['-submitted_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Metadata', {
            'fields': ('submitted_at', 'ip_address', 'user_agent'),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        # Don't allow manual additions through admin
        return False
    
    def has_change_permission(self, request, obj=None):
        # Allow viewing but not editing
        return request.user.has_perm('payments.view_basicformsubmission')


@admin.register(PaymentFormSubmission)
class PaymentFormSubmissionAdmin(admin.ModelAdmin):
    """
    Admin interface for Payment Form Submissions
    """
    list_display = [
        'full_name', 'email', 'transaction_id', 
        'payment_status', 'amount', 'submitted_at'
    ]
    list_filter = [
        'payment_status', 'submitted_at', 'currency'
    ]
    search_fields = [
        'full_name', 'email', 'transaction_id', 'card_name'
    ]
    readonly_fields = [
        'submitted_at', 'ip_address', 'user_agent', 'get_masked_card_number'
    ]
    ordering = ['-submitted_at']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('full_name', 'email', 'phone')
        }),
        ('Billing Address', {
            'fields': ('address', 'city', 'postal_code', 'country')
        }),
        ('Payment Information', {
            'fields': ('get_masked_card_number', 'card_name', 'expiry_date')
        }),
        ('Transaction Details', {
            'fields': ('transaction_id', 'payment_status', 'amount', 'currency')
        }),
        ('Metadata', {
            'fields': ('submitted_at', 'ip_address', 'user_agent'),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        # Don't allow manual additions through admin
        return False
    
    def has_change_permission(self, request, obj=None):
        # Allow editing payment status and amount only
        if request.user.has_perm('payments.change_paymentformsubmission'):
            return True
        return request.user.has_perm('payments.view_paymentformsubmission')
    
    def get_readonly_fields(self, request, obj=None):
        readonly = list(self.readonly_fields)
        if not request.user.has_perm('payments.change_paymentformsubmission'):
            readonly.extend(['payment_status', 'amount'])
        return readonly
