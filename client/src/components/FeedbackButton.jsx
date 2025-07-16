import React from 'react';

export default function FeedbackButton({ onFeedback, disabled }) {
  return (
    <button
      onClick={onFeedback}
      disabled={disabled}
      className={`mt-4 px-4 py-2 rounded-lg text-white font-semibold shadow transition-all duration-150 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'}`}
    >
      Report Incorrect Prediction
    </button>
  );
}
