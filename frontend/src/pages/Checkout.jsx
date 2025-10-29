import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import CryptoPayment from '../components/payment/CryptoPayment';
import CouponInput from '../components/checkout/CouponInput';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderId, setOrderId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [momoPhone, setMomoPhone] = useState('');
  const [momoProvider, setMomoProvider] = useState('mtn');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.data.cart);
        if (data.data.cart.items.length === 0) {
          navigate('/cart');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ shippingAddress })
      });

      const data = await response.json();
      if (data.success) {
        setOrderId(data.data.order._id);
        
        // If crypto payment, show payment component
        if (paymentMethod === 'crypto') {
          setShowPayment(true);
        } else {
          // For card payment, redirect to order details
          navigate(`/orders/${data.data.order._id}`);
        }
      } else {
        alert(data.error?.message || 'Order failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error placing order');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentSuccess = (order) => {
    alert('Payment confirmed! Your order is being processed.');
    navigate(`/orders/${order.id}`);
  };

  const handlePaymentError = (error) => {
    alert(`Payment error: ${error}`);
    setShowPayment(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading checkout..." />
      </div>
    );
  }

  const cartItems = cart?.items || [];
  const subtotal = cartItems
    .filter(item => item && item.product && item.product.price)
    .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // Calculate discount
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discount = appliedCoupon.value;
    }
  }
  
  const tax = (subtotal - discount) * 0.1;
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal - discount + tax + shipping;

  // Show crypto payment if order is created and crypto is selected
  if (showPayment && orderId && paymentMethod === 'crypto') {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => setShowPayment(false)}
            className="mb-4"
          >
            ← Back to Checkout
          </Button>
          <CryptoPayment
            orderId={orderId}
            amount={total}
            currency="USD"
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              {/* Payment Method Selection */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">💳</div>
                    <div className="font-semibold">Credit/Debit Card</div>
                    <div className="text-xs text-gray-500 mt-1">Visa, Mastercard, Amex</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'momo'
                        ? 'border-yellow-500 bg-yellow-50 shadow-md'
                        : 'border-gray-300 hover:border-yellow-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">📱</div>
                    <div className="font-semibold">Mobile Money</div>
                    <div className="text-xs text-gray-500 mt-1">MTN, Vodafone, AirtelTigo</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'crypto'
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-300 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">₿</div>
                    <div className="font-semibold">Cryptocurrency</div>
                    <div className="text-xs text-gray-500 mt-1">BTC, ETH, USDT & more</div>
                  </button>
                </div>
                {paymentMethod === 'momo' && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>📱 Quick & Easy:</strong> Pay instantly with your mobile money wallet. 
                      Supports MTN Mobile Money, Vodafone Cash, and AirtelTigo Money.
                    </p>
                  </div>
                )}
                {paymentMethod === 'crypto' && (
                  <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>🚀 Fast & Secure:</strong> Pay with Bitcoin, Ethereum, or 70+ other cryptocurrencies. 
                      Lower fees, enhanced privacy, and global accessibility.
                    </p>
                  </div>
                )}
              </div>

              {/* Mobile Money Details */}
              {paymentMethod === 'momo' && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold mb-4">Mobile Money Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Provider *
                      </label>
                      <select
                        value={momoProvider}
                        onChange={(e) => setMomoProvider(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="mtn">MTN Mobile Money</option>
                        <option value="vodafone">Vodafone Cash</option>
                        <option value="airteltigo">AirtelTigo Money</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={momoPhone}
                        onChange={(e) => setMomoPhone(e.target.value)}
                        placeholder="0XX XXX XXXX"
                        required={paymentMethod === 'momo'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter the phone number registered with your mobile money account
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={shippingAddress.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={shippingAddress.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP/Postal Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={shippingAddress.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/cart')}
                >
                  ← Back to Cart
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={processing}
                  disabled={processing}
                >
                  {processing ? 'Processing...' : 
                   paymentMethod === 'crypto' ? 'Continue to Crypto Payment' : 
                   paymentMethod === 'momo' ? 'Pay with Mobile Money' : 
                   'Place Order'}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                {cartItems.filter(item => item && item.product && item.product._id).map((item) => (
                  <div key={item.product._id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Input */}
              <div className="mb-4">
                <CouponInput 
                  onApplyCoupon={setAppliedCoupon} 
                  appliedCoupon={appliedCoupon} 
                />
              </div>

              <div className="border-t pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
