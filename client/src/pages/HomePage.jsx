import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import NewsInputForm from '../components/NewsInputForm';
import HistoryList from '../components/HistoryList';
import AuthContext from '../context/AuthContext';

export default function HomePage() {
  const [history, setHistory] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      try {
        setIsLoadingHistory(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        // FIX: Use relative path for API call
        const { data } = await axios.get('/api/history', config);
        setHistory(data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchHistory();
  }, [user]);

  const handleNewAnalysis = (newAnalysis) => {
    setHistory([newAnalysis, ...history]);
    setSelectedAnalysis(newAnalysis);
  };

  const handleSelectHistory = (analysisItem) => {
    setSelectedAnalysis(analysisItem);
  };

  return (
    <div className="py-12 transition"> 
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700 dark:text-blue-300 drop-shadow-sm tracking-tight">
        Prometheus <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">- AI Fake News Detector</span>
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto px-4">
        <div className="flex-1">
          <NewsInputForm 
            onAnalysis={handleNewAnalysis}
            analysis={selectedAnalysis}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <HistoryList 
            history={history} 
            onSelect={handleSelectHistory}
            isLoading={isLoadingHistory}
          />
        </div>
      </div>
    </div>
  );
}
