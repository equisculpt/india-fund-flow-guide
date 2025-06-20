
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const IntroductionSection = () => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4">The Value of Professional Investment Guidance</h2>
        <p className="text-gray-700 mb-4">
          While direct plans offer lower expense ratios, the real question isn't about saving 0.5-1% in fees—it's about whether professional guidance can help you earn significantly more than what you pay in additional costs. Studies consistently show that investors with professional guidance often outperform DIY investors by 3-4% annually.
        </p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-800 font-medium">💡 Key Insight: The additional 0.5-1% you pay in regular plans can result in 3-5% better annual returns through better fund selection, timing, and behavioral coaching.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntroductionSection;
