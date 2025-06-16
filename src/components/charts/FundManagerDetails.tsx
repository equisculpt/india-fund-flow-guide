
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, TrendingUp, Clock, Award } from 'lucide-react';

interface FundManagerDetailsProps {
  fundData: any;
}

const FundManagerDetails = ({ fundData }: FundManagerDetailsProps) => {
  // Mock fund manager data - in real implementation, this would come from API
  const managerData = {
    name: "Rajesh Kumar",
    experience: "15+ years",
    education: "MBA Finance, CFA",
    previousFunds: 3,
    totalAUM: "₹12,500 Cr",
    specialty: fundData.category,
    performance: "Top 25% in category",
    joinedDate: "Jan 2020"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Fund Manager Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{managerData.name}</h3>
              <p className="text-sm text-gray-600">{managerData.education}</p>
            </div>
            <Badge variant="secondary">
              <Award className="h-3 w-3 mr-1" />
              {managerData.performance}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Experience</span>
              </div>
              <p className="font-medium">{managerData.experience}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Total AUM</span>
              </div>
              <p className="font-medium">{managerData.totalAUM}</p>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <p className="text-sm text-gray-600">
              Specializes in <strong>{managerData.specialty}</strong> investments. 
              Joined this fund in {managerData.joinedDate} and has been consistently 
              delivering strong performance.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundManagerDetails;
