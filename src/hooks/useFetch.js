import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data with loading, error, and refetch capabilities
 * @param {Function} fetchFunction - The function to call to fetch data
 * @param {Array} dependencies - Array of dependencies that should trigger a refetch
 * @returns {Object} - Object containing data, loading state, error state, and refetch function
 */
const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch data when dependencies change
  useEffect(() => {
    fetchData();
  }, [...dependencies]);
  
  // Function to manually trigger a refetch
  const refetch = () => {
    fetchData();
  };
  
  return { data, isLoading, error, refetch };
};

export default useFetch;
