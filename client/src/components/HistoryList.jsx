
export default function HistoryList({ history, onSelect, isLoading }) {
  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-lg dark:text-gray-300 font-bold mb-2">Analysis History</h2>
        <p className="text-gray-500 dark:text-gray-400">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg dark:text-gray-300 font-bold mb-2">Analysis History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No previous analyses yet.</p>
      ) : (
        <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {history.map((item) => (
            <li 
              key={item._id} 
              className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition" 
              onClick={() => onSelect(item)}
            >
              <div className="flex justify-between items-center">
                <span className={`font-bold ${item.prediction === 'fake' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                  {item.prediction.charAt(0).toUpperCase() + item.prediction.slice(1)}
                </span>
                {/* Format the date for better readability */}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 truncate mt-1">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
