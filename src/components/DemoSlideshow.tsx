
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";

interface DemoSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: number;
}

interface DemoSlideshowProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoSlideshow = ({ isOpen, onClose }: DemoSlideshowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const demoSlides: DemoSlide[] = [
    {
      id: 1,
      title: "Welcome to SIP Brewery",
      description: "Your trusted partner for mutual fund investments with exclusive rewards",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      duration: 3000
    },
    {
      id: 2,
      title: "Easy Fund Selection",
      description: "Browse and compare 500+ mutual funds with detailed performance metrics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      duration: 4000
    },
    {
      id: 3,
      title: "Start SIP with ₹500",
      description: "Begin your investment journey with systematic investment plans starting at just ₹500",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
      duration: 4000
    },
    {
      id: 4,
      title: "Track Your Portfolio",
      description: "Monitor your investments with real-time updates and detailed analytics",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      duration: 3500
    },
    {
      id: 5,
      title: "Earn Wallet Credits",
      description: "Get rewarded with up to ₹70,000 wallet credits for investment discipline",
      image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&h=600&fit=crop",
      duration: 4000
    },
    {
      id: 6,
      title: "Professional Guidance",
      description: "Access expert advice and personalized investment recommendations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      duration: 3500
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (demoSlides[currentSlide].duration / 100));
          
          if (newProgress >= 100) {
            if (currentSlide < demoSlides.length - 1) {
              setCurrentSlide(prev => prev + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          
          return newProgress;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSlide, demoSlides]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (currentSlide < demoSlides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setProgress(0);
    }
  };

  const handleSlideSelect = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
    setIsPlaying(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold">SIP Brewery Platform Demo</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Main demo area */}
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-6 overflow-hidden relative">
            <img 
              src={demoSlides[currentSlide].image}
              alt={demoSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with content */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-8 text-white">
                <h4 className="text-3xl font-bold mb-2">{demoSlides[currentSlide].title}</h4>
                <p className="text-xl opacity-90">{demoSlides[currentSlide].description}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-30">
              <div 
                className="h-full bg-blue-500 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentSlide === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={handlePlay}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              <span className="ml-2">{isPlaying ? 'Pause' : 'Play'}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentSlide === demoSlides.length - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Slide thumbnails */}
          <div className="grid grid-cols-6 gap-3 mb-6">
            {demoSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => handleSlideSelect(index)}
                className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentSlide ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img 
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Demo description */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-xl font-bold text-blue-900 mb-3">What you'll learn in this demo:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-blue-800 mb-2">Platform Features</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Complete investment process</li>
                  <li>• Fund selection and SIP setup</li>
                  <li>• Portfolio tracking dashboard</li>
                  <li>• Goal-based investing</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-green-800 mb-2">Rewards System</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• SIP streak rewards walkthrough</li>
                  <li>• Portfolio transfer bonuses</li>
                  <li>• Referral program demonstration</li>
                  <li>• Earning up to ₹70,000 credits</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoSlideshow;
