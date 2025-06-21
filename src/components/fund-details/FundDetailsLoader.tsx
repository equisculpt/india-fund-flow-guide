
import { Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';

interface FundDetailsLoaderProps {
  fundId: string | undefined;
}

const FundDetailsLoader = ({ fundId }: FundDetailsLoaderProps) => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <span>Loading fund details...</span>
            <div className="text-sm text-gray-500 mt-2">Fund ID: {fundId}</div>
            <div className="text-sm text-gray-500 mt-1">
              Please wait while we fetch the latest information
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FundDetailsLoader;
