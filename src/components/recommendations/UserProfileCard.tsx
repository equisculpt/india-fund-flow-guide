
import React from 'react';

interface UserProfile {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentGoals: string[];
  timeHorizon: number;
  monthlyInvestment: number;
  currentAge: number;
}

interface UserProfileCardProps {
  userProfile: UserProfile;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ userProfile }) => {
  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <h4 className="font-semibold text-blue-900 mb-2">Your Investment Profile</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-blue-700">Risk Tolerance:</span>
          <p className="font-medium capitalize">{userProfile.riskTolerance}</p>
        </div>
        <div>
          <span className="text-blue-700">Time Horizon:</span>
          <p className="font-medium">{userProfile.timeHorizon} years</p>
        </div>
        <div>
          <span className="text-blue-700">Monthly Budget:</span>
          <p className="font-medium">₹{userProfile.monthlyInvestment.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-blue-700">Age:</span>
          <p className="font-medium">{userProfile.currentAge} years</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
