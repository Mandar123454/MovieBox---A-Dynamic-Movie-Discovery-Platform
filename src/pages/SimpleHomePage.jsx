import { useState } from 'react';
import { Link } from 'react-router-dom';

const SimpleHomePage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-4">Welcome to MovieBox</h1>
        <p className="text-lg text-gray-600 mb-8">Discover and explore your favorite movies</p>
        
        <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="mb-4">This is a simple version of the MovieBox app without API calls.</p>
          
          <div className="flex justify-center mt-6">
            <Link 
              to="/movies" 
              className="px-6 py-3 bg-[var(--secondary-color)] text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Explore Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHomePage;
