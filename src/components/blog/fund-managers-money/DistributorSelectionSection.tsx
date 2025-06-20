
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DistributorSelectionSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>How to Choose the Right Mutual Fund Distributor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-gray-700">
            Since you'll be paying for professional services, ensure you choose a distributor who adds real value:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="font-semibold text-green-600">✅ Look for These Qualities:</h5>
              <ul className="text-sm space-y-2">
                <li>• <strong>AMFI certification</strong> and proper licensing</li>
                <li>• <strong>5+ years experience</strong> in mutual funds</li>
                <li>• <strong>Transparent fee structure</strong> disclosure</li>
                <li>• <strong>Regular communication</strong> and reviews</li>
                <li>• <strong>Goal-based planning</strong> approach</li>
                <li>• <strong>Technology platform</strong> for tracking</li>
                <li>• <strong>Client testimonials</strong> and track record</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-red-600">❌ Red Flags to Avoid:</h5>
              <ul className="text-sm space-y-2">
                <li>• <strong>Guaranteed returns</strong> promises</li>
                <li>• <strong>Pushy sales tactics</strong> for specific funds</li>
                <li>• <strong>High-commission products</strong> focus</li>
                <li>• <strong>Lack of documentation</strong> or transparency</li>
                <li>• <strong>No ongoing support</strong> after investment</li>
                <li>• <strong>One-size-fits-all</strong> recommendations</li>
                <li>• <strong>Unrealistic expectations</strong> setting</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Questions to Ask Your Distributor:</h5>
            <ol className="text-sm space-y-1 ml-4">
              <li>1. How will you help me achieve my specific financial goals?</li>
              <li>2. What is your investment philosophy and approach?</li>
              <li>3. How often will we review my portfolio?</li>
              <li>4. What happens if I want to exit or switch funds?</li>
              <li>5. Can you provide references from existing clients?</li>
              <li>6. How do you get compensated for your services?</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DistributorSelectionSection;
