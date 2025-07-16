import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-blue-700 dark:text-blue-300">
          About Prometheus
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          An AI-powered tool to help you navigate the complex landscape of online information.
        </p>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-bold border-b-2 border-blue-500 dark:border-blue-400 pb-2">Project Overview</h2>
          <p>
            Prometheus is a full-stack web application designed to combat the spread of misinformation. By leveraging the power of advanced Natural Language Processing (NLP) models, it analyzes news articles to predict the likelihood of it being fake news.
          </p>

          <h2 className="text-2xl font-bold border-b-2 border-blue-500 dark:border-blue-400 pb-2">Tech Stack</h2>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Frontend:</strong> React with Tailwind CSS</li>
            <li><strong>Backend:</strong> Node.js with Express</li>
            <li><strong>Database:</strong> MongoDB</li>
            <li><strong>AI/ML:</strong> Hugging Face Transformers with PyTorch</li>
          </ul>

          <h2 className="text-2xl font-bold border-b-2 border-blue-500 dark:border-blue-400 pb-2">Credits</h2>
          <p>
            This project was conceived, designed, and developed by Sk Atikur Rahaman. You can connect with me on{' '}
            <a
              href="https://www.linkedin.com/in/sk-atikur-rahaman-48a698278/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              LinkedIn
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
