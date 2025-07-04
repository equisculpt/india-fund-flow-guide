
import { Beer } from "lucide-react";

interface BreweryLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const BreweryLogo = ({ size = "md", showText = true }: BreweryLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 p-1.5",
    md: "w-12 h-12 p-2",
    lg: "w-16 h-16 p-3"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/884b7fa3-86c8-4d42-8abf-8bd2cc7fcddb.png" 
        alt="SIP Brewery Logo" 
        className={`${sizeClasses[size]} object-contain drop-shadow-lg`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-gray-800 leading-tight`}>
            SIP Brewery
          </span>
          <span className="text-xs text-amber-600 font-medium -mt-1">
            Brewing Wealth
          </span>
        </div>
      )}
    </div>
  );
};

export default BreweryLogo;
