
import React from 'react';
import { Button } from "@/components/ui/button";
import { User, Building2 } from "lucide-react";

interface UserTypeSelectorProps {
  userType: 'client' | 'agent';
  onUserTypeChange: (type: 'client' | 'agent') => void;
}

const UserTypeSelector = ({ userType, onUserTypeChange }: UserTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <Button
        type="button"
        variant={userType === "client" ? "default" : "outline"}
        onClick={() => onUserTypeChange("client")}
        className="flex items-center gap-2"
      >
        <User className="h-4 w-4" />
        Client
      </Button>
      <Button
        type="button"
        variant={userType === "agent" ? "default" : "outline"}
        onClick={() => onUserTypeChange("agent")}
        className="flex items-center gap-2"
      >
        <Building2 className="h-4 w-4" />
        Agent
      </Button>
    </div>
  );
};

export default UserTypeSelector;
