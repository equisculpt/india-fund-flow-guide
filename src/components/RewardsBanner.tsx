
import { Gift } from "lucide-react";
import { useBranding } from "@/contexts/BrandingContext";

const RewardsBanner = () => {
  const { isWhiteLabel } = useBranding();

  // Only show rewards banner for direct clients (not white-label/agent clients)
  if (isWhiteLabel) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-r from-teal-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <Gift className="h-16 w-16 text-teal-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🎁 Our Unique Reward Program</h2>
          <p className="text-xl text-gray-700 mb-4">
            <strong>Get 0.2% of your equity mutual fund investments back as gift cards every year!</strong>
          </p>
          <p className="text-lg text-gray-600">
            This is our way of thanking you for choosing us as your investment partner. 
            The more you invest, the more you earn in gift cards - it's our unique selling proposition!
          </p>
        </div>
      </div>
    </section>
  );
};

export default RewardsBanner;
