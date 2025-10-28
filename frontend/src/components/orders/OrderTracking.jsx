import React from 'react';

const OrderTracking = ({ order }) => {
  const statuses = [
    { key: 'pending', label: 'Order Placed', icon: '📝', description: 'Your order has been received' },
    { key: 'processing', label: 'Processing', icon: '⚙️', description: 'We are preparing your order' },
    { key: 'shipped', label: 'Shipped', icon: '🚚', description: 'Your order is on the way' },
    { key: 'delivered', label: 'Delivered', icon: '✅', description: 'Order delivered successfully' }
  ];

  const getCurrentStatusIndex = () => {
    const index = statuses.findIndex(s => s.key === order.status);
    return index >= 0 ? index : 0;
  };

  const currentIndex = getCurrentStatusIndex();

  const getStatusDate = (statusKey) => {
    const statusHistory = order.statusHistory?.find(h => h.status === statusKey);
    if (statusHistory) {
      return new Date(statusHistory.timestamp).toLocaleDateString();
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">Order Tracking</h3>

      {/* Progress Bar */}
      <div className="relative">
        {/* Line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
          />
        </div>

        {/* Status Steps */}
        <div className="relative flex justify-between">
          {statuses.map((status, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={status.key} className="flex flex-col items-center" style={{ width: '25%' }}>
                {/* Icon Circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-blue-600 text-white shadow-lg scale-110'
                      : 'bg-gray-200 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-blue-200 animate-pulse' : ''}`}
                >
                  {status.icon}
                </div>

                {/* Label */}
                <div className="text-center">
                  <p className={`font-semibold text-sm ${isCompleted ? 'text-blue-600' : 'text-gray-400'}`}>
                    {status.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{status.description}</p>
                  {getStatusDate(status.key) && (
                    <p className="text-xs text-gray-400 mt-1">{getStatusDate(status.key)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Status Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{statuses[currentIndex].icon}</span>
          <div>
            <h4 className="font-semibold text-blue-900">
              {statuses[currentIndex].label}
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              {statuses[currentIndex].description}
            </p>
            {order.trackingNumber && (
              <p className="text-xs text-blue-600 mt-2">
                Tracking Number: <span className="font-mono font-semibold">{order.trackingNumber}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Estimated Delivery */}
      {order.estimatedDelivery && order.status !== 'delivered' && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Estimated Delivery: <span className="font-semibold text-gray-900">
              {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
