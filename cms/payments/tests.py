from django.test import TestCase
from .models import PaymentsPage


class PaymentsPageTests(TestCase):
    def test_payments_page_creation(self):
        """Test that PaymentsPage can be created"""
        page = PaymentsPage(
            title="Test Payments Page",
            intro_title="Test Title",
            intro_text="Test introduction text"
        )
        self.assertEqual(page.title, "Test Payments Page")
        self.assertEqual(page.intro_title, "Test Title")
        self.assertTrue(page.basic_form_enabled)
        self.assertTrue(page.payment_form_enabled)

    def test_form_config_property(self):
        """Test form configuration property"""
        page = PaymentsPage(
            title="Test Payments Page",
            basic_form_title="Custom Basic Form",
            payment_form_title="Custom Payment Form"
        )
        
        config = page.form_config
        self.assertEqual(config['basic_form']['title'], "Custom Basic Form")
        self.assertEqual(config['payment_form']['title'], "Custom Payment Form")
        self.assertEqual(len(config['payment_form']['steps']), 3)

    def test_payment_config_property(self):
        """Test payment configuration property"""
        page = PaymentsPage(
            title="Test Payments Page",
            payment_processor="stripe",
            publish_key="pk_test_123456"
        )
        
        config = page.payment_config
        self.assertEqual(config['processor'], "stripe")
        self.assertEqual(config['publish_key'], "pk_test_123456")
        self.assertEqual(config['currency'], "USD")
