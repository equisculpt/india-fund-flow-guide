
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AMC {
  id: string;
  amc_name: string;
  amc_code: string;
}

interface NAVEntry {
  scheme_code: string;
  nav_date: string;
  nav_value: number;
}

const AdminNavUploader = () => {
  const [amcList, setAmcList] = useState<AMC[]>([]);
  const [selectedAMC, setSelectedAMC] = useState('');
  const [navEntries, setNavEntries] = useState<NAVEntry[]>([
    { scheme_code: '', nav_date: new Date().toISOString().split('T')[0], nav_value: 0 }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAMCList();
  }, []);

  const fetchAMCList = async () => {
    try {
      const { data, error } = await supabase.rpc('execute_sql' as any, {
        sql: 'SELECT * FROM amc_list WHERE is_active = true ORDER BY amc_name',
        params: []
      });

      if (error) throw error;
      setAmcList(data || []);
    } catch (error) {
      console.error('Error fetching AMC list:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AMC list",
        variant: "destructive",
      });
    }
  };

  const addNavEntry = () => {
    setNavEntries([...navEntries, { 
      scheme_code: '', 
      nav_date: new Date().toISOString().split('T')[0], 
      nav_value: 0 
    }]);
  };

  const removeNavEntry = (index: number) => {
    setNavEntries(navEntries.filter((_, i) => i !== index));
  };

  const updateNavEntry = (index: number, field: keyof NAVEntry, value: string | number) => {
    const updated = [...navEntries];
    updated[index] = { ...updated[index], [field]: value };
    setNavEntries(updated);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.xlsx') && !file.name.toLowerCase().endsWith('.xls')) {
      toast({
        title: "Error",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive",
      });
      return;
    }

    // For now, we'll handle manual entry. In production, you'd parse the Excel file
    toast({
      title: "Info",
      description: "Excel parsing will be implemented. Please use manual entry for now.",
    });
  };

  const uploadNAVData = async () => {
    if (!selectedAMC || navEntries.length === 0) {
      toast({
        title: "Error",
        description: "Please select an AMC and add NAV entries",
        variant: "destructive",
      });
      return;
    }

    const validEntries = navEntries.filter(entry => 
      entry.scheme_code && entry.nav_date && entry.nav_value > 0
    );

    if (validEntries.length === 0) {
      toast({
        title: "Error",
        description: "Please provide valid NAV entries",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      for (const entry of validEntries) {
        // Insert into nav_update_history
        await supabase.rpc('execute_sql' as any, {
          sql: `
            INSERT INTO nav_update_history (scheme_code, nav_date, nav_value, update_source)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (scheme_code, nav_date) 
            DO UPDATE SET nav_value = EXCLUDED.nav_value, updated_at = NOW()
          `,
          params: [entry.scheme_code, entry.nav_date, entry.nav_value, 'admin_upload']
        });

        // Also update extended_nav_history for consistency
        await supabase.rpc('execute_sql' as any, {
          sql: `
            INSERT INTO extended_nav_history (scheme_code, nav_date, nav_value)
            VALUES ($1, $2, $3)
            ON CONFLICT (scheme_code, nav_date) 
            DO UPDATE SET nav_value = EXCLUDED.nav_value
          `,
          params: [entry.scheme_code, entry.nav_date, entry.nav_value]
        });
      }

      toast({
        title: "Success",
        description: `Updated ${validEntries.length} NAV entries successfully`,
      });

      // Reset form
      setNavEntries([{ 
        scheme_code: '', 
        nav_date: new Date().toISOString().split('T')[0], 
        nav_value: 0 
      }]);
      setSelectedAMC('');

    } catch (error) {
      console.error('Error uploading NAV data:', error);
      toast({
        title: "Error",
        description: "Failed to upload NAV data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            NAV Data Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="amc-select">Select AMC</Label>
              <Select value={selectedAMC} onValueChange={setSelectedAMC}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose AMC" />
                </SelectTrigger>
                <SelectContent>
                  {amcList.map((amc) => (
                    <SelectItem key={amc.id} value={amc.amc_name}>
                      {amc.amc_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="file-upload">Upload Excel File (Optional)</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Manual NAV Entry</h3>
              <Button onClick={addNavEntry} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </div>

            {navEntries.map((entry, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                  <Label>Scheme Code</Label>
                  <Input
                    placeholder="e.g., 120503"
                    value={entry.scheme_code}
                    onChange={(e) => updateNavEntry(index, 'scheme_code', e.target.value)}
                  />
                </div>
                <div>
                  <Label>NAV Date</Label>
                  <Input
                    type="date"
                    value={entry.nav_date}
                    onChange={(e) => updateNavEntry(index, 'nav_date', e.target.value)}
                  />
                </div>
                <div>
                  <Label>NAV Value</Label>
                  <Input
                    type="number"
                    step="0.0001"
                    placeholder="0.0000"
                    value={entry.nav_value || ''}
                    onChange={(e) => updateNavEntry(index, 'nav_value', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeNavEntry(index)}
                    disabled={navEntries.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={uploadNAVData}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Uploading..." : "Upload NAV Data"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNavUploader;
