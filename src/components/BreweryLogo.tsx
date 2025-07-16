
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
      <div className={`bg-gradient-secondary backdrop-blur-xl text-secondary-foreground rounded-2xl ${sizeClasses[size]} font-bold ${textSizeClasses[size]} relative overflow-hidden shadow-gold border border-secondary/30 animate-glow-pulse`}>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/70 to-secondary-glow/60"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-secondary-glow/40 to-transparent animate-pulse"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <Beer className={`${iconSizeClasses[size]} drop-shadow-2xl text-secondary-foreground`} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary-glow via-secondary to-secondary-glow opacity-90 animate-shimmer"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary-glow/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-500 animate-shimmer"></div>
        <div className="absolute top-1 left-1 right-1 h-px bg-gradient-to-r from-transparent via-secondary-glow/90 to-transparent"></div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold font-heading leading-tight`} style={{ 
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FFD700 50%, #FF8C42 75%, #D2691E 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            backgroundSize: '200% 200%',
            animation: 'liquid-gold 3s ease-in-out infinite',
            filter: 'drop-shadow(0 2px 8px rgba(255, 107, 53, 0.8)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))',
            textShadow: '0 0 20px rgba(255, 140, 66, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8)'
          }}>
            SIP Brewery
          </span>
          <span className="text-sm text-secondary/90 font-medium font-serif -mt-1" style={{ 
            filter: 'drop-shadow(0 1px 4px rgba(255, 215, 0, 0.3))',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
          }}>
            Brewing Wealth
          </span>
        </div>
      )}
    </div>
  );
};

export default BreweryLogo;
