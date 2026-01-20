
import { useState, useEffect } from 'react';
import { mockAMCList } from '@/services/mockDatabase';

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
    // Use mock data for prototype
    const activeAMCs = mockAMCList.filter(amc => amc.is_active);
    setAmcList(activeAMCs);
    setLoading(false);
  };

  return { amcList, loading };
};
