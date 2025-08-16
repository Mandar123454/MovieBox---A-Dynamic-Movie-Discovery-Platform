import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movieService } from '../api/movieService';
import tmdbApi, { endpoints } from '../api/tmdbApi';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieCard from '../components/MovieCard';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch movie details
        const movieData = await movieService.getMovieDetails(id);
        setMovie(movieData);
        
        // Fetch recommended movies
        const recommendations = await tmdbApi.get(endpoints.movieRecommendations(id));
        setRecommendedMovies(recommendations.data.results);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);
  
  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format money values
  const formatCurrency = (value) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <Link 
          to="/" 
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="movie-details-page">
      {/* Movie backdrop header */}
      <div 
        className="movie-backdrop w-full h-[70vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                            url(${movieService.getImageUrl(movie.backdrop_path, 'original')})`
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
            {/* Movie poster */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
              <img 
                src={movieService.getImageUrl(movie.poster_path, 'large')} 
                alt={movie.title} 
                className="rounded-lg shadow-xl max-h-[500px] object-cover"
              />
            </div>
            
            {/* Movie info */}
            <div className="md:col-span-8 lg:col-span-9 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {movie.title}
                <span className="text-gray-300 font-normal">
                  {movie.release_date ? ` (${new Date(movie.release_date).getFullYear()})` : ''}
                </span>
              </h1>
              
              {/* Movie meta info */}
              <div className="flex flex-wrap items-center gap-3 text-sm md:text-base mb-4 text-gray-300">
                <span>{formatDate(movie.release_date)}</span>
                <span>•</span>
                <span>{formatRuntime(movie.runtime)}</span>
                <span>•</span>
                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map((genre) => (
                    <Link 
                      key={genre.id} 
                      to={`/genre/${genre.id}`} 
                      className="px-3 py-1 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-yellow-500 text-black font-bold rounded-full h-10 w-10 flex items-center justify-center">
                  {movie.vote_average?.toFixed(1)}
                </div>
                <span className="text-gray-300">
                  User Score ({movie.vote_count?.toLocaleString()} votes)
                </span>
              </div>
              
              {/* Tagline */}
              {movie.tagline && (
                <div className="text-gray-300 italic mb-4">"{movie.tagline}"</div>
              )}
              
              {/* Overview */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Overview</h3>
                <p className="text-gray-200 text-balance leading-relaxed">{movie.overview || 'No overview available.'}</p>
              </div>
              
              {/* Credits */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Featured Cast</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {movie.credits?.cast?.slice(0, 6).map((person) => (
                    <div key={person.id} className="text-gray-200">
                      <div className="font-medium">{person.name}</div>
                      <div className="text-gray-400 text-sm">{person.character}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        {/* Additional movie details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Production companies */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Production Companies</h3>
            <div className="space-y-4">
              {movie.production_companies?.length > 0 ? (
                movie.production_companies.map((company) => (
                  <div key={company.id} className="flex items-center">
                    {company.logo_path ? (
                      <img 
                        src={movieService.getImageUrl(company.logo_path, 'small')} 
                        alt={company.name} 
                        className="h-8 object-contain mr-2"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-2">
                        <span className="text-xs font-bold">{company.name.charAt(0)}</span>
                      </div>
                    )}
                    <span>{company.name}</span>
                  </div>
                ))
              ) : (
                <p>No production company information available.</p>
              )}
            </div>
          </div>
          
          {/* Financial info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Financial Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium">{movie.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Budget:</span>
                <span className="font-medium">{formatCurrency(movie.budget)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-medium">{formatCurrency(movie.revenue)}</span>
              </div>
            </div>
          </div>
          
          {/* Additional info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Original Language:</span>
                <span className="font-medium">{movie.original_language?.toUpperCase()}</span>
              </div>
              {movie.homepage && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Website:</span>
                  <a 
                    href={movie.homepage} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    Visit
                  </a>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Adult Content:</span>
                <span className="font-medium">{movie.adult ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trailer section */}
        {movie.videos?.results?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Trailers & Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movie.videos.results.slice(0, 2).map((video) => (
                <div key={video.id} className="aspect-video">
                  <iframe
                    title={video.name}
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg shadow-md"
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Recommendations */}
        {recommendedMovies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {recommendedMovies.slice(0, 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
