import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import Loader from '../common/Loader';
import Modal from '../common/Modal';

const CryptoPayment = ({ orderId, amount, currency = 'USD', onSuccess, onError }) => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [showInstructions, setShowInstructions] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    initializePayment();
  }, [orderId]);

  useEffect(() => {
    if (paymentData?.expiresAt) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const expiry = new Date(paymentData.expiresAt).getTime();
        const remaining = expiry - now;

        if (remaining <= 0) {
          setTimeRemaining('Expired');
          clearInterval(interval);
        } else {
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
          setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [paymentData]);

  const initializePayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ orderId })
      });

      const data = await response.json();
      if (data.success) {
        setPaymentData(data.data);
        if (data.data.supportedCoins && data.data.supportedCoins.length > 0) {
          setSelectedCoin(data.data.supportedCoins[0]);
        }
      } else {
        onError(data.error?.message || 'Failed to initialize payment');
      }
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    setChecking(true);
    try {
      const response = await fetch('http://localhost:5000/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ reference: paymentData.paymentReference })
      });

      const data = await response.json();
      if (data.success) {
        onSuccess(data.data.order);
      } else {
        alert('Payment not yet confirmed. Please wait for blockchain confirmation.');
      }
    } catch (error) {
      console.error('Payment check error:', error);
      alert('Error checking payment status');
    } finally {
      setChecking(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader size="lg" text="Initializing crypto payment..." />
      </div>
    );
  }

  const cryptoIcons = {
    BTC: '₿',
    ETH: 'Ξ',
    LTC: 'Ł',
    USDT: '₮',
    USDC: '$',
    DOGE: 'Ð',
    XRP: '✕',
    BNB: 'B',
    TRX: 'T',
    BCH: '฿'
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Pay with Cryptocurrency</h2>
          <p className="text-orange-100">Secure, fast, and decentralized payment</p>
        </div>

        <div className="p-6">
          {/* Amount Display */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Total Amount</p>
            <p className="text-4xl font-bold text-gray-900">
              ${amount} <span className="text-xl text-gray-500">{currency}</span>
            </p>
            {timeRemaining && timeRemaining !== 'Expired' && (
              <p className="text-sm text-orange-600 mt-2">
                ⏱️ Time remaining: {timeRemaining}
              </p>
            )}
            {timeRemaining === 'Expired' && (
              <p className="text-sm text-red-600 mt-2">
                ⚠️ Payment link expired. Please create a new order.
              </p>
            )}
          </div>

          {/* Cryptocurrency Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Cryptocurrency
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {paymentData?.supportedCoins?.map((coin) => (
                <button
                  key={coin}
                  onClick={() => setSelectedCoin(coin)}
                  className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                    selectedCoin === coin
                      ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-md scale-105'
                      : 'border-gray-300 hover:border-orange-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{cryptoIcons[coin] || '🪙'}</div>
                  <div className="text-xs">{coin}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Address (if available) */}
          {paymentData?.paymentAddress && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Payment Address
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={paymentData.paymentAddress}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-blue-300 rounded text-sm font-mono"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => copyToClipboard(paymentData.paymentAddress)}
                >
                  📋 Copy
                </Button>
              </div>
              {paymentData.paymentAmount && (
                <p className="text-sm text-blue-700 mt-2">
                  Amount: {paymentData.paymentAmount} {paymentData.payCurrency?.toUpperCase()}
                </p>
              )}
            </div>
          )}

          {/* Payment Button */}
          {paymentData?.paymentUrl && (
            <div className="mb-6">
              <a
                href={paymentData.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-center py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl"
              >
                🚀 Complete Payment with {selectedCoin}
              </a>
              <p className="text-xs text-gray-500 text-center mt-2">
                You will be redirected to secure payment gateway
              </p>
            </div>
          )}

          {/* Instructions */}
          <div className="mb-6">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="flex items-center justify-between w-full p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition"
            >
              <span className="font-semibold text-yellow-800">
                📖 Payment Instructions
              </span>
              <span className="text-yellow-600">
                {showInstructions ? '▼' : '▶'}
              </span>
            </button>

            {showInstructions && (
              <div className="mt-3 p-4 bg-white border border-yellow-200 rounded-lg">
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Click the "Complete Payment" button above</li>
                  <li>You'll be redirected to the secure payment gateway</li>
                  <li>Select your preferred cryptocurrency ({selectedCoin})</li>
                  <li>Send the exact amount shown to the provided address</li>
                  <li>Wait for blockchain confirmation (usually 10-30 minutes)</li>
                  <li>Your order will be automatically processed once confirmed</li>
                </ol>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>💡 Tip:</strong> Blockchain confirmations may take time depending on network congestion. 
                    Bitcoin typically takes 10-30 minutes, while Ethereum takes 2-5 minutes.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Check Status Button */}
          <Button
            variant="success"
            size="lg"
            fullWidth
            onClick={checkPaymentStatus}
            loading={checking}
            disabled={checking || timeRemaining === 'Expired'}
          >
            {checking ? 'Checking...' : '✓ I Have Completed Payment - Check Status'}
          </Button>

          {/* Gateway Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Payment Gateway:</span>
              <span className="font-semibold text-gray-900 capitalize">
                {paymentData?.gateway}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-600">Reference:</span>
              <span className="font-mono text-xs text-gray-700">
                {paymentData?.paymentReference}
              </span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h4 className="font-semibold text-green-900 mb-1">Secure Payment</h4>
                <p className="text-sm text-green-700">
                  All cryptocurrency transactions are secured by blockchain technology. 
                  Your payment is processed through our trusted payment partner and 
                  no sensitive information is stored on our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Supported Coins Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              We support {paymentData?.supportedCoins?.length || 0}+ cryptocurrencies including 
              Bitcoin, Ethereum, Litecoin, USDT, USDC, and more
            </p>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      <Modal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        title="Cryptocurrency Payment Help"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Why choose crypto payments?</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Enhanced privacy and security</li>
              <li>Lower transaction fees</li>
              <li>No chargebacks or fraud</li>
              <li>Global accessibility</li>
              <li>Fast settlement times</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Need help?</h4>
            <p className="text-sm text-gray-700">
              If you encounter any issues with your crypto payment, please contact our 
              support team with your payment reference number.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CryptoPayment;
