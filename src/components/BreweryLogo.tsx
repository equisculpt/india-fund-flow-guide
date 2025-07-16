
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
      <div className={`bg-gradient-secondary backdrop-blur-md text-background rounded-lg ${sizeClasses[size]} font-bold ${textSizeClasses[size]} relative overflow-hidden shadow-glow border border-secondary/30`}>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <Beer className={`${iconSizeClasses[size]} drop-shadow-lg text-background`} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-glow to-secondary opacity-80"></div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-secondary leading-tight drop-shadow-sm`}>
            SIP Brewery
          </span>
          <span className="text-xs text-secondary/80 font-medium -mt-1 drop-shadow-sm">
            Brewing Wealth
          </span>
        </div>
      )}
    </div>
  );
};

export default BreweryLogo;
