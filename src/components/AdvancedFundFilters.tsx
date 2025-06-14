
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface FilterState {
  search: string;
  categories: string[];
  fundHouses: string[];
  minSip: number[];
  returns1y: number[];
  returns3y: number[];
  riskLevel: string[];
  rating: number[];
  expense: number[];
}

const AdvancedFundFilters = ({ onFiltersChange }: { onFiltersChange: (filters: FilterState) => void }) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    fundHouses: [],
    minSip: [500],
    returns1y: [0],
    returns3y: [0],
    riskLevel: [],
    rating: [1],
    expense: [0]
  });
  
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = ['Large Cap', 'Mid Cap', 'Small Cap', 'ELSS', 'Hybrid', 'Debt', 'Index'];
  const fundHouses = ['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'Mirae Asset', 'Nippon India'];
  const riskLevels = ['Low', 'Moderate', 'High'];

  const updateFilters = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: 'categories' | 'fundHouses' | 'riskLevel', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilters(key, newArray);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      search: '',
      categories: [],
      fundHouses: [],
      minSip: [500],
      returns1y: [0],
      returns3y: [0],
      riskLevel: [],
      rating: [1],
      expense: [0]
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categories.length) count++;
    if (filters.fundHouses.length) count++;
    if (filters.riskLevel.length) count++;
    if (filters.minSip[0] > 500) count++;
    if (filters.returns1y[0] > 0) count++;
    if (filters.returns3y[0] > 0) count++;
    if (filters.rating[0] > 1) count++;
    if (filters.expense[0] > 0) count++;
    return count;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Fund Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Basic' : 'Advanced'}
            </Button>
            {getActiveFiltersCount() > 0 && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search">Search Funds</Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              value={filters.search}
              onChange={(e) => updateFilters('search', e.target.value)}
              placeholder="Search by fund name or AMC..."
              className="pl-9"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <Label>Fund Categories</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => toggleArrayFilter('categories', category)}
                />
                <Label htmlFor={category} className="text-sm">{category}</Label>
              </div>
            ))}
          </div>
        </div>

        {showAdvanced && (
          <>
            {/* Fund Houses */}
            <div>
              <Label>Fund Houses</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {fundHouses.map((house) => (
                  <div key={house} className="flex items-center space-x-2">
                    <Checkbox
                      id={house}
                      checked={filters.fundHouses.includes(house)}
                      onCheckedChange={() => toggleArrayFilter('fundHouses', house)}
                    />
                    <Label htmlFor={house} className="text-sm">{house}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Level */}
            <div>
              <Label>Risk Level</Label>
              <div className="flex gap-4 mt-2">
                {riskLevels.map((risk) => (
                  <div key={risk} className="flex items-center space-x-2">
                    <Checkbox
                      id={risk}
                      checked={filters.riskLevel.includes(risk)}
                      onCheckedChange={() => toggleArrayFilter('riskLevel', risk)}
                    />
                    <Label htmlFor={risk} className="text-sm">{risk}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimum SIP */}
            <div>
              <Label>Minimum SIP Amount</Label>
              <div className="mt-2">
                <Slider
                  value={filters.minSip}
                  onValueChange={(value) => updateFilters('minSip', value)}
                  max={10000}
                  min={500}
                  step={500}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹500</span>
                  <span>₹{filters.minSip[0].toLocaleString()}</span>
                  <span>₹10,000</span>
                </div>
              </div>
            </div>

            {/* Returns */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Min 1Y Returns (%)</Label>
                <div className="mt-2">
                  <Slider
                    value={filters.returns1y}
                    onValueChange={(value) => updateFilters('returns1y', value)}
                    max={30}
                    min={0}
                    step={1}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0%</span>
                    <span>{filters.returns1y[0]}%</span>
                    <span>30%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Min 3Y Returns (%)</Label>
                <div className="mt-2">
                  <Slider
                    value={filters.returns3y}
                    onValueChange={(value) => updateFilters('returns3y', value)}
                    max={25}
                    min={0}
                    step={1}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0%</span>
                    <span>{filters.returns3y[0]}%</span>
                    <span>25%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <Label>Minimum Rating</Label>
              <div className="mt-2">
                <Slider
                  value={filters.rating}
                  onValueChange={(value) => updateFilters('rating', value)}
                  max={5}
                  min={1}
                  step={1}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>1 Star</span>
                  <span>{filters.rating[0]} Stars</span>
                  <span>5 Stars</span>
                </div>
              </div>
            </div>

            {/* Expense Ratio */}
            <div>
              <Label>Max Expense Ratio (%)</Label>
              <div className="mt-2">
                <Slider
                  value={filters.expense}
                  onValueChange={(value) => updateFilters('expense', value)}
                  max={3}
                  min={0}
                  step={0.1}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0%</span>
                  <span>{filters.expense[0]}%</span>
                  <span>3%</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedFundFilters;
