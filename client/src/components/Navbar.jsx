import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar({ darkMode, onToggle }) {
  return (
    <nav className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md fixed w-full z-10 top-0">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand Name - uses Link from react-router-dom */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/logo192.jpg" // This path works because the image is in the 'public' folder
              alt="Prometheus Logo" 
              className="h-8 w-auto" // Adjust height as needed
            />
            <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              Prometheus
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              Home
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              About
            </Link>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center">
            <DarkModeToggle darkMode={darkMode} onToggle={onToggle} />
          </div>
        </div>
      </div>
    </nav>
  );
}
