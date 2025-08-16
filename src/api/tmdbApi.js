import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Check if API key exists and log appropriate message
if (!API_KEY) {
  console.error('TMDB API Key is missing! Please add it to your .env file as VITE_TMDB_API_KEY');
} else {
  console.log('TMDB API Key is configured:', API_KEY ? `${API_KEY.substring(0, 4)}...${API_KEY.substring(API_KEY.length - 4)}` : 'Invalid');
}

// Create an Axios instance with common configuration for v3 API key (standard TMDB key)
const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
});

// Add a response interceptor for better error handling
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('TMDB API Error:', error.response.status, error.response.data);
      
      if (error.response.status === 401) {
        console.error('API Key authentication failed. Please check your API key.');
      }
    }
    return Promise.reject(error);
  }
);

// Define the API endpoints
export const endpoints = {
  // Movies
  popularMovies: '/movie/popular',
  topRatedMovies: '/movie/top_rated',
  upcomingMovies: '/movie/upcoming',
  nowPlayingMovies: '/movie/now_playing',
  movieDetails: (id) => `/movie/${id}`,
  movieCredits: (id) => `/movie/${id}/credits`,
  movieVideos: (id) => `/movie/${id}/videos`,
  movieRecommendations: (id) => `/movie/${id}/recommendations`,
  
  // Search
  searchMovies: '/search/movie',
  
  // Genres
  genreList: '/genre/movie/list',
  
  // Discover
  discoverMovies: '/discover/movie',
};

// Export common image URLs
export const imageBaseURL = {
  small: 'https://image.tmdb.org/t/p/w200',
  medium: 'https://image.tmdb.org/t/p/w300',
  large: 'https://image.tmdb.org/t/p/w500',
  original: 'https://image.tmdb.org/t/p/original',
};

export default tmdbApi;
