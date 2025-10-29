import React from 'react';

const OrderReceipt = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a printable version
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Receipt</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; padding: 20px; }
      .receipt { max-width: 800px; margin: 0 auto; }
      .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 20px; }
      .header h1 { margin: 0; color: #2563eb; }
      .info-section { margin-bottom: 20px; }
      .info-row { display: flex; justify-between; padding: 8px 0; }
      .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
      .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
      .items-table th { background-color: #f3f4f6; font-weight: bold; }
      .totals { margin-top: 20px; text-align: right; }
      .total-row { display: flex; justify-content: flex-end; padding: 5px 0; }
      .total-row span:first-child { margin-right: 50px; }
      .grand-total { font-size: 1.2em; font-weight: bold; border-top: 2px solid #000; padding-top: 10px; margin-top: 10px; }
      .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
      @media print { .no-print { display: none; } }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(document.getElementById('receipt-content').innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  if (!order) return null;

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = order.taxAmount || (subtotal * 0.1);
  const shipping = order.shippingCost || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Receipt Content */}
        <div id="receipt-content" className="p-8">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-800 pb-6 mb-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">MultiMart</h1>
            <p className="text-gray-600">Multi-Vendor E-Commerce Platform</p>
            <p className="text-sm text-gray-500 mt-2">www.multimart.com | support@multimart.com</p>
          </div>

          {/* Receipt Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">ORDER RECEIPT</h2>
            <p className="text-gray-600 mt-1">Thank you for your purchase!</p>
          </div>

          {/* Order Information */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Order Details:</h3>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Order Number:</span> #{order.orderNumber || order._id?.slice(-8)}</p>
                <p><span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p><span className="font-medium">Status:</span> <span className="capitalize">{order.status}</span></p>
                <p><span className="font-medium">Payment Method:</span> <span className="capitalize">{order.paymentMethod || 'Card'}</span></p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Shipping Address:</h3>
              <div className="text-sm">
                <p>{order.shippingAddress?.street}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                <p>{order.shippingAddress?.country} {order.shippingAddress?.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Order Items:</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">Item</th>
                  <th className="border border-gray-300 px-4 py-3 text-center">Quantity</th>
                  <th className="border border-gray-300 px-4 py-3 text-right">Price</th>
                  <th className="border border-gray-300 px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-3">
                      <div>
                        <p className="font-medium">{item.product?.name || item.name}</p>
                        {item.product?.store && (
                          <p className="text-xs text-gray-500">Sold by: {item.product.store.name}</p>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">{item.quantity}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">${item.price.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2 text-gray-700">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-gray-700">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-gray-700">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between py-3 text-lg font-bold border-t-2 border-gray-800 mt-2">
                <span>Total:</span>
                <span className="text-blue-600">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
            <p className="mb-2">Thank you for shopping with MultiMart!</p>
            <p>For questions about your order, contact us at support@multimart.com</p>
            <p className="mt-4 text-xs text-gray-500">
              This is a computer-generated receipt and does not require a signature.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="no-print border-t border-gray-200 p-6 bg-gray-50 flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Receipt
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
