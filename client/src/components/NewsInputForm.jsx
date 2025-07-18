import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FeedbackButton from './FeedbackButton';
import AuthContext from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default function NewsInputForm({ onAnalysis, analysis }) {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (analysis) {
      setResult(analysis);
      setText(analysis.text);
      setUrl('');
      setFeedbackSent(false);
    }
  }, [analysis]);

  const getAuthConfig = () => {
    if (!user || !user.token) {
      throw new Error('User is not authenticated');
    }
    return {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  };

  const resetState = () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setFeedbackSent(false);
  };

  const handleApiResponse = (response) => {
    const analysisResult = response.data;
    setResult(analysisResult);
    setText(analysisResult.text);
    if (onAnalysis) {
      onAnalysis(analysisResult);
    }
  };

  const analyzeText = async () => {
    if (!text) return;
    resetState();
    try {
      const config = getAuthConfig();
      const response = await axios.post(`${API_URL}/api/analyze`, { text }, config);
      handleApiResponse(response);
    } catch (err) {
      setError('Failed to analyze text. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeUrl = async () => {
    if (!url) return;
    resetState();
    try {
      const config = getAuthConfig();
      const response = await axios.post(`${API_URL}/api/analyze-url`, { url }, config);
      handleApiResponse(response);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to analyze URL. Please check the URL and try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendFeedback = async () => {
    if (!result || !result._id) return;
    try {
      const config = getAuthConfig();
      await axios.post(`${API_URL}/api/feedback`, {
        analysisId: result._id,
        isCorrect: false,
      }, config);
      setFeedbackSent(true);
    } catch (e) {
      setError('Failed to send feedback.');
      console.error(e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col gap-6">
      {/* URL Input Section */}
      <div>
        <label htmlFor="news-url" className="block text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
          Analyze from URL:
        </label>
        <div className="flex gap-2">
          <input
            id="news-url"
            type="url"
            className="flex-grow p-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="https://example.com/news-article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && analyzeUrl()}
          />
          <button
            onClick={analyzeUrl}
            disabled={!url || isLoading}
            className={`px-4 py-2 rounded-lg text-white font-semibold shadow transition-all duration-150 ${
              !url || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
            }`}
          >
            Fetch
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        <span className="text-gray-500 dark:text-gray-400 font-semibold">OR</span>
        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
      </div>

      {/* Text Input Section */}
      <div>
        <label htmlFor="news-text" className="block text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
          Paste your news article below:
        </label>
        <textarea
          id="news-text"
          className="w-full p-4 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition mb-2 resize-none min-h-[180px] text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          rows="8"
          placeholder="Paste news article here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button
        onClick={analyzeText}
        disabled={!text || isLoading}
        className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-white font-semibold shadow transition-all duration-150 ${
          !text || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
        }`}
      >
        {isLoading && (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        )}
        {isLoading ? 'Analyzing...' : 'Analyze Text'}
      </button>
      
      {/* Result Section */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg border border-red-300 dark:border-red-700">
          {error}
        </div>
      )}
      {result && (
        <div className={`mt-2 p-6 rounded-xl shadow border flex flex-col gap-2 ${result.prediction === 'fake' ? 'border-red-400 bg-red-50 dark:bg-red-950' : 'border-green-400 bg-green-50 dark:bg-green-950'}`}>
          <div className="flex items-center gap-2">
            {result.prediction === 'fake' ? (
              <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" /></svg>
            ) : (
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            )}
            <h3 className="text-xl text-gray-800 dark:text-gray-300 font-bold">Result:</h3>
          </div>
          <p className="text-lg dark:text-gray-300 font-semibold">Prediction: <span className={result.prediction === 'fake' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
            {result.prediction.charAt(0).toUpperCase() + result.prediction.slice(1)}
          </span></p>
          <p className="text-base dark:text-gray-300">Confidence: <span className="font-mono">{(result.confidence * 100).toFixed(1)}%</span></p>
          {result.explanation && <p className="mt-2 text-gray-700 dark:text-gray-200">{result.explanation}</p>}
          <FeedbackButton onFeedback={sendFeedback} disabled={feedbackSent} />
          {feedbackSent && <p className="text-sm text-green-600 dark:text-green-400 mt-2">Thank you for your feedback!</p>}
        </div>
      )}
    </div>
  );
}
