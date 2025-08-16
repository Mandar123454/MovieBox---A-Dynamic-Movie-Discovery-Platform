import { useState } from 'react';

const ApiDebugger = () => {
  const [showDebugger, setShowDebugger] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const apiKeyMasked = apiKey ? 
    `${apiKey.substring(0, 4)}${'*'.repeat(apiKey.length - 8)}${apiKey.substring(apiKey.length - 4)}` : 
    'Not provided';
    
  const envApiKey = import.meta.env.VITE_TMDB_API_KEY || 'Not found in .env';
  const maskedEnvKey = envApiKey !== 'Not found in .env' ? 
    `${envApiKey.substring(0, 4)}${'*'.repeat(envApiKey.length - 8)}${envApiKey.substring(envApiKey.length - 4)}` : 
    envApiKey;
  
  const testApi = async () => {
    setIsLoading(true);
    setTestResult(null);
    const keyToUse = apiKey || import.meta.env.VITE_TMDB_API_KEY;
    
    if (!keyToUse) {
      setTestResult({
        success: false,
        message: 'No API key provided'
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${keyToUse}`);
      const data = await response.json();
      
      if (data.success === false) {
        setTestResult({
          success: false,
          message: data.status_message || 'Unknown error',
          data
        });
      } else {
        setTestResult({
          success: true,
          message: 'API connection successful',
          data
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: error.message,
        error
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!showDebugger) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowDebugger(true)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
        >
          Show API Debugger
        </button>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white shadow-xl rounded-lg p-4 w-96 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">API Debugger</h3>
        <button
          onClick={() => setShowDebugger(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          × Close
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Current API Key (.env):</p>
        <div className="bg-gray-100 p-2 rounded text-sm font-mono">{maskedEnvKey}</div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Test with custom API key (optional):
        </label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter API key to test"
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        />
      </div>
      
      <button
        onClick={testApi}
        disabled={isLoading}
        className={`w-full py-2 rounded-md text-white font-medium ${
          isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Testing...' : 'Test API Connection'}
      </button>
      
      {testResult && (
        <div className={`mt-4 p-3 rounded-md ${
          testResult.success ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <p className={`font-medium ${
            testResult.success ? 'text-green-800' : 'text-red-800'
          }`}>
            {testResult.success ? '✓ Success' : '✗ Error'}
          </p>
          <p className="text-sm mt-1">{testResult.message}</p>
          
          {testResult.success && (
            <div className="mt-2 text-xs text-gray-600">
              <p>API Version: {testResult.data.images?.base_url ? '3' : 'Unknown'}</p>
              <p>Image Base URL: {testResult.data.images?.secure_base_url || 'Not available'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiDebugger;
