
import { useState, useEffect } from 'react';
import { FundDataService } from '@/services/fundDataService';

interface NAVData {
  nav: number;
  date: string;
  actualSchemeName: string;
  fundHouse: string;
}

export const useTopFundsNAV = () => {
  const [navData, setNAVData] = useState<Map<string, NAVData>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopFundsNAV = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting to fetch top 10 funds NAV...');
        
        const navMap = await FundDataService.fetchTop10FundsNAV();
        setNAVData(navMap);
        
        console.log('Top funds NAV loaded successfully:', navMap.size, 'funds');
      } catch (err) {
        console.error('Error fetching top funds NAV:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch NAV data');
      } finally {
        setLoading(false);
      }
    };

    fetchTopFundsNAV();
  }, []);

  const getNAVForScheme = (schemeCode: string): NAVData | null => {
    return navData.get(schemeCode) || null;
  };

  const refreshNAV = async (schemeCode: string): Promise<NAVData | null> => {
    try {
      console.log('Refreshing NAV for scheme:', schemeCode);
      const navResult = await FundDataService.fetchLatestNAV(schemeCode);
      
      if (navResult) {
        setNAVData(prev => new Map(prev.set(schemeCode, navResult)));
        return navResult;
      }
      return null;
    } catch (err) {
      console.error('Error refreshing NAV for', schemeCode, ':', err);
      return null;
    }
  };

  return {
    navData,
    loading,
    error,
    getNAVForScheme,
    refreshNAV
  };
};
