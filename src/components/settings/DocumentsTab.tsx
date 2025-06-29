
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText,
  Download,
  Upload,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const DocumentsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            KYC Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">PAN Card</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">ABCDE1234F</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Upload className="h-4 w-4 mr-1" />
                  Re-upload
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Aadhaar Card</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">****-****-1234</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Upload className="h-4 w-4 mr-1" />
                  Re-upload
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Bank Statement</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">Required for verification</p>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-1" />
                Upload Now
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Income Proof</span>
                <Badge className="bg-gray-100 text-gray-800">
                  Optional
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">For higher investment limits</p>
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsTab;
