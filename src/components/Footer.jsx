import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--primary-color)] text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-[var(--accent-color)]">Movie</span>
              <span className="text-[var(--secondary-color)]">Box</span>
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Your ultimate destination for exploring movies. Powered by TMDb API.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[var(--secondary-color)]">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-[var(--secondary-color)]">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-[var(--secondary-color)]">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[var(--secondary-color)] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/movies" className="text-gray-300 hover:text-[var(--secondary-color)] transition-colors">Movies</Link>
              </li>
              <li>
                <Link to="/movies" className="text-gray-300 hover:text-[var(--secondary-color)] transition-colors">Categories</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-[var(--secondary-color)] transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-[var(--secondary-color)] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[var(--secondary-color)] transition-colors">
                  TMDb API
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-center text-gray-400">
          <p>
            © {currentYear} MovieBox. All rights reserved.
          </p>
          <p className="mt-2">
            Proudly powered by the TMDb API - delivering high-quality movie data.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
