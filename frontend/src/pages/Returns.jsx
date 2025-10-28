import React from 'react';

const Returns = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Returns & Refunds Policy</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              At MultiMart, we want you to be completely satisfied with your purchase. If you're not happy with your order, 
              we offer a hassle-free return and refund process. Please review our policy below.
            </p>
          </section>

          {/* Return Window */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Window</h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
              <p className="text-blue-900 font-semibold">You have 30 days from delivery to return most items.</p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Items must be unused and in original packaging</li>
              <li>All tags and labels must be attached</li>
              <li>Include all accessories and documentation</li>
              <li>Return shipping label will be provided</li>
            </ul>
          </section>

          {/* Eligible Items */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligible for Return</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Defective or damaged products</li>
              <li>Wrong item received</li>
              <li>Item doesn't match description</li>
              <li>Changed your mind (within 30 days)</li>
              <li>Size or fit issues</li>
            </ul>
          </section>

          {/* Non-Returnable Items */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Returnable Items</h2>
            <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4">
              <p className="text-red-900 font-semibold">The following items cannot be returned:</p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Perishable goods (food, flowers)</li>
              <li>Personal care items (cosmetics, underwear)</li>
              <li>Custom or personalized products</li>
              <li>Digital downloads</li>
              <li>Gift cards</li>
              <li>Items marked as final sale</li>
            </ul>
          </section>

          {/* How to Return */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Return an Item</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Log into Your Account</h3>
                  <p className="text-gray-700">Go to "My Orders" and select the order you want to return.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Select Items to Return</h3>
                  <p className="text-gray-700">Choose the items you wish to return and provide a reason.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Print Return Label</h3>
                  <p className="text-gray-700">Download and print the prepaid return shipping label.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Pack and Ship</h3>
                  <p className="text-gray-700">Securely pack the item and attach the return label. Drop off at any carrier location.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  5
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Track Your Return</h3>
                  <p className="text-gray-700">Monitor your return status in your account dashboard.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Process</h2>
            <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-4">
              <p className="text-green-900 font-semibold">Refunds are processed within 5-7 business days after we receive your return.</p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Refund will be issued to your original payment method</li>
              <li>You'll receive an email confirmation when refund is processed</li>
              <li>Bank processing may take an additional 3-5 business days</li>
              <li>Shipping costs are non-refundable (unless item was defective)</li>
            </ul>
          </section>

          {/* Exchanges */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exchanges</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We currently don't offer direct exchanges. If you need a different size or color:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Return the original item for a refund</li>
              <li>Place a new order for the item you want</li>
              <li>This ensures you get the item you need as quickly as possible</li>
            </ol>
          </section>

          {/* Damaged or Defective Items */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Damaged or Defective Items</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you receive a damaged or defective item:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Contact us within 48 hours of delivery</li>
              <li>Provide photos of the damage</li>
              <li>We'll arrange a free return pickup</li>
              <li>Full refund or replacement will be provided</li>
              <li>No return shipping costs for you</li>
            </ul>
          </section>

          {/* Contact Support */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Need Help with a Return?</h2>
            <p className="text-blue-100 mb-4">
              Our customer support team is here to assist you with any questions about returns or refunds.
            </p>
            <div className="flex gap-4">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Contact Support
              </a>
              <a
                href="/help"
                className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Visit Help Center
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Returns;
