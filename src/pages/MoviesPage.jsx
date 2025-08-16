import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { movieService } from '../api/movieService';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';

const MoviesPage = () => {
  const { id: genreId } = useParams(); // Get genre ID from URL if available
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState(genreId ? { with_genres: genreId } : {});

  // Update filters when genre ID changes in URL
  useEffect(() => {
    if (genreId) {
      setFilters(prev => ({ ...prev, with_genres: genreId }));
    }
  }, [genreId]);

  // Fetch movies when page or filters change
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        // Combine page parameter with other filters
        const params = { ...filters, page: currentPage };
        
        // Log for debugging
        console.log('Fetching movies with params:', params);
        
        const data = await movieService.discoverMovies(params);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500)); // TMDb API limits to 500 pages
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [currentPage, filters]);

  // Update URL when page changes
  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  if (error) {
    return (
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
    );
  }

  return (
    <div className="movies-page container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Discover Movies</h1>
      
      {/* Filters */}
      <FilterBar onFilterChange={handleFilterChange} />
      
      {/* Loading indicator */}
      {loading && <LoadingSpinner />}
      
      {/* Movies grid */}
      {!loading && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          
          {/* No results message */}
          {movies.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No movies found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          )}
          
          {/* Pagination */}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
};

export default MoviesPage;
