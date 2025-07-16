
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
      <div className={`bg-gradient-secondary backdrop-blur-md text-secondary-foreground rounded-lg ${sizeClasses[size]} font-bold ${textSizeClasses[size]} relative overflow-hidden shadow-luxury border border-secondary/40`}>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/70 to-secondary-glow/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-secondary-glow/30 to-transparent"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <Beer className={`${iconSizeClasses[size]} drop-shadow-2xl text-secondary-foreground`} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-glow via-secondary to-secondary-glow opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary-glow/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-1 left-1 right-1 h-px bg-gradient-to-r from-transparent via-secondary-glow/80 to-transparent"></div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-secondary leading-tight drop-shadow-lg`} style={{ 
            fontFamily: 'serif',
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 20px hsl(var(--secondary) / 0.8)'
          }}>
            SIP Brewery
          </span>
          <span className="text-xs text-secondary/90 font-medium -mt-1 drop-shadow-lg" style={{ 
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
