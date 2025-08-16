import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieService } from '../api/movieService';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const pageParam = searchParams.get('page') || '1';
  
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam));
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch search results when query or page changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        setTotalPages(0);
        setTotalResults(0);
        return;
      }
      
      try {
        setLoading(true);
        const data = await movieService.searchMovies(query, currentPage);
        
        setSearchResults(data.results);
        setTotalPages(Math.min(data.total_pages, 500)); // TMDb API limits to 500 pages
        setTotalResults(data.total_results);
        
        setLoading(false);
      } catch (err) {
        console.error('Error searching movies:', err);
        setError('Failed to load search results. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query, currentPage]);

  // Update URL when page changes
  useEffect(() => {
    setSearchParams({ query, page: currentPage.toString() });
  }, [currentPage, setSearchParams, query]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="search-page container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      
      {query ? (
        <p className="text-gray-600 mb-8">
          Found {totalResults.toLocaleString()} results for "{query}"
        </p>
      ) : (
        <p className="text-gray-600 mb-8">
          Enter a search term to find movies
        </p>
      )}
      
      {/* Loading indicator */}
      {loading && <LoadingSpinner />}
      
      {/* Search results */}
      {!loading && (
        <>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              {query ? (
                <>
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-gray-600">Try different keywords or check your spelling</p>
                </>
              ) : (
                <h3 className="text-xl font-semibold mb-2">Enter a search term to begin</h3>
              )}
            </div>
          )}
          
          {/* Pagination */}
          {searchResults.length > 0 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
      
      {/* Error message */}
      {error && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
