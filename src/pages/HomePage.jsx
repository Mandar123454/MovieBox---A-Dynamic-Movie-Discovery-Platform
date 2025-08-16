import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { movieService } from '../api/movieService';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import FilterBar from '../components/FilterBar';
import ApiKeyError from '../components/ApiKeyError';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  // Hero section movie - random selection from popular movies
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        console.log('Fetching movies with API key:', import.meta.env.VITE_TMDB_API_KEY ? 'Key exists' : 'No key found');
        
        // Test API key and connection first
        try {
          // Direct API test call to verify the key works
          const apiKey = import.meta.env.VITE_TMDB_API_KEY;
          console.log('Using API key:', apiKey ? `${apiKey.substring(0, 4)}...` : 'Missing');
          
          const testUrl = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;
          const testResponse = await fetch(testUrl);
          const testData = await testResponse.json();
          
          if (testData.success === false) {
            throw new Error(`API Error: ${testData.status_message}`);
          }
          console.log('API connection test successful');
        } catch (testError) {
          console.error('API connection test failed:', testError);
          setError(`API connection failed: ${testError.message}. Please check your API key.`);
          setLoading(false);
          return;
        }
        
        // Fetch popular movies
        const popular = await movieService.getPopularMovies();
        console.log('Popular movies response received:', popular ? 'success' : 'failed');
        
        if (popular && popular.results && popular.results.length > 0) {
          console.log(`Found ${popular.results.length} movies`);
          setPopularMovies(popular.results);
          
          // Select a random movie for the hero section
          const randomIndex = Math.floor(Math.random() * popular.results.length);
          setHeroMovie(popular.results[randomIndex]);
        } else {
          console.error('No movie results returned from API');
          setError('No movies found. Please check your API key and try again.');
        }
        
        // Fetch top rated movies
        const topRated = await movieService.getTopRatedMovies();
        setTopRatedMovies(topRated.results);
        
        // Fetch upcoming movies
        const upcoming = await movieService.discoverMovies({ 
          sort_by: 'release_date.desc',
          'release_date.gte': new Date().toISOString().split('T')[0]
        });
        setUpcomingMovies(upcoming.results);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Fetch filtered movies
    const fetchFilteredMovies = async () => {
      try {
        setLoading(true);
        const filteredMovies = await movieService.discoverMovies(newFilters);
        setPopularMovies(filteredMovies.results);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching filtered movies:', err);
        setError('Failed to apply filters. Please try again.');
        setLoading(false);
      }
    };
    
    fetchFilteredMovies();
  };

  if (error) {
    // If the error message contains API key reference, show the ApiKeyError component
    if (error.includes('API key') || error.includes('No movies found')) {
      return <ApiKeyError />;
    }
    
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

  if (loading && !popularMovies.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home-page">
      {/* Hero Section with Featured Movie */}
      {heroMovie && (
        <div 
          className="hero-section relative h-[60vh] bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                              url(${movieService.getImageUrl(heroMovie.backdrop_path, 'original')})`
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow">
                {heroMovie.title}
              </h1>
              <p className="text-gray-200 text-lg mb-6 leading-relaxed text-shadow-sm">
                {heroMovie.overview.length > 150 
                  ? `${heroMovie.overview.substring(0, 150)}...` 
                  : heroMovie.overview}
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded-full">
                  ★ {heroMovie.vote_average?.toFixed(1)}
                </span>
                <span className="text-white">
                  {new Date(heroMovie.release_date).getFullYear()}
                </span>
              </div>
              <Link 
                to={`/movie/${heroMovie.id}`} 
                className="inline-block px-6 py-3 bg-[var(--secondary-color)] text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-10">
        {/* Filters Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Discover Movies</h2>
          <FilterBar onFilterChange={handleFilterChange} />
        </div>
        
        {/* Popular Movies Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popular Movies</h2>
            <Link to="/movies" className="text-[var(--secondary-color)] hover:underline">
              View All
            </Link>
          </div>
          
          {loading && <LoadingSpinner />}
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {popularMovies.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
        
        {/* Top Rated Movies Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Top Rated Movies</h2>
            <Link to="/movies/top-rated" className="text-[var(--secondary-color)] hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {topRatedMovies.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
        
        {/* Upcoming Movies Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Upcoming Releases</h2>
            <Link to="/movies/upcoming" className="text-[var(--secondary-color)] hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {upcomingMovies.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
