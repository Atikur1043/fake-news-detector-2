import NewsInputForm from './components/NewsInputForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Fake News Detector</h1>
      <NewsInputForm />
    </div>
  );
}

export default App;