
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
      id: '120503',
      name: 'HDFC Top 100 Fund - Direct Growth',
      category: 'Large Cap',
      returns: 16.3,
      rating: 4.6,
      risk: 'Moderate',
      returns1Y: 16.3,
      returns3Y: 19.1,
      minSip: 500,
      fundHouse: 'HDFC Mutual Fund',
      nav: 889.45
    },
    {
      id: '125497',
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
      id: '130502',
      name: 'HDFC Small Cap Fund - Growth',
      category: 'Small Cap',
      returns: 22.1,
      rating: 4.8,
      risk: 'High',
      returns1Y: 22.1,
      returns3Y: 25.6,
      minSip: 500,
      fundHouse: 'HDFC Mutual Fund',
      nav: 136.98
    },
    {
      id: '118989',
      name: 'ICICI Prudential Bluechip Fund - Direct',
      category: 'Large Cap',
      returns: 14.8,
      rating: 4.4,
      risk: 'Moderate',
      returns1Y: 14.8,
      returns3Y: 17.2,
      minSip: 1000,
      fundHouse: 'ICICI Prudential MF',
      nav: 71.23
    },
    {
      id: '119533',
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
      id: '122639',
      name: 'Axis ELSS Tax Saver Fund - Direct',
      category: 'ELSS',
      returns: 17.8,
      rating: 4.3,
      risk: 'Moderate',
      returns1Y: 17.8,
      returns3Y: 20.4,
      minSip: 500,
      fundHouse: 'Axis Mutual Fund',
      nav: 67.34
    },
    {
      id: '120376',
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
      id: '119827',
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
      id: '120588',
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
      id: '100042',
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
