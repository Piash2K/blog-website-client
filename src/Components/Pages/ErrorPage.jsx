import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        404 Error: Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you are looking for doesn't exist.
      </p>
      <Link to="/">
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
          Go Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;