# MovieBox - A Dynamic Movie Discovery Platform

A modern, responsive React application that provides users with an immersive movie browsing experience. Powered by the TMDb API, it offers real-time access to popular, top-rated, and upcoming movies, detailed information pages, advanced filtering options, and a seamless search functionality.

## Features

- **Dynamic Homepage**: Featured hero section with randomly selected popular movie
- **Movie Browsing**: Browse through popular, top-rated, and upcoming movies with pagination
- **Search Functionality**: Search for movies by title with real-time results
- **Advanced Filtering**: Filter movies by genre, release year, and sort by various criteria
- **Detailed Movie Pages**: Comprehensive movie details including synopsis, cast, runtime, ratings, and more
- **Category Navigation**: Browse movies by genre with dedicated category pages
- **Responsive Design**: Fully responsive layout that works beautifully on desktop, tablet, and mobile devices
- **Performance Optimized**: Fast loading times with efficient API calls and data management
- **Error Handling**: Robust error handling with user-friendly messages

## Tech Stack

- **Frontend Framework**: React.js v19.1.1 with Vite v7.1.2 for lightning-fast development
- **Routing**: React Router DOM v7.8.1 for seamless navigation
- **Styling**: 
  - Tailwind CSS v3.4.17 for utility-first styling
  - Custom CSS variables for theming
  - PostCSS with nesting plugin for enhanced CSS capabilities
- **API Integration**: 
  - TMDb (The Movie Database) API for comprehensive movie data
  - Axios v1.11.0 for efficient HTTP requests
- **State Management**: React Hooks for component-level and application state

## Prerequisites

- Node.js (v14+)
- NPM or Yarn
- TMDb API key (get one at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

## Screenshots

### Homepage with Featured Movie
![Homepage](Screenshots/Homepage%20with%20Featured%20Movie.png)

### Movie Details Page
![Movie Details](Screenshots/Movie%20Details%20Page.png)

### Search Results
![Search Results](Screenshots/Search%20Results.png)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Mandar123454/MovieBox---A-Dynamic-Movie-Discovery-Platform.git
   cd MovieBox---A-Dynamic-Movie-Discovery-Platform
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your TMDb API key
   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```
   You can get a free API key from [TMDb API](https://www.themoviedb.org/settings/api)

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173` or `http://localhost:5174`)

## Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This app can be deployed to services like:
- Vercel
- Netlify
- GitHub Pages

Make sure to set up your environment variables on the deployment platform.

## Project Structure

```
movie-app/
├── src/
│   ├── api/                  # API services and configuration
│   │   ├── tmdbApi.js        # TMDb API configuration
│   │   └── movieService.js   # Movie-related API services
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Header.jsx        # Application header with navigation
│   │   ├── Footer.jsx        # Application footer
│   │   ├── MovieCard.jsx     # Card component for movie listings
│   │   ├── SearchBar.jsx     # Search input component
│   │   ├── FilterBar.jsx     # Filtering controls component
│   │   ├── Pagination.jsx    # Pagination component
│   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   └── ApiKeyError.jsx   # Component for API key errors
│   │
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx     # Landing page with featured movies
│   │   ├── MoviesPage.jsx   # Browse movies page with filters
│   │   ├── MovieDetailsPage.jsx # Detailed movie information
│   │   ├── SearchPage.jsx   # Search results page
│   │   └── NotFoundPage.jsx # 404 page
│   │
│   ├── App.jsx             # Main App component with routing
│   ├── index.css           # Global styles and CSS variables
│   └── main.jsx            # Application entry point
│
├── public/                 # Public assets
├── .env                    # Environment variables
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project dependencies
```

## Key Implementation Details

### API Integration

```jsx
// tmdbApi.js - Base API configuration
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
});

export default tmdbApi;
```

### Routing Configuration

```jsx
// App.jsx - Routing setup
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/genre/:id" element={<MoviesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
```

### Component Example

```jsx
// MovieCard.jsx - Reusable movie card component
const MovieCard = ({ movie }) => {
  const imageUrl = movieService.getImageUrl(movie.poster_path, 'medium');
  
  return (
    <div className="movie-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative pb-[150%] overflow-hidden">
          <img 
            src={imageUrl || fallbackImageUrl} 
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="rating-badge absolute top-4 right-4 bg-yellow-500 text-black font-bold rounded-full h-10 w-10 flex items-center justify-center">
            {movie.vote_average?.toFixed(1)}
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{movie.title}</h3>
        <p className="text-gray-500 text-sm">{formatDate(movie.release_date)}</p>
        <p className="text-gray-700 text-sm truncate-overflow h-10">{movie.overview}</p>
      </div>
    </div>
  );
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## API Attribution

This project proudly uses the TMDb API for movie data.

![TMDb Logo](https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg)

To get your own API key:

1. Sign up at [themoviedb.org](https://www.themoviedb.org/)
2. Get an API key from your account settings:
   - Go to your [account settings](https://www.themoviedb.org/settings/api)
   - Click on "API" in the left sidebar
   - Click "Create" under "Request an API Key"
   - Select "Developer" option
   - Fill out the required information
3. Add the API key to your `.env` file as `VITE_TMDB_API_KEY=your_key_here`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Mandar - [mandar123454@example.com](mailto:mandar123454@example.com)

Project Link: [https://github.com/Mandar123454/MovieBox---A-Dynamic-Movie-Discovery-Platform](https://github.com/Mandar123454/MovieBox---A-Dynamic-Movie-Discovery-Platform)

### Troubleshooting API Key Issues

If you see the API Key Error screen:
- Make sure your `.env` file is in the correct location (root of the project)
- Ensure there are no spaces in your `.env` file entry
- Verify that your API key is active and correct
- Try restarting both the development server and your browser

Key API endpoints used:
- `/movie/popular` - Popular movies
- `/search/movie` - Search for movies
- `/movie/{movie_id}` - Movie details
- `/genre/movie/list` - Movie genres list

## License

This project is open source and available under the MIT License.

## Acknowledgements

- Data provided by [The Movie Database (TMDb) API](https://www.themoviedb.org/)
- Proudly powered by the TMDb API - delivering high-quality movie data.
