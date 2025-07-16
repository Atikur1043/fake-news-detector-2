import { useState } from 'react';
import NewsInputForm from '../components/NewsInputForm';
import HistoryList from '../components/HistoryList';

export default function HomePage() {
  const [history, setHistory] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleAnalysis = (analysis) => {
    const entry = {
      ...analysis,
      text: analysis.text,
      date: new Date().toLocaleString()
    };
    setHistory([entry, ...history]);
    setSelectedIdx(0);
  };

  const handleSelectHistory = (idx) => {
    setSelectedIdx(idx);
  };

  return (
    // This is the content that was previously in App.js
    <div className="py-12 transition">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700 dark:text-blue-300 drop-shadow-sm tracking-tight">
        Prometheus <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">- AI Fake News Detector</span>
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto px-4">
        <div className="flex-1">
          <NewsInputForm
            onAnalysis={handleAnalysis}
            analysis={selectedIdx !== null ? history[selectedIdx] : null}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <HistoryList history={history} onSelect={handleSelectHistory} />
        </div>
      </div>
    </div>
  );
}
