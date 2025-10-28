import React, { useState } from 'react';

const Help = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'general', name: 'General', icon: '❓' },
    { id: 'orders', name: 'Orders & Shipping', icon: '📦' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'returns', name: 'Returns & Refunds', icon: '↩️' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'vendors', name: 'For Vendors', icon: '🏪' }
  ];

  const faqs = {
    general: [
      {
        question: 'What is MultiMart?',
        answer: 'MultiMart is a multi-vendor marketplace that connects buyers with quality sellers from around the world. We provide a platform where multiple vendors can sell their products to customers.'
      },
      {
        question: 'How do I create an account?',
        answer: 'Click on the "Sign Up" button in the top right corner, fill in your details, and verify your email address. You can then start shopping immediately!'
      },
      {
        question: 'Is it safe to shop on MultiMart?',
        answer: 'Yes! We use industry-standard security measures to protect your data and transactions. All payments are processed through secure payment gateways.'
      }
    ],
    orders: [
      {
        question: 'How do I track my order?',
        answer: 'Go to "My Orders" in your account menu. Click on any order to see detailed tracking information and current status.'
      },
      {
        question: 'How long does shipping take?',
        answer: 'Shipping times vary by vendor and location. Typically, orders are delivered within 3-7 business days. Check the product page for specific shipping estimates.'
      },
      {
        question: 'Can I change my shipping address?',
        answer: 'You can change your shipping address before the order is shipped. Go to your order details and click "Edit Address". Once shipped, contact customer support.'
      }
    ],
    payments: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept credit cards (Visa, MasterCard, American Express), debit cards, and various digital payment methods including PayPal and Stripe.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes! We never store your complete payment information. All transactions are processed through PCI-compliant payment gateways.'
      },
      {
        question: 'When will I be charged?',
        answer: 'Your payment method is charged immediately when you place an order. You will receive a confirmation email with your receipt.'
      }
    ],
    returns: [
      {
        question: 'What is your return policy?',
        answer: 'Most items can be returned within 30 days of delivery. Items must be unused and in original packaging. Some items may have different return policies - check the product page.'
      },
      {
        question: 'How do I return an item?',
        answer: 'Go to "My Orders", select the order, and click "Return Item". Follow the instructions to print a return label and ship the item back.'
      },
      {
        question: 'When will I receive my refund?',
        answer: 'Refunds are processed within 5-7 business days after we receive your return. The refund will be credited to your original payment method.'
      }
    ],
    account: [
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page. Enter your email address and we\'ll send you a link to reset your password.'
      },
      {
        question: 'Can I change my email address?',
        answer: 'Yes! Go to your account settings and update your email address. You\'ll need to verify the new email address.'
      },
      {
        question: 'How do I delete my account?',
        answer: 'Contact customer support to request account deletion. Please note that this action is permanent and cannot be undone.'
      }
    ],
    vendors: [
      {
        question: 'How do I become a vendor?',
        answer: 'Click "Become a Vendor" in the footer, fill out the application form with your business details, and wait for approval. Our team typically reviews applications within 2-3 business days.'
      },
      {
        question: 'What are the fees for vendors?',
        answer: 'We charge a small commission on each sale. There are no upfront fees or monthly charges. Contact our vendor support team for detailed pricing.'
      },
      {
        question: 'How do I manage my products?',
        answer: 'Once approved, access your Vendor Dashboard to add products, manage inventory, process orders, and view sales analytics.'
      }
    ]
  };

  const filteredFaqs = searchQuery
    ? Object.values(faqs).flat().filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs[activeCategory];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to your questions
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {!searchQuery && (
            <>
              {/* Categories */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`p-4 rounded-lg text-center transition ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium">{category.name}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* FAQs */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {searchQuery ? 'Search Results' : categories.find(c => c.id === activeCategory)?.name}
            </h2>

            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No results found. Try a different search term.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="border-b pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
            <p className="text-blue-100 mb-6">
              Our support team is here to assist you
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@multimart.com"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
