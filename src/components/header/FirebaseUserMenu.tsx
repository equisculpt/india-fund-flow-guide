
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'customer' | 'agent' | 'admin';
  avatar?: string;
}

interface FirebaseUserMenuProps {
  user: User | null;
  logout: () => Promise<void>;
  setShowLoginModal: (show: boolean) => void;
  setIsMenuOpen: (open: boolean) => void;
}

const FirebaseUserMenu = ({ user, logout, setShowLoginModal, setIsMenuOpen }: FirebaseUserMenuProps) => {
  if (!user) {
    return (
      <Button 
        onClick={() => setShowLoginModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        Login
      </Button>
    );
  }

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback>
                <UserCircle className="h-5 w-5" />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.name}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/ai-portfolio" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            AI Portfolio
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FirebaseUserMenu;
