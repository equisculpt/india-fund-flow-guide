import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateFilterSelectorProps {
  onFilterChange: (filters: {
    startDate?: Date;
    endDate?: Date;
    financialYear?: string;
    reportType: 'custom' | 'financial_year' | 'all_time';
  }) => void;
  reportCategory: 'transaction' | 'tax' | 'sip' | 'portfolio' | 'performance';
}

const DateFilterSelector: React.FC<DateFilterSelectorProps> = ({ onFilterChange, reportCategory }) => {
  const [reportType, setReportType] = useState<'custom' | 'financial_year' | 'all_time'>('all_time');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [financialYear, setFinancialYear] = useState<string>();

  // Generate Indian Financial Years (April to March)
  const generateFinancialYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    
    // If we're before April, current FY is previous year
    const currentFYStart = currentMonth >= 3 ? currentYear : currentYear - 1;
    
    for (let i = 0; i < 5; i++) {
      const fyStart = currentFYStart - i;
      const fyEnd = fyStart + 1;
      years.push({
        value: `${fyStart}-${fyEnd.toString().slice(2)}`,
        label: `FY ${fyStart}-${fyEnd.toString().slice(2)}`,
        startDate: new Date(fyStart, 3, 1), // April 1st
        endDate: new Date(fyEnd, 2, 31) // March 31st
      });
    }
    
    return years;
  };

  const financialYears = generateFinancialYears();

  const handleApplyFilter = () => {
    let filters: any = { reportType };
    
    if (reportType === 'custom') {
      filters.startDate = startDate;
      filters.endDate = endDate;
    } else if (reportType === 'financial_year' && financialYear) {
      const selectedFY = financialYears.find(fy => fy.value === financialYear);
      if (selectedFY) {
        filters.startDate = selectedFY.startDate;
        filters.endDate = selectedFY.endDate;
        filters.financialYear = financialYear;
      }
    }
    
    onFilterChange(filters);
  };

  const isCustomDateValid = reportType !== 'custom' || (startDate && endDate);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Report Date Range
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Report Period</label>
          <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select report period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_time">All Time (Portfolio Inception)</SelectItem>
              <SelectItem value="financial_year">Financial Year</SelectItem>
              <SelectItem value="custom">Custom Date Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {reportType === 'financial_year' && (
          <div>
            <label className="text-sm font-medium mb-2 block">Financial Year</label>
            <Select value={financialYear} onValueChange={setFinancialYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select financial year" />
              </SelectTrigger>
              <SelectContent>
                {financialYears.map(fy => (
                  <SelectItem key={fy.value} value={fy.value}>
                    {fy.label} (Apr {fy.startDate.getFullYear()} - Mar {fy.endDate.getFullYear()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {reportType === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date > new Date() || (endDate && date > endDate)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date > new Date() || (startDate && date < startDate)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleApplyFilter}
            disabled={!isCustomDateValid}
            className="flex-1"
          >
            Apply Filters
          </Button>
        </div>

        {reportType !== 'all_time' && (
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            <p className="font-medium mb-1">Selected Period:</p>
            {reportType === 'financial_year' && financialYear && (
              <p>Financial Year {financialYear}</p>
            )}
            {reportType === 'custom' && startDate && endDate && (
              <p>{format(startDate, "dd MMM yyyy")} to {format(endDate, "dd MMM yyyy")}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DateFilterSelector;