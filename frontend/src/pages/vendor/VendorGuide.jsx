import React from 'react';

const VendorGuide = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Seller Guide</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-lg">1. Create Your Vendor Account</h3>
                <p className="text-gray-700">Apply through our vendor registration form with your business details.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-lg">2. Wait for Approval</h3>
                <p className="text-gray-700">Our team reviews applications within 2-3 business days.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-lg">3. Set Up Your Store</h3>
                <p className="text-gray-700">Add your store logo, banner, and description.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-lg">4. Add Products</h3>
                <p className="text-gray-700">List your products with photos, descriptions, and pricing.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-lg">5. Start Selling</h3>
                <p className="text-gray-700">Manage orders and grow your business!</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Use high-quality product photos</li>
              <li>Write detailed, accurate descriptions</li>
              <li>Price competitively</li>
              <li>Respond to customer inquiries quickly</li>
              <li>Ship orders promptly</li>
              <li>Maintain good inventory levels</li>
              <li>Provide excellent customer service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fees & Payments</h2>
            <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-4">
              <p className="text-green-900 font-semibold">No upfront fees or monthly charges!</p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Commission: 10% per sale</li>
              <li>Payments processed weekly</li>
              <li>Direct deposit to your bank account</li>
              <li>Detailed sales reports available</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Orders</h2>
            <p className="text-gray-700 mb-4">From your vendor dashboard, you can:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>View all orders in real-time</li>
              <li>Update order status</li>
              <li>Print shipping labels</li>
              <li>Communicate with customers</li>
              <li>Process refunds if needed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Support & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/vendor/support" className="border rounded-lg p-4 hover:bg-gray-50 transition">
                <h3 className="font-semibold text-lg mb-2">📧 Vendor Support</h3>
                <p className="text-gray-600 text-sm">Get help from our vendor support team</p>
              </a>
              <a href="/help" className="border rounded-lg p-4 hover:bg-gray-50 transition">
                <h3 className="font-semibold text-lg mb-2">❓ Help Center</h3>
                <p className="text-gray-600 text-sm">Find answers to common questions</p>
              </a>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Ready to Start Selling?</h2>
            <p className="text-blue-100 mb-4">Join thousands of successful vendors on MultiMart</p>
            <a
              href="/vendor/register"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Apply Now
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VendorGuide;
