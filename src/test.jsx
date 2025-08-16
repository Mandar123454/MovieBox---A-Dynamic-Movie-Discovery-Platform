import React, { useState, useEffect } from 'react';

const ApiTest = () => {
  const [apiStatus, setApiStatus] = useState('loading');
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  
  const testApiKey = apiKey || import.meta.env.VITE_TMDB_API_KEY;
  
  useEffect(() => {
    const testApi = async () => {
      try {
        const key = import.meta.env.VITE_TMDB_API_KEY;
        console.log('Testing API with key:', key ? `${key.substring(0, 4)}...${key.substring(key.length - 4)}` : 'Not found');
        
        // Test the API using a simple configuration request
        const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${key}`);
        const data = await response.json();
        
        if (data.success === false) {
          throw new Error(data.status_message || 'API returned an error');
        }
        
        setApiResponse(data);
        setApiStatus('success');
      } catch (err) {
        console.error('API Test Error:', err);
        setError(err.message || 'Unknown error occurred');
        setApiStatus('error');
      }
    };
    
    testApi();
  }, []);
  
  const handleTestCustomKey = async () => {
    if (!apiKey) return;
    
    setApiStatus('loading');
    setApiResponse(null);
    setError(null);
    
    try {
      const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`);
      const data = await response.json();
      
      if (data.success === false) {
        throw new Error(data.status_message || 'API returned an error');
      }
      
      setApiResponse(data);
      setApiStatus('success');
    } catch (err) {
      console.error('API Test Error with custom key:', err);
      setError(err.message || 'Unknown error occurred');
      setApiStatus('error');
    }
  };
  
  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600">MovieBox API Test Page</h1>
      <p className="my-4">This page tests your TMDB API connection</p>
      
      <div className="mb-6 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-semibold mb-3">Environment Check</h2>
        <div className="space-y-2">
          <p><strong>API Key from .env:</strong> {import.meta.env.VITE_TMDB_API_KEY ? '✓ Found' : '✗ Not found'}</p>
          {import.meta.env.VITE_TMDB_API_KEY && (
            <p><strong>Key format:</strong> {import.meta.env.VITE_TMDB_API_KEY.substring(0, 4)}...{import.meta.env.VITE_TMDB_API_KEY.substring(import.meta.env.VITE_TMDB_API_KEY.length - 4)}</p>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">API Connection Test</h2>
        <div className="p-4 bg-gray-100 rounded-md">
          <p className="font-medium mb-2">Status:</p>
          {apiStatus === 'loading' && (
            <p className="text-blue-600">⟳ Testing API connection...</p>
          )}
          {apiStatus === 'success' && (
            <p className="text-green-600">✓ API connection successful</p>
          )}
          {apiStatus === 'error' && (
            <p className="text-red-600">✗ API connection failed: {error}</p>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Test with Custom API Key</h2>
        <div className="p-4 bg-gray-100 rounded-md flex items-end space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key:
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key to test"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={handleTestCustomKey}
            disabled={!apiKey || apiStatus === 'loading'}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            Test Key
          </button>
        </div>
      </div>
      
      {apiResponse && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">API Response</h2>
          <pre className="p-4 bg-gray-800 text-gray-200 rounded-md overflow-auto">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="p-4 bg-yellow-100 rounded-md">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">Troubleshooting Tips</h2>
        <ul className="list-disc pl-5 text-yellow-800">
          <li>Make sure your API key is correct in the .env file</li>
          <li>The .env file should be in the root of your project</li>
          <li>Restart the development server after changing the .env file</li>
          <li>Check the browser console for detailed error messages</li>
          <li>Refer to the TMDB_API_INSTRUCTIONS.md file for setup help</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTest;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiTest />
  </React.StrictMode>,
);
