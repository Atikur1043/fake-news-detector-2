import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar({ darkMode, onToggle }) {
  const { user, logout, deleteAccount } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
    } catch (error) {
      console.error("Failed to delete account", error);
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md fixed w-full z-10 top-0">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo192.png" alt="Prometheus Logo" className="h-8 w-auto" />
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">Prometheus</span>
            </Link>

            <div className="flex items-center space-x-2 md:space-x-4">
              {user ? (
                <>
                  <span className="hidden sm:inline text-gray-700 dark:text-gray-300">Welcome, {user.displayName || user.username}</span>
                  <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">About</Link>
                  <button onClick={logout} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Logout</button>
                  {/* --- NEW: Delete Account Button --- */}
                  <button onClick={() => setIsModalOpen(true)} className="px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50">Delete Account</button>
                </>
              ) : (
                <>
                  <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">About</Link>
                  <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Login</Link>
                  <Link to="/signup" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Sign Up</Link>
                </>
              )}
              <DarkModeToggle darkMode={darkMode} onToggle={onToggle} />
            </div>
          </div>
        </div>
      </nav>

      {/* --- NEW: Confirmation Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Confirm Deletion</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Are you sure you want to delete your account? All of your analysis history will be permanently removed. This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
