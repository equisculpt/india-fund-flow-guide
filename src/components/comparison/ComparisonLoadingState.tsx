
import Header from '@/components/Header';

const ComparisonLoadingState = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">🤖 AI is analyzing your funds...</p>
          <p className="text-sm text-gray-600 mt-2">This may take a few moments for comprehensive analysis</p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonLoadingState;
