import React from 'react';

export default function HistoryList({ history, onSelect }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg dark:text-gray-300 font-bold mb-2">Analysis History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No previous analyses yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item, idx) => (
            <li key={idx} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition" onClick={() => onSelect(idx)}>
              <div className="flex justify-between items-center">
                <span className={item.prediction === 'fake' ? 'text-red-600' : 'text-green-600'}>
                  {item.prediction.charAt(0).toUpperCase() + item.prediction.slice(1)}
                </span>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 truncate">{item.text.slice(0, 60)}...</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
