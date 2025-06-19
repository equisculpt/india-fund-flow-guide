
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

interface UserMenuProps {
  user: any;
  signOut: () => void;
  setShowLoginModal: (show: boolean) => void;
  setIsMenuOpen: (open: boolean) => void;
}

const UserMenu = ({ user, signOut, setShowLoginModal, setIsMenuOpen }: UserMenuProps) => {
  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  if (user) {
    return (
      <div className="hidden lg:flex items-center space-x-4">
        <Link to="/dashboard">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
        </Link>
        
        {user.email === 'admin@sipbrewery.com' && (
          <Link to="/admin">
            <Button variant="outline" size="sm">
              Admin Portal
            </Button>
          </Link>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSignOut}
          className="flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden lg:block">
      <Button 
        onClick={() => setShowLoginModal(true)}
        className="min-h-[44px] min-w-[44px]"
      >
        Sign In
      </Button>
    </div>
  );
};

export default UserMenu;
