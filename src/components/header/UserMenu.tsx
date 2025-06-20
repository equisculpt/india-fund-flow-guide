
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, Settings, UserCircle } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import TranslatedText from '../TranslatedText';

interface UserMenuProps {
  user: SupabaseUser | null;
  signOut: () => Promise<void>;
  setShowLoginModal: (show: boolean) => void;
  setIsMenuOpen: (open: boolean) => void;
}

const UserMenu = ({ user, signOut, setShowLoginModal, setIsMenuOpen }: UserMenuProps) => {
  if (!user) {
    return (
      <Button 
        onClick={() => setShowLoginModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        <TranslatedText text="Login" />
      </Button>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <UserCircle className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <TranslatedText text="Dashboard" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/ai-portfolio" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <TranslatedText text="AI Portfolio" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <TranslatedText text="Log out" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
