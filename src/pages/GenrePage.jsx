import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { movieService } from '../api/movieService';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';

const GenrePage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page') || '1';
  
  const [genreInfo, setGenreInfo] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam));
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({ with_genres: id });
  
  // Fetch genre name
  useEffect(() => {
    const fetchGenreInfo = async () => {
      try {
        const genres = await movieService.getGenres();
        const genre = genres.find(g => g.id === parseInt(id));
        
        if (genre) {
          setGenreInfo(genre);
          document.title = `${genre.name} Movies - MovieBox`;
        } else {
          setError('Genre not found');
        }
      } catch (err) {
        console.error('Error fetching genre info:', err);
        setError('Failed to load genre information');
      }
    };
    
    fetchGenreInfo();
  }, [id]);
  
  // Fetch movies by genre
  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        setLoading(true);
        
        // Always include the genre ID in filters
        const params = { 
          ...filters, 
          with_genres: id, 
          page: currentPage 
        };
        
        const data = await movieService.discoverMovies(params);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500)); // TMDb API limits to 500 pages
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies by genre:', err);
        setError('Failed to load movies. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchMoviesByGenre();
  }, [id, currentPage, filters]);
  
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
    // Always keep the genre filter
    setFilters({ ...newFilters, with_genres: id });
    setCurrentPage(1); // Reset to first page when filters change
  };

  if (error && !genreInfo) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <button 
          onClick={() => window.history.back()} 
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="genre-page container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {genreInfo?.name || 'Loading...'} Movies
      </h1>
      
      {/* Filters */}
      <FilterBar onFilterChange={handleFilterChange} />
      
      {/* Loading indicator */}
      {loading && <LoadingSpinner />}
      
      {/* Movies grid */}
      {!loading && (
        <>
          {movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
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
      
      {/* Error message */}
      {error && movies.length === 0 && (
        <div className="text-center py-12">
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

export default GenrePage;
