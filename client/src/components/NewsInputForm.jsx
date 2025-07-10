import { useState } from 'react';
import axios from 'axios';

export default function NewsInputForm() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeNews = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/analyze',
        { text }
      );
      setResult(response.data);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <textarea
        className="w-full p-4 border rounded-lg mb-4"
        rows="8"
        placeholder="Paste news article here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={analyzeNews}
        disabled={!text || isLoading}
        className={`px-6 py-2 rounded-lg text-white ${
          !text || isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
      {result && (
        <div className="mt-6 p-4 border-t">
          <h3 className="text-lg font-semibold">Result:</h3>
          <p>Prediction: <span className={result.prediction === 'fake' ? 'text-red-600' : 'text-green-600'}>
            {result.prediction} ({(result.confidence * 100).toFixed(1)}% confidence)
          </span></p>
          <p className="mt-2 text-gray-700">{result.explanation}</p>
        </div>
      )}
    </div>
  );
}