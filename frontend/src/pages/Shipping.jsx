import React from 'react';

const Shipping = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping Information</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              We work with trusted shipping partners to deliver your orders safely and on time. 
              Shipping times and costs vary based on your location and the vendor.
            </p>
          </section>

          {/* Shipping Methods */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900">Standard Shipping</h3>
                </div>
                <p className="text-gray-700 mb-2">5-7 business days</p>
                <p className="text-gray-600 text-sm">Free on orders over $50</p>
                <p className="text-blue-600 font-semibold mt-2">$5.99 flat rate</p>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900">Express Shipping</h3>
                </div>
                <p className="text-gray-700 mb-2">2-3 business days</p>
                <p className="text-gray-600 text-sm">Faster delivery option</p>
                <p className="text-green-600 font-semibold mt-2">$12.99</p>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900">Next Day</h3>
                </div>
                <p className="text-gray-700 mb-2">1 business day</p>
                <p className="text-gray-600 text-sm">Order by 2 PM for next day</p>
                <p className="text-purple-600 font-semibold mt-2">$24.99</p>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <svg className="w-8 h-8 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900">Local Pickup</h3>
                </div>
                <p className="text-gray-700 mb-2">Same day available</p>
                <p className="text-gray-600 text-sm">Pick up from vendor location</p>
                <p className="text-orange-600 font-semibold mt-2">FREE</p>
              </div>
            </div>
          </section>

          {/* Processing Time */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Processing Time</h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
              <p className="text-blue-900">
                Orders are typically processed within 1-2 business days before shipping.
              </p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
              <li>Orders placed before 2 PM EST ship same day</li>
              <li>Orders placed after 2 PM EST ship next business day</li>
              <li>Weekend orders ship on Monday</li>
              <li>Holiday processing times may vary</li>
            </ul>
          </section>

          {/* Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Once your order ships, you'll receive a tracking number via email. You can also track your order:
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700">Log into your account and go to "My Orders"</p>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700">Click on the order to see detailed tracking information</p>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700">Real-time updates on your package location</p>
              </div>
            </div>
          </section>

          {/* International Shipping */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Shipping</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We ship to select international destinations. International shipping:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Delivery time: 7-21 business days</li>
              <li>Customs fees and duties may apply</li>
              <li>Customer is responsible for import taxes</li>
              <li>Tracking available for all international orders</li>
              <li>Shipping costs calculated at checkout</li>
            </ul>
          </section>

          {/* Shipping Restrictions */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Restrictions</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-4">
              <p className="text-yellow-900 font-semibold">Some items cannot be shipped to certain locations:</p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Hazardous materials (batteries, aerosols)</li>
              <li>Perishable goods (limited areas)</li>
              <li>Large or oversized items (special arrangements required)</li>
              <li>Items restricted by local laws</li>
            </ul>
          </section>

          {/* Delivery Issues */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Issues</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you experience any delivery problems:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-red-600 pl-4">
                <h3 className="font-semibold text-gray-900">Package Not Delivered</h3>
                <p className="text-gray-700">Contact us within 48 hours of expected delivery date</p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h3 className="font-semibold text-gray-900">Damaged Package</h3>
                <p className="text-gray-700">Take photos and contact us immediately</p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h3 className="font-semibold text-gray-900">Wrong Address</h3>
                <p className="text-gray-700">Contact us ASAP - we may be able to redirect</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Questions About Shipping?</h2>
            <p className="text-blue-100 mb-4">
              Our support team is ready to help with any shipping questions or concerns.
            </p>
            <div className="flex gap-4">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Contact Support
              </a>
              <a
                href="/orders"
                className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Track Order
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
