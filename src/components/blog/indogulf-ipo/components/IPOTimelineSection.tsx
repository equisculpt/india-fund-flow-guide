
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const IPOTimelineSection = () => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span>📅</span>
          IPO Timeline & Key Dates (2025)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-green-50">
              <TableHead className="font-semibold">Event</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Anchor Allotment</TableCell>
              <TableCell className="font-semibold text-blue-600">June 25, 2025</TableCell>
              <TableCell><span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Upcoming</span></TableCell>
              <TableCell>Institutional investors</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">IPO Opens</TableCell>
              <TableCell className="font-semibold text-green-600">June 26, 2025</TableCell>
              <TableCell><span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Upcoming</span></TableCell>
              <TableCell>Subscription begins</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">IPO Closes</TableCell>
              <TableCell className="font-semibold text-red-600">June 30, 2025</TableCell>
              <TableCell><span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Upcoming</span></TableCell>
              <TableCell>Last day for bids</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Allotment Finalization</TableCell>
              <TableCell>July 1, 2025</TableCell>
              <TableCell><span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Scheduled</span></TableCell>
              <TableCell>Share allocation finalised</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Listing Date</TableCell>
              <TableCell>July 3, 2025</TableCell>
              <TableCell><span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Scheduled</span></TableCell>
              <TableCell>NSE & BSE Mainboard</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default IPOTimelineSection;
