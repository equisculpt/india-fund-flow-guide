
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onBackClick: () => void;
}

const BackButton = ({ onBackClick }: BackButtonProps) => {
  return (
    <Button 
      variant="ghost" 
      onClick={onBackClick} 
      className="mb-4"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Funds
    </Button>
  );
};

export default BackButton;
