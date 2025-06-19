
import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ to, children, onClick }: NavLinkProps) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      to={to || '#'}
      className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
    >
      {children}
    </Link>
  );
};

export default NavLink;
