import React, { useState } from 'react';
import Button from '../common/Button';

const CouponInput = ({ onApplyCoupon, appliedCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/coupons/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code: couponCode })
      });

      const data = await response.json();

      if (data.success) {
        onApplyCoupon(data.data.coupon);
        setCouponCode('');
      } else {
        setError(data.error?.message || 'Invalid coupon code');
      }
    } catch (error) {
      setError('Error applying coupon');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    onApplyCoupon(null);
    setCouponCode('');
    setError('');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span>🎟️</span>
        <span>Have a coupon code?</span>
      </h3>

      {appliedCoupon ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-green-900">
                {appliedCoupon.code}
              </p>
              <p className="text-sm text-green-700 mt-1">
                {appliedCoupon.type === 'percentage'
                  ? `${appliedCoupon.value}% off`
                  : `$${appliedCoupon.value} off`}
              </p>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="Enter coupon code"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            />
            <Button
              onClick={handleApplyCoupon}
              loading={loading}
              disabled={loading || !couponCode.trim()}
              variant="primary"
            >
              Apply
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
              <span>⚠️</span>
              <span>{error}</span>
            </p>
          )}

          {/* Available Coupons Hint */}
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>💡 Tip:</strong> Check your email for exclusive coupon codes!
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CouponInput;
