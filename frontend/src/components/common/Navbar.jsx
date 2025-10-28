import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdvancedSearch from '../search/AdvancedSearch';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Electronics', path: '/products?category=electronics' },
    { name: 'Fashion', path: '/products?category=fashion' },
    { name: 'Home & Living', path: '/products?category=home' },
    { name: 'Beauty', path: '/products?category=beauty' },
    { name: 'Sports', path: '/products?category=sports' },
    { name: 'Books', path: '/products?category=books' },
  ];

  const handleSearch = (query) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="bg-gray-100 border-b">
      <div className="container mx-auto px-4">
        {/* Search Bar with Notification */}
        <div className="py-4 flex items-center gap-4">
          <div className="flex-1 max-w-3xl mx-auto">
            <AdvancedSearch />
          </div>
          <NotificationBell />
        </div>

        {/* Categories */}
        <div className="hidden md:block">
          <nav className="flex items-center justify-center space-x-6 py-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-sm text-gray-700 hover:text-blue-600 transition whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/products"
              className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              View All
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
