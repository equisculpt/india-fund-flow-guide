
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const ConclusionSection = () => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4">The Bottom Line: Value Over Cost</h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            While direct plans have lower expense ratios, the evidence consistently shows that most investors achieve better outcomes through regular plans with professional guidance. The key is choosing the right distributor who adds genuine value.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Remember These Key Points:</h4>
            <ol className="space-y-2 text-gray-700">
              <li><strong>1.</strong> Professional guidance typically adds 3-4% annual value through better decisions</li>
              <li><strong>2.</strong> The 0.5-1% additional cost in regular plans is often recovered many times over</li>
              <li><strong>3.</strong> Behavioral coaching during market volatility is invaluable</li>
              <li><strong>4.</strong> Most successful investors work with professional advisors</li>
              <li><strong>5.</strong> DIY investing requires significant time, knowledge, and emotional discipline</li>
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold mb-2 text-green-600">For New Investors:</h5>
              <p className="text-sm text-gray-700">Regular plans with good distributors are almost always the better choice. The learning curve for successful DIY investing is steep and expensive.</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold mb-2 text-blue-600">For Experienced Investors:</h5>
              <p className="text-sm text-gray-700">Consider the value of behavioral coaching and professional oversight, especially during market extremes. Many seasoned investors still benefit from regular plans.</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-6">
            <p className="text-yellow-800 font-medium">💡 Final Thought: Focus on building wealth, not just minimizing costs. The right professional guidance can be worth many times more than the additional fees you pay.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConclusionSection;
