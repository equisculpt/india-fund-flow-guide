
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface WinnerAnnouncementProps {
  bestFund: string;
  bestScore: number;
  reasoning: string;
}

const WinnerAnnouncement = ({ bestFund, bestScore, reasoning }: WinnerAnnouncementProps) => {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <div>
            <h3 className="text-lg font-bold text-green-800">
              🤖 AI Research Analysis: {bestFund}
            </h3>
            <p className="text-green-700">
              Score: {bestScore}/10 • {reasoning}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WinnerAnnouncement;
