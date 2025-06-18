
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Brain } from "lucide-react";

const MarketOverviewTab = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Market Indices (Live)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "NIFTY 50", value: 24847.15, change: +128.45, sector: "Large Cap" },
              { name: "NIFTY MIDCAP 100", value: 58623.80, change: -245.30, sector: "Mid Cap" },
              { name: "NIFTY SMALLCAP 100", value: 17234.60, change: +89.25, sector: "Small Cap" },
              { name: "BSE SENSEX", value: 81547.30, change: +156.80, sector: "Large Cap" }
            ].map((index, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-semibold">{index.name}</div>
                  <div className="text-xs text-muted-foreground">{index.sector}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{index.value.toLocaleString()}</div>
                  <div className={`text-sm ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-1">Sector Outlook</h4>
              <p className="text-sm text-blue-800">
                Technology and Healthcare sectors showing strong momentum. Small-cap funds outperforming benchmarks.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-1">AI Recommendation</h4>
              <p className="text-sm text-green-800">
                Consider diversified mid-cap exposure. Current valuations suggest good entry points.
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-1">Risk Alert</h4>
              <p className="text-sm text-purple-800">
                Market volatility expected. Maintain balanced portfolio allocation across categories.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketOverviewTab;
