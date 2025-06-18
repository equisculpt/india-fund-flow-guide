
import { useState } from 'react';

export interface Fund {
  id: string;
  name: string;
  category: string;
  returns: number;
  rating: number;
  risk: string;
  returns1Y: number;
  returns3Y: number;
  minSip: number;
  fundHouse: string;
  nav: number;
}

export const useFundData = () => {
  const [allFunds] = useState<Fund[]>([
    {
      id: '118989', // CORRECTED: This is HDFC Mid-Cap, not Top 100
      name: 'HDFC Mid-Cap Opportunities Fund - Direct Growth',
      category: 'Mid Cap',
      returns: 24.5,
      rating: 4.8,
      risk: 'High',
      returns1Y: 24.5,
      returns3Y: 18.2,
      minSip: 500,
      fundHouse: 'HDFC Mutual Fund',
      nav: 210.87
    },
    {
      id: '125497', // CORRECT: SBI Small Cap Fund
      name: 'SBI Small Cap Fund - Direct Growth',
      category: 'Small Cap',
      returns: 18.5,
      rating: 4.7,
      risk: 'High',
      returns1Y: 18.5,
      returns3Y: 22.3,
      minSip: 500,
      fundHouse: 'SBI Mutual Fund',
      nav: 170.08
    },
    {
      id: '119551', // CORRECTED: Different HDFC fund
      name: 'HDFC Equity Fund - Growth',
      category: 'Flexi Cap',
      returns: 19.8,
      rating: 4.6,
      risk: 'Moderate',
      returns1Y: 19.8,
      returns3Y: 16.5,
      minSip: 500,
      fundHouse: 'HDFC Mutual Fund',
      nav: 156.78
    },
    {
      id: '100016', // CORRECT: SBI Bluechip Fund
      name: 'SBI Bluechip Fund - Direct Growth',
      category: 'Large Cap',
      returns: 18.7,
      rating: 4.5,
      risk: 'Moderate',
      returns1Y: 18.7,
      returns3Y: 15.4,
      minSip: 500,
      fundHouse: 'SBI Mutual Fund',
      nav: 76.32
    },
    {
      id: '119533', // Mid cap fund
      name: 'SBI Large & Midcap Fund - Direct',
      category: 'Mid Cap',
      returns: 19.2,
      rating: 4.5,
      risk: 'Moderate',
      returns1Y: 19.2,
      returns3Y: 21.8,
      minSip: 500,
      fundHouse: 'SBI Mutual Fund',
      nav: 178.92
    },
    {
      id: '120503', // CORRECTED: This is Axis ELSS
      name: 'Axis ELSS Tax Saver Fund - Direct Growth',
      category: 'ELSS',
      returns: 22.3,
      rating: 4.3,
      risk: 'Moderate',
      returns1Y: 22.3,
      returns3Y: 17.1,
      minSip: 500,
      fundHouse: 'Axis Mutual Fund',
      nav: 107.98
    },
    {
      id: '120376', // Small cap fund
      name: 'Kotak Small Cap Fund - Direct Growth',
      category: 'Small Cap',
      returns: 21.5,
      rating: 4.6,
      risk: 'High',
      returns1Y: 21.5,
      returns3Y: 24.8,
      minSip: 1000,
      fundHouse: 'Kotak Mahindra MF',
      nav: 245.67
    },
    {
      id: '119827', // Hybrid fund
      name: 'HDFC Balanced Advantage Fund - Direct',
      category: 'Hybrid',
      returns: 12.8,
      rating: 4.2,
      risk: 'Low',
      returns1Y: 12.8,
      returns3Y: 15.3,
      minSip: 500,
      fundHouse: 'HDFC Mutual Fund',
      nav: 23.45
    },
    {
      id: '120588', // Mid cap fund
      name: 'Parag Parikh Long Term Equity Fund',
      category: 'Mid Cap',
      returns: 20.1,
      rating: 4.7,
      risk: 'Moderate',
      returns1Y: 20.1,
      returns3Y: 23.2,
      minSip: 1000,
      fundHouse: 'PPFAS Mutual Fund',
      nav: 56.78
    },
    {
      id: '100042', // CORRECT: Axis Bluechip Fund
      name: 'Axis Bluechip Fund - Direct Growth',
      category: 'Large Cap',
      returns: 15.2,
      rating: 4.5,
      risk: 'Moderate',
      returns1Y: 15.2,
      returns3Y: 18.5,
      minSip: 500,
      fundHouse: 'Axis Mutual Fund',
      nav: 52.75
    }
  ]);

  return { allFunds };
};
