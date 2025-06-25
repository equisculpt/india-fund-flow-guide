
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const IPOTimelineTable = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📅</span>
          IPO Timeline & Key Dates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Event</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">IPO Opens</TableCell>
              <TableCell className="font-semibold text-green-600">June 21, 2024</TableCell>
              <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">IPO Closes</TableCell>
              <TableCell className="font-semibold text-red-600">June 25, 2024</TableCell>
              <TableCell><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Completed</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Basis of Allotment</TableCell>
              <TableCell>July 1, 2024</TableCell>
              <TableCell><span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Completed</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Listing Date</TableCell>
              <TableCell>July 1, 2024</TableCell>
              <TableCell><span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Listed</span></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default IPOTimelineTable;
