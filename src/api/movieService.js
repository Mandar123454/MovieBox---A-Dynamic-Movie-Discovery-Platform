import tmdbApi, { endpoints, imageBaseURL } from './tmdbApi';

// Service for movie-related API calls
export const movieService = {
  /**
   * Get a list of popular movies
   * @param {number} page - Page number for pagination
   * @returns {Promise} - Promise containing movie data
   */
  getPopularMovies: async (page = 1) => {
    try {
      console.log('Fetching popular movies...');
      
      const response = await tmdbApi.get(endpoints.popularMovies, {
        params: { page },
      });
      
      console.log('Popular movies found:', response.data.results?.length || 0);
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error.message);
      // Add fallback data for development/testing
      if (process.env.NODE_ENV === 'development') {
        console.warn('Using fallback data for development');
        return { 
          results: [], 
          page: 1, 
          total_pages: 0, 
          total_results: 0 
        };
      }
      throw error;
    }
  },

  /**
   * Get a list of top-rated movies
   * @param {number} page - Page number for pagination
   * @returns {Promise} - Promise containing movie data
   */
  getTopRatedMovies: async (page = 1) => {
    try {
      const response = await tmdbApi.get(endpoints.topRatedMovies, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  /**
   * Get details for a specific movie
   * @param {number} movieId - ID of the movie
   * @returns {Promise} - Promise containing movie details
   */
  getMovieDetails: async (movieId) => {
    try {
      const response = await tmdbApi.get(endpoints.movieDetails(movieId), {
        params: { append_to_response: 'videos,credits' },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie details for ID ${movieId}:`, error);
      throw error;
    }
  },

  /**
   * Search for movies by keyword
   * @param {string} query - Search term
   * @param {number} page - Page number for pagination
   * @returns {Promise} - Promise containing search results
   */
  searchMovies: async (query, page = 1) => {
    try {
      const response = await tmdbApi.get(endpoints.searchMovies, {
        params: { query, page },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  /**
   * Get list of movie genres
   * @returns {Promise} - Promise containing genre list
   */
  getGenres: async () => {
    try {
      const response = await tmdbApi.get(endpoints.genreList);
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  },

  /**
   * Discover movies with filters
   * @param {Object} params - Filter parameters
   * @returns {Promise} - Promise containing filtered movie results
   */
  discoverMovies: async (params) => {
    try {
      // Log the API call for debugging
      console.log('Discovering movies with params:', params);
      
      const response = await tmdbApi.get(endpoints.discoverMovies, {
        params: {
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error discovering movies:', error);
      throw error;
    }
  },

  /**
   * Get full image URL
   * @param {string} path - Image path from API
   * @param {string} size - Size of the image (small, medium, large, original)
   * @returns {string} - Complete image URL
   */
  getImageUrl: (path, size = 'medium') => {
    if (!path) return null;
    return `${imageBaseURL[size]}${path}`;
  },
};
