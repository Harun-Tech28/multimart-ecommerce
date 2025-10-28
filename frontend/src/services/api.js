// API Base Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Generic API call handler with error handling
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers
      }
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error?.message || data.message || 'API request failed';
      throw new Error(errorMessage);
    }

    // Return the full response data
    return data;
  } catch (error) {
    console.error('API Error:', error);
    // If it's a network error (fetch failed), throw a more user-friendly message
    if (error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check if the server is running.');
    }
    throw error;
  }
};

// Export API base URL and helper
export { API_BASE_URL, apiCall, getAuthHeaders };
