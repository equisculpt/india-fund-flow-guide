
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Play, Pause, StopCircle, Plus, TrendingUp } from 'lucide-react';
import KYCGuard from '@/components/KYCGuard';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Navigate } from 'react-router-dom';

const SIPManagement = () => {
  const { user, loading } = useSupabaseAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const activeSIPs = [
    {
      id: 1,
      fundName: "HDFC Top 100 Fund",
      amount: 5000,
      nextDate: "2025-01-15",
      frequency: "Monthly",
      totalInvested: 60000,
      currentValue: 78500,
      returns: 30.8,
      status: "Active"
    },
    {
      id: 2,
      fundName: "SBI Small Cap Fund",
      amount: 3000,
      nextDate: "2025-01-20",
      frequency: "Monthly",
      totalInvested: 36000,
      currentValue: 42300,
      returns: 17.5,
      status: "Active"
    }
  ];

  const completedSIPs = [
    {
      id: 3,
      fundName: "Axis Long Term Equity",
      amount: 2000,
      totalInvested: 48000,
      finalValue: 65200,
      returns: 35.8,
      completedDate: "2024-12-15"
    }
  ];

  return (
    <KYCGuard requireKYC={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SIP Management</h1>
              <p className="text-gray-600">Track and manage your systematic investment plans</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Start New SIP
            </Button>
          </div>

          {/* SIP Overview Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active SIPs</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <Play className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Investment</p>
                    <p className="text-2xl font-bold">₹8,000</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Invested</p>
                    <p className="text-2xl font-bold">₹96,000</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Value</p>
                    <p className="text-2xl font-bold text-green-600">₹1,20,800</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+25.8%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList>
              <TabsTrigger value="active">Active SIPs</TabsTrigger>
              <TabsTrigger value="completed">Completed SIPs</TabsTrigger>
              <TabsTrigger value="paused">Paused SIPs</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="space-y-4">
                {activeSIPs.map((sip) => (
                  <Card key={sip.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{sip.fundName}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>₹{sip.amount.toLocaleString()}/{sip.frequency}</span>
                            <Badge variant="outline" className="text-green-600">
                              {sip.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Next installment</p>
                          <p className="font-medium">{sip.nextDate}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Invested</p>
                          <p className="text-lg font-semibold">₹{sip.totalInvested.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Current Value</p>
                          <p className="text-lg font-semibold">₹{sip.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Returns</p>
                          <p className="text-lg font-semibold text-green-600">+{sip.returns}%</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          <Pause className="h-4 w-4 mr-2" />
                          Pause SIP
                        </Button>
                        <Button variant="outline" size="sm">
                          <StopCircle className="h-4 w-4 mr-2" />
                          Stop SIP
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit Amount
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="space-y-4">
                {completedSIPs.map((sip) => (
                  <Card key={sip.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{sip.fundName}</h3>
                          <p className="text-sm text-gray-600">Completed on {sip.completedDate}</p>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Invested</p>
                          <p className="text-lg font-semibold">₹{sip.totalInvested.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Final Value</p>
                          <p className="text-lg font-semibold">₹{sip.finalValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Returns</p>
                          <p className="text-lg font-semibold text-green-600">+{sip.returns}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="paused">
              <div className="text-center py-8">
                <p className="text-gray-600">No paused SIPs found</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </KYCGuard>
  );
};

export default SIPManagement;
