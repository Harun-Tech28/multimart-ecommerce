import React from 'react';
import { Link } from 'react-router-dom';

const VendorLogin = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Vendor Login</h1>
          <p className="text-gray-600 text-center mb-8">Access your vendor dashboard</p>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <p className="text-blue-900 text-sm">
              Vendors should use the regular <Link to="/login" className="font-semibold underline">login page</Link> with their vendor account credentials.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/login"
              className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Go to Login
            </Link>
            <Link
              to="/vendor/register"
              className="block w-full bg-white text-blue-600 border-2 border-blue-600 text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Become a Vendor
            </Link>
          </div>

          <div className="mt-6 text-center">
            <Link to="/vendor/support" className="text-sm text-gray-600 hover:text-gray-900">
              Need help? Contact Vendor Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
