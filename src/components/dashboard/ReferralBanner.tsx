
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Share2, Gift, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TEST_USER_DATA } from '@/services/testData';
import { useBranding } from '@/contexts/BrandingContext';

const ReferralBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { toast } = useToast();
  const { brandConfig } = useBranding();
  
  const referralLink = `https://${brandConfig.domain}?ref=${TEST_USER_DATA.profile.referral_code}`;
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const shareOnWhatsApp = () => {
    const message = `🚀 Join ${brandConfig.companyName} and start your investment journey! Get started with mutual funds and SIPs. Use my referral link to get special benefits: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareReferralLink = () => {
    const message = `🚀 Join ${brandConfig.companyName} - Your Investment Partner! Start investing in mutual funds with my referral link: ${referralLink}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Join ${brandConfig.companyName}`,
        text: message,
        url: referralLink
      });
    } else {
      // Fallback to copying
      copyReferralLink();
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-6">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="bg-green-100 p-3 rounded-full">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-900 mb-2">
                🎉 Earn ₹500 for Every Friend You Refer!
              </h3>
              <p className="text-green-800 mb-4">
                Share your personalized link and earn up to ₹500 when your friends make their first investment. No codes needed - just share the link!
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Input 
                    value={referralLink} 
                    readOnly 
                    className="bg-white border-green-300 text-sm"
                  />
                  <Button onClick={copyReferralLink} variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={shareOnWhatsApp} 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share on WhatsApp
                  </Button>
                  <Button 
                    onClick={shareReferralLink} 
                    variant="outline" 
                    size="sm"
                    className="border-green-300 text-green-700 hover:bg-green-50"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsVisible(false)}
            className="text-green-600 hover:text-green-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralBanner;
