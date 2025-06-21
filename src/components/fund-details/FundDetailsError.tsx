
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';

interface FundDetailsErrorProps {
  fundId: string | undefined;
  navError?: string;
  onBackClick: () => void;
}

const FundDetailsError = ({ fundId, navError, onBackClick }: FundDetailsErrorProps) => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              {navError || 'Failed to load fund details'}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Fund ID: {fundId}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              URL: {window.location.pathname}
            </div>
            <Button onClick={onBackClick} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FundDetailsError;
