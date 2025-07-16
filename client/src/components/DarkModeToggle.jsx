import React from 'react';

export default function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      // The absolute positioning classes have been removed so it fits nicely in the Navbar
      className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <span>&#x1F319; Dark</span>
      ) : (
        <span>&#x2600; Light</span>
      )}
    </button>
  );
}
