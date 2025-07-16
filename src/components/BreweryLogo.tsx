
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
      <div className={`bg-gradient-to-br from-amber-900 via-yellow-600 to-red-900 backdrop-blur-md text-white rounded-lg ${sizeClasses[size]} font-bold ${textSizeClasses[size]} relative overflow-hidden shadow-2xl border border-amber-400/30`}>
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-yellow-700/60 to-red-800/40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-300/20 to-transparent"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <Beer className={`${iconSizeClasses[size]} drop-shadow-2xl text-amber-100`} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-1 left-1 right-1 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-amber-700 via-yellow-600 to-red-800 bg-clip-text text-transparent leading-tight drop-shadow-sm`} style={{ fontFamily: 'serif' }}>
            SIP Brewery
          </span>
          <span className="text-xs text-amber-600 font-medium -mt-1 drop-shadow-sm">
            Brewing Wealth
          </span>
        </div>
      )}
    </div>
  );
};

export default BreweryLogo;
