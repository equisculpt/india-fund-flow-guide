
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContactInformation = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Mail className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-600">hello@equisculpt.in</p>
            <p className="text-sm text-gray-500">For general inquiries and support</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <Phone className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p className="text-gray-600">+91 7760997030</p>
            <p className="text-sm text-gray-500">Monday to Friday, 9 AM - 6 PM IST</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-600">Hyderabad, India</p>
            <p className="text-sm text-gray-500">Registered Office</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-semibold">Business Hours</h3>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInformation;
