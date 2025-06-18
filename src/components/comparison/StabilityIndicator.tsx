
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface StabilityIndicatorProps {
  isStableResult: boolean;
}

const StabilityIndicator = ({ isStableResult }: StabilityIndicatorProps) => {
  if (!isStableResult) return null;

  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="pt-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <p className="text-green-800 text-sm">
            ✅ Stable AI Analysis - Results will remain consistent until market conditions or fund data changes
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StabilityIndicator;
