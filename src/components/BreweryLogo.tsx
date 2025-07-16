
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
      <div className={`bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 backdrop-blur-md text-white rounded-xl ${sizeClasses[size]} font-bold ${textSizeClasses[size]} relative overflow-hidden shadow-electric border border-blue-400/40`}>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-800/70 to-cyan-500/50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-300/30 to-transparent animate-pulse"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <Beer className={`${iconSizeClasses[size]} drop-shadow-2xl text-blue-100 animate-pulse`} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 opacity-90 animate-shimmer"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-1 left-1 right-1 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent animate-pulse"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-xl opacity-30 blur animate-pulse"></div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent leading-tight drop-shadow-lg animate-shimmer`} style={{ 
            fontFamily: 'sans-serif',
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(59, 130, 246, 0.8)'
          }}>
            SIP Brewery
          </span>
          <span className="text-xs text-cyan-300 font-medium -mt-1 drop-shadow-lg animate-pulse" style={{ 
            textShadow: '0 1px 2px rgba(0,0,0,0.6)'
          }}>
            Brewing Wealth
          </span>
        </div>
      )}
    </div>
  );
};

export default BreweryLogo;
