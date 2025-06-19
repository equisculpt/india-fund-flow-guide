
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AMC {
  id: string;
  amc_name: string;
  amc_code: string;
}

export const useAMCData = () => {
  const [amcList, setAmcList] = useState<AMC[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAMCList();
  }, []);

  const fetchAMCList = async () => {
    try {
      const { data, error } = await supabase
        .from('amc_list')
        .select('*')
        .eq('is_active', true)
        .order('amc_name');

      if (error) throw error;
      setAmcList(data || []);
    } catch (error) {
      console.error('Error fetching AMC list:', error);
    } finally {
      setLoading(false);
    }
  };

  return { amcList, loading };
};
