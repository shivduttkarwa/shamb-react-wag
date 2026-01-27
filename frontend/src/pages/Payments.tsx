import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import "./Payments.css";

// Initialize Stripe (you'll need to replace with your actual publishable key)
const stripePromise = loadStripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY');

interface BasicFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface PaymentFormData {
  step1: {
    fullName: string;
    email: string;
    phone: string;
    amount: string;
    customAmount: string;
  };
  step2: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  step3: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardName: string;
  };
}

const Payments: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'basic' | 'payment'>('basic');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  
  const [basicFormData, setBasicFormData] = useState<BasicFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>({
    step1: {
      fullName: '',
      email: '',
      phone: '',
      amount: '100',
      customAmount: '',
    },
    step2: {
      address: '',
      city: '',
      postalCode: '',
      country: ''
    },
    step3: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: ''
    }
  });

  const handleBasicFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/submit-basic-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(basicFormData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitMessage(data.message);
        setBasicFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitError(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Basic form submission error:', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');
    
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as 1 | 2 | 3);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const allPaymentData = {
        ...paymentFormData.step1,
        ...paymentFormData.step2,
        ...paymentFormData.step3,
      };
      
      const response = await fetch('http://127.0.0.1:8000/api/submit-payment-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allPaymentData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitMessage(`Payment successful! Transaction ID: ${data.transaction_id}`);
        setPaymentFormData({
          step1: { fullName: '', email: '', phone: '', amount: '100', customAmount: '' },
          step2: { address: '', city: '', postalCode: '', country: '' },
          step3: { cardNumber: '', expiryDate: '', cvv: '', cardName: '' },
        });
        setCurrentStep(1);
      } else {
        setSubmitError(data.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment form submission error:', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as 1 | 2 | 3);
    }
  };

  const updatePaymentStepData = (step: 1 | 2 | 3, field: string, value: string) => {
    setPaymentFormData(prev => ({
      ...prev,
      [`step${step}`]: {
        ...prev[`step${step}`],
        [field]: value
      }
    }));
  };

  const renderBasicForm = () => (
    <div className="form-container basic-form">
      <h2>Basic Inshambalation Form</h2>
      {submitMessage && <div className="success-message">{submitMessage}</div>}
      {submitError && <div className="error-message">{submitError}</div>}
      <form onSubmit={handleBasicFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            required
            value={basicFormData.name}
            onChange={(e) => setBasicFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            required
            value={basicFormData.email}
            onChange={(e) => setBasicFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            required
            value={basicFormData.phone}
            onChange={(e) => setBasicFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows={4}
            value={basicFormData.message}
            onChange={(e) => setBasicFormData(prev => ({ ...prev, message: e.target.value }))}
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Basic Form'}
        </button>
      </form>
    </div>
  );

  const renderPaymentFormStep1 = () => (
    <div className="payment-step">
      <h3>Step 1: Personal Inshambalation & Amount</h3>
      
      <div className="form-group">
        <label htmlFor="fullName">Full Name *</label>
        <input
          type="text"
          id="fullName"
          required
          value={paymentFormData.step1.fullName}
          onChange={(e) => updatePaymentStepData(1, 'fullName', e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="paymentEmail">Email Address *</label>
        <input
          type="email"
          id="paymentEmail"
          required
          value={paymentFormData.step1.email}
          onChange={(e) => updatePaymentStepData(1, 'email', e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="paymentPhone">Phone Number *</label>
        <input
          type="tel"
          id="paymentPhone"
          required
          value={paymentFormData.step1.phone}
          onChange={(e) => updatePaymentStepData(1, 'phone', e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="amount">Select Amount *</label>
        <select
          id="amount"
          required
          value={paymentFormData.step1.amount}
          onChange={(e) => updatePaymentStepData(1, 'amount', e.target.value)}
        >
          <option value="50">$50</option>
          <option value="100">$100</option>
          <option value="250">$250</option>
          <option value="500">$500</option>
          <option value="1000">$1000</option>
          <option value="custom">Custom Amount</option>
        </select>
      </div>
      
      {paymentFormData.step1.amount === 'custom' && (
        <div className="form-group">
          <label htmlFor="customAmount">Custom Amount ($) *</label>
          <input
            type="number"
            id="customAmount"
            min="1"
            step="0.01"
            required
            value={paymentFormData.step1.customAmount}
            onChange={(e) => updatePaymentStepData(1, 'customAmount', e.target.value)}
            placeholder="Enter amount"
          />
        </div>
      )}
    </div>
  );

  const renderPaymentFormStep2 = () => (
    <div className="payment-step">
      <h3>Step 2: Billing Address</h3>
      <div className="form-group">
        <label htmlFor="address">Street Address *</label>
        <input
          type="text"
          id="address"
          required
          value={paymentFormData.step2.address}
          onChange={(e) => updatePaymentStepData(2, 'address', e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="city">City *</label>
        <input
          type="text"
          id="city"
          required
          value={paymentFormData.step2.city}
          onChange={(e) => updatePaymentStepData(2, 'city', e.target.value)}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code *</label>
          <input
            type="text"
            id="postalCode"
            required
            value={paymentFormData.step2.postalCode}
            onChange={(e) => updatePaymentStepData(2, 'postalCode', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <input
            type="text"
            id="country"
            required
            value={paymentFormData.step2.country}
            onChange={(e) => updatePaymentStepData(2, 'country', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentFormStep3 = () => (
    <div className="payment-step">
      <h3>Step 3: Payment Inshambalation</h3>
      <div className="form-group">
        <label htmlFor="cardName">Name on Card *</label>
        <input
          type="text"
          id="cardName"
          required
          value={paymentFormData.step3.cardName}
          onChange={(e) => updatePaymentStepData(3, 'cardName', e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number *</label>
        <input
          type="text"
          id="cardNumber"
          required
          placeholder="1234 5678 9012 3456"
          value={paymentFormData.step3.cardNumber}
          onChange={(e) => updatePaymentStepData(3, 'cardNumber', e.target.value)}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date *</label>
          <input
            type="text"
            id="expiryDate"
            required
            placeholder="MM/YY"
            value={paymentFormData.step3.expiryDate}
            onChange={(e) => updatePaymentStepData(3, 'expiryDate', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cvv">CVV *</label>
          <input
            type="text"
            id="cvv"
            required
            placeholder="123"
            value={paymentFormData.step3.cvv}
            onChange={(e) => updatePaymentStepData(3, 'cvv', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="form-container payment-form">
      <h2>Payment Form</h2>
      {submitMessage && <div className="success-message">{submitMessage}</div>}
      {submitError && <div className="error-message">{submitError}</div>}
      
      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
      </div>
      
      <form onSubmit={handlePaymentStepSubmit}>
        {currentStep === 1 && renderPaymentFormStep1()}
        {currentStep === 2 && renderPaymentFormStep2()}
        {currentStep === 3 && renderPaymentFormStep3()}
        
        <div className="form-actions">
          {currentStep > 1 && (
            <button type="button" className="back-btn" onClick={handlePaymentStepBack}>
              Back
            </button>
          )}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : (currentStep === 3 ? 'Complete Payment' : 'Next')}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="payments-page">
      <div className="payments-container">
        <h1>Payments</h1>
        
        {/* Form Selector */}
        <div className="form-selector">
          <button
            className={`selector-btn ${activeForm === 'basic' ? 'active' : ''}`}
            onClick={() => {
              setActiveForm('basic');
              setSubmitMessage('');
              setSubmitError('');
            }}
          >
            Basic Form
          </button>
          <button
            className={`selector-btn ${activeForm === 'payment' ? 'active' : ''}`}
            onClick={() => {
              setActiveForm('payment');
              setSubmitMessage('');
              setSubmitError('');
              setCurrentStep(1);
            }}
          >
            Payment Form
          </button>
        </div>
        
        {/* Forms */}
        {activeForm === 'basic' && renderBasicForm()}
        {activeForm === 'payment' && renderPaymentForm()}
      </div>
    </div>
  );
};

export default Payments;
