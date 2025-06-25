
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, X } from 'lucide-react';

interface UploadedFileDisplayProps {
  fileName: string;
  onRemove: () => void;
}

const UploadedFileDisplay = ({ fileName, onRemove }: UploadedFileDisplayProps) => {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-green-800">{fileName}</p>
            <p className="text-sm text-green-600">File processed successfully</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <X className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default UploadedFileDisplay;
