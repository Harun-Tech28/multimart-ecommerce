import React from 'react';

const VendorSupport = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Vendor Support</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Vendor Support</h2>
            <p className="text-gray-700 mb-6">
              Our dedicated vendor support team is here to help you succeed on MultiMart.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-2">vendor-support@multimart.com</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </div>

              <div className="border rounded-lg p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-2">1-800-VENDOR-1</p>
                <p className="text-sm text-gray-500">Mon-Fri 9am-6pm EST</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Vendor Questions</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">How do I add products?</h3>
                <p className="text-gray-700">Go to your Vendor Dashboard → Products → Add Product. Fill in all required fields and upload images.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">When do I get paid?</h3>
                <p className="text-gray-700">Payments are processed weekly via direct deposit to your registered bank account.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">How do I handle returns?</h3>
                <p className="text-gray-700">Customers initiate returns through their account. You'll be notified and can approve/reject based on your policy.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Can I offer discounts?</h3>
                <p className="text-gray-700">Yes! You can set discount percentages on individual products from your product management page.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/vendor/guide" className="border rounded-lg p-4 hover:bg-gray-50 transition text-center">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-semibold">Seller Guide</h3>
              </a>
              <a href="/help" className="border rounded-lg p-4 hover:bg-gray-50 transition text-center">
                <div className="text-3xl mb-2">❓</div>
                <h3 className="font-semibold">Help Center</h3>
              </a>
              <a href="/vendor/dashboard" className="border rounded-lg p-4 hover:bg-gray-50 transition text-center">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold">Dashboard</h3>
              </a>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Need Immediate Assistance?</h2>
            <p className="text-blue-100 mb-4">Our vendor support team is ready to help</p>
            <a
              href="mailto:vendor-support@multimart.com"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Email Us Now
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VendorSupport;
