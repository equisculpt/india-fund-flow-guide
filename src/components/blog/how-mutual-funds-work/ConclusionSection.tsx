
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const ConclusionSection = () => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4">Key Takeaways</h2>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">How Mutual Funds Work - In Simple Terms:</h4>
            <ol className="space-y-2 text-gray-700">
              <li><strong>1.</strong> You give money to professional fund manager</li>
              <li><strong>2.</strong> Your money is pooled with thousands of other investors</li>
              <li><strong>3.</strong> Fund manager invests in diversified portfolio</li>
              <li><strong>4.</strong> You get units based on NAV</li>
              <li><strong>5.</strong> As investments grow, your unit value increases</li>
              <li><strong>6.</strong> You can sell units anytime to get money back</li>
            </ol>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-yellow-800 font-medium">🎯 Remember: Mutual funds are not get-rich-quick schemes. They work best when you invest regularly for long periods and let the power of compounding work its magic!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConclusionSection;
