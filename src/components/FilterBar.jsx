import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../api/movieService';

const FilterBar = ({ onFilterChange }) => {
  const { id: urlGenreId } = useParams();
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(urlGenreId || '');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  
  // Generate a list of years from current year to 20 years ago
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsList = Array.from({ length: 20 }, (_, i) => currentYear - i);
    setYears(yearsList);
  }, []);
  
  // Load genres from API
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresList = await movieService.getGenres();
        setGenres(genresList);
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    };
    loadGenres();
  }, []);

  // Apply filters when changed
  const handleFilterChange = () => {
    const filters = {
      with_genres: selectedGenre || undefined,
      primary_release_year: selectedYear || undefined,
      sort_by: sortBy,
    };
    onFilterChange(filters);
  };

  // Handle individual filter changes
  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    
    // Navigate to the genre page if a genre is selected, otherwise go to movies page
    if (genreId) {
      navigate(`/genre/${genreId}`);
    } else {
      navigate('/movies');
    }
  };
  
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // Apply filters when any selection changes
  useEffect(() => {
    handleFilterChange();
  }, [selectedGenre, selectedYear, sortBy]);

  return (
    <div className="filter-bar bg-gray-100 p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4">
      <div className="filter-group flex-1 min-w-[200px]">
        <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Genre
        </label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="w-full p-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group flex-1 min-w-[200px]">
        <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Release Year
        </label>
        <select
          id="year-filter"
          value={selectedYear}
          onChange={handleYearChange}
          className="w-full p-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group flex-1 min-w-[200px]">
        <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          id="sort-filter"
          value={sortBy}
          onChange={handleSortChange}
          className="w-full p-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="popularity.desc">Popularity (Descending)</option>
          <option value="popularity.asc">Popularity (Ascending)</option>
          <option value="vote_average.desc">Rating (Descending)</option>
          <option value="vote_average.asc">Rating (Ascending)</option>
          <option value="release_date.desc">Release Date (Newest)</option>
          <option value="release_date.asc">Release Date (Oldest)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
