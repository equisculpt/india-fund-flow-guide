
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, BarChart3, Brain, MessageSquare, Shield } from 'lucide-react';

interface UserMenuProps {
  user: any;
  signOut: () => Promise<void>;
  setShowLoginModal: (show: boolean) => void;
  setIsMenuOpen: (open: boolean) => void;
}

const UserMenu = ({ user, signOut, setShowLoginModal, setIsMenuOpen }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <User className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem onClick={() => handleNavigation('/dashboard')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/user-dashboard')}>
            <Settings className="mr-2 h-4 w-4" />
            Analytics
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/advanced-features')}>
            <Brain className="mr-2 h-4 w-4" />
            AI Features
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/community')}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Community
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/secure-admin')} className="text-gray-500">
            <Shield className="mr-2 h-4 w-4" />
            Admin Portal
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button 
      onClick={() => setShowLoginModal(true)} 
      size="sm" 
      className="text-xs sm:text-sm"
    >
      Sign In
    </Button>
  );
};

export default UserMenu;
