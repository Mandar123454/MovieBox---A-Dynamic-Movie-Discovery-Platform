import { Link } from 'react-router-dom';
import { movieService } from '../api/movieService';

const MovieCard = ({ movie }) => {
  const imageUrl = movieService.getImageUrl(movie.poster_path, 'medium');
  const fallbackImageUrl = 'https://via.placeholder.com/300x450?text=No+Image+Available';
  
  // Function to format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="movie-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative pb-[150%] overflow-hidden">
          <img 
            src={imageUrl || fallbackImageUrl} 
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = fallbackImageUrl;
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="rating-badge absolute top-4 right-4 bg-yellow-500 text-black font-bold rounded-full h-10 w-10 flex items-center justify-center">
              {movie.vote_average?.toFixed(1)}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/movie/${movie.id}`} className="no-underline">
          <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 mb-1 truncate">{movie.title}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">{formatDate(movie.release_date)}</p>
        <p className="text-gray-700 text-sm truncate-overflow h-10">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
