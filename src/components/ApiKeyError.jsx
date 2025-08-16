import React, { useState } from 'react';

const ApiKeyError = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRetry = () => {
    setIsLoading(true);
    // Add a small delay to show loading state
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">API Connection Error</h2>
        <p className="text-gray-700 mb-6">
          We couldn't connect to the movie database. This could be because:
        </p>
        
        <ul className="list-disc text-left mx-auto max-w-md mb-6 pl-5">
          <li className="mb-2">The API key is missing from your .env file</li>
          <li className="mb-2">The API key is invalid or has expired</li>
          <li className="mb-2">You may be using API key format instead of bearer token</li>
          <li className="mb-2">There's a network issue connecting to the API</li>
        </ul>
        
        <div className="bg-gray-100 p-4 rounded-md text-left mb-6">
          <p className="text-sm font-medium mb-2">To fix this issue:</p>
          <ol className="list-decimal pl-5 text-sm">
            <li className="mb-1">Get an API key from <a href="https://www.themoviedb.org/signup" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TMDB</a></li>
            <li className="mb-1">Create a <code>.env</code> file in the root directory if it doesn't exist</li>
            <li className="mb-1">Add your API key: <code>VITE_TMDB_API_KEY=your_bearer_token</code></li>
            <li className="mb-1">Restart the development server</li>
            <li className="mb-1">See the <code>TMDB_API_INSTRUCTIONS.md</code> file for detailed instructions</li>
          </ol>
        </div>
        
        <button 
          onClick={handleRetry} 
          disabled={isLoading}
          className={`px-6 py-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md transition-colors`}
        >
          {isLoading ? 'Retrying...' : 'Retry Connection'}
        </button>
      </div>
    </div>
  );
};

export default ApiKeyError;
