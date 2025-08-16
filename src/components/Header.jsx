import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className="bg-[var(--primary-color)] text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white no-underline flex items-center">
              <span className="text-[var(--accent-color)]">Movie</span>
              <span className="text-[var(--secondary-color)]">Box</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-[var(--secondary-color)] no-underline transition-colors">
              Home
            </Link>
            <Link to="/movies" className="text-white hover:text-[var(--secondary-color)] no-underline transition-colors">
              Movies
            </Link>
            <div className="group relative">
              <button className="text-white hover:text-[var(--secondary-color)] transition-colors">
                Categories
              </button>
              <div className="hidden group-hover:block absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link to="/genre/28" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Action</Link>
                <Link to="/genre/12" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Adventure</Link>
                <Link to="/genre/16" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Animation</Link>
                <Link to="/genre/35" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Comedy</Link>
                <Link to="/genre/18" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Drama</Link>
                <Link to="/movies" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-semibold">More...</Link>
              </div>
            </div>
          </nav>
          
          <div className="w-full md:w-auto">
            <SearchBar />
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        
        {/* Mobile navigation - hidden by default */}
        <div className="hidden md:hidden pt-4 pb-2">
          <Link to="/" className="block py-2 text-white hover:text-[var(--secondary-color)] transition-colors">
            Home
          </Link>
          <Link to="/movies" className="block py-2 text-white hover:text-[var(--secondary-color)] transition-colors">
            Movies
          </Link>
          <div className="py-2">
            <div className="text-white">Categories</div>
            <div className="pl-4 mt-1">
              <Link to="/genre/28" className="block py-1 text-white hover:text-[var(--secondary-color)]">Action</Link>
              <Link to="/genre/12" className="block py-1 text-white hover:text-[var(--secondary-color)]">Adventure</Link>
              <Link to="/genre/16" className="block py-1 text-white hover:text-[var(--secondary-color)]">Animation</Link>
              <Link to="/movies" className="block py-1 text-white hover:text-[var(--secondary-color)]">More...</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
