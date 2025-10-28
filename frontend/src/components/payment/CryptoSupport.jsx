import React, { useState } from 'react';
import Modal from '../common/Modal';

const CryptoSupport = () => {
  const [showModal, setShowModal] = useState(false);

  const cryptos = [
    { symbol: '₿', name: 'Bitcoin', code: 'BTC', color: 'text-orange-500' },
    { symbol: 'Ξ', name: 'Ethereum', code: 'ETH', color: 'text-blue-500' },
    { symbol: 'Ł', name: 'Litecoin', code: 'LTC', color: 'text-gray-500' },
    { symbol: '₮', name: 'Tether', code: 'USDT', color: 'text-green-500' },
    { symbol: '$', name: 'USD Coin', code: 'USDC', color: 'text-blue-600' },
    { symbol: 'Ð', name: 'Dogecoin', code: 'DOGE', color: 'text-yellow-500' },
    { symbol: '✕', name: 'Ripple', code: 'XRP', color: 'text-blue-400' },
    { symbol: 'B', name: 'Binance', code: 'BNB', color: 'text-yellow-600' }
  ];

  return (
    <>
      {/* Crypto Payment Button */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-2xl">₿</span>
              <span>Pay with Cryptocurrency</span>
              <span className="text-sm bg-orange-100 px-3 py-1 rounded-full">200+ Coins</span>
            </button>
            <p className="text-white text-sm mt-3">
              Bitcoin, Ethereum, USDT & more - Click to learn more
            </p>
          </div>
        </div>
      </div>

      {/* Crypto Payment Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Pay with Cryptocurrency"
      >
        <div className="space-y-6">
          {/* Description */}
          <div className="text-center">
            <p className="text-gray-600">
              We accept 200+ cryptocurrencies for secure, fast payments
            </p>
          </div>

          {/* Crypto Icons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cryptos.map((crypto) => (
              <div
                key={crypto.code}
                className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-all transform hover:scale-105 border border-gray-200"
              >
                <div className={`text-4xl mb-2 ${crypto.color}`}>
                  {crypto.symbol}
                </div>
                <div className="font-semibold text-gray-900 text-sm">
                  {crypto.code}
                </div>
                <div className="text-xs text-gray-500">
                  {crypto.name}
                </div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <div className="font-semibold text-sm">Secure</div>
              <div className="text-xs text-gray-500">
                Blockchain-secured
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-semibold text-sm">Fast</div>
              <div className="text-xs text-gray-500">
                Instant processing
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌍</div>
              <div className="font-semibold text-sm">Global</div>
              <div className="text-xs text-gray-500">
                Pay worldwide
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <div className="font-semibold text-sm">Low Fees</div>
              <div className="text-xs text-gray-500">
                Lower than cards
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-800 text-center">
              <strong>How it works:</strong> Select cryptocurrency at checkout, complete your order, 
              and you'll be redirected to our secure payment gateway to complete your crypto payment.
            </p>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 pt-2 border-t">
            Powered by CoinGate, Coinbase Commerce & NOWPayments
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CryptoSupport;
