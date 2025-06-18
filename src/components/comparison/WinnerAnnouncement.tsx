
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface WinnerAnnouncementProps {
  bestFund: string;
  bestScore: number;
  reasoning: string;
}

const WinnerAnnouncement = ({ bestFund, bestScore, reasoning }: WinnerAnnouncementProps) => {
  return (
    <Card className="border-2 border-green-500 bg-green-50">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <Trophy className="h-8 w-8 text-green-600" />
          <div>
            <h2 className="text-xl font-bold text-green-800">
              🏆 AI Winner: {bestFund}
            </h2>
            <p className="text-green-700">
              AI Score: {bestScore}/10 • {reasoning}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WinnerAnnouncement;
