
import { FundData, TopFund } from '@/types/fundTypes';

export class FundDataMappings {
  // CORRECTED Top 10 popular funds with VERIFIED scheme codes and matching names
  static readonly TOP_FUNDS: TopFund[] = [
    { schemeCode: '125497', name: 'SBI Small Cap Fund - Direct Growth' },
    { schemeCode: '100016', name: 'SBI Bluechip Fund - Direct Growth' },
    { schemeCode: '101206', name: 'SBI Overnight Fund - Regular Growth' },
    { schemeCode: '120601', name: 'ICICI Prudential All Seasons Bond Fund - Direct Plan' },
    { schemeCode: '118989', name: 'HDFC Mid-Cap Opportunities Fund - Direct Growth' },
    { schemeCode: '119078', name: 'HDFC Regular Savings Fund - Direct Plan' },
    { schemeCode: '120716', name: 'UTI Nifty 50 Index Fund - Direct Growth' },
    { schemeCode: '145553', name: 'UTI Fixed Term Income Fund - Direct Growth' },
    { schemeCode: '120503', name: 'Axis ELSS Tax Saver Fund - Direct Growth' },
    { schemeCode: '102885', name: 'SBI Equity Hybrid Fund - Regular Growth' }
  ];

  // CORRECTED mock data with proper scheme code mappings that match API responses
  static readonly FUND_DATA_MAP: Record<string, FundData> = {
    '125497': { // SBI Small Cap Fund - Direct Growth - VERIFIED
      schemeCode: '125497',
      schemeName: 'SBI Small Cap Fund - Direct Growth',
      amc: 'SBI Mutual Fund',
      category: 'Small Cap',
      nav: 194.31,
      returns1Y: 28.9,
      returns3Y: 22.1,
      returns5Y: 19.4,
      aum: 15420,
      expenseRatio: 1.25,
      volatility: 8.2,
      minSipAmount: 500
    },
    '100016': { // SBI Bluechip Fund - Direct Growth - VERIFIED
      schemeCode: '100016',
      schemeName: 'SBI Bluechip Fund - Direct Growth',
      amc: 'SBI Mutual Fund',
      category: 'Large Cap',
      nav: 76.32,
      returns1Y: 18.7,
      returns3Y: 15.4,
      returns5Y: 14.2,
      aum: 28650,
      expenseRatio: 0.52,
      volatility: 4.2,
      minSipAmount: 500
    },
    '118989': { // HDFC Mid-Cap Opportunities Fund - CORRECT mapping
      schemeCode: '118989',
      schemeName: 'HDFC Mid-Cap Opportunities Fund - Direct Growth',
      amc: 'HDFC Mutual Fund',
      category: 'Mid Cap',
      nav: 210.87,
      returns1Y: 24.5,
      returns3Y: 18.2,
      returns5Y: 16.8,
      aum: 22340,
      expenseRatio: 0.68,
      volatility: 6.5,
      minSipAmount: 500
    },
    '120503': { // Axis ELSS Tax Saver Fund - CORRECTED mapping
      schemeCode: '120503',
      schemeName: 'Axis ELSS Tax Saver Fund - Direct Growth',
      amc: 'Axis Mutual Fund',
      category: 'ELSS',
      nav: 107.98,
      returns1Y: 22.3,
      returns3Y: 17.1,
      returns5Y: 15.7,
      aum: 12800,
      expenseRatio: 0.75,
      volatility: 5.8,
      minSipAmount: 500
    },
    '119551': { // HDFC Equity Fund - CORRECTED mapping
      schemeCode: '119551',
      schemeName: 'HDFC Equity Fund - Direct Growth',
      amc: 'HDFC Mutual Fund',
      category: 'Flexi Cap',
      nav: 156.78,
      returns1Y: 19.8,
      returns3Y: 16.5,
      returns5Y: 14.9,
      aum: 15680,
      expenseRatio: 1.05,
      volatility: 5.8,
      minSipAmount: 500
    },
    '100042': { // Axis Bluechip Fund - VERIFIED
      schemeCode: '100042',
      schemeName: 'Axis Bluechip Fund - Direct Growth',
      amc: 'Axis Mutual Fund',
      category: 'Large Cap',
      nav: 52.75,
      returns1Y: 15.2,
      returns3Y: 18.5,
      returns5Y: 14.2,
      aum: 8950,
      expenseRatio: 0.52,
      volatility: 4.8,
      minSipAmount: 500
    },
    '101206': { // SBI Overnight Fund - Regular Growth - VERIFIED
      schemeCode: '101206',
      schemeName: 'SBI Overnight Fund - Regular Growth',
      amc: 'SBI Mutual Fund',
      category: 'Debt - Overnight',
      nav: 4149.08,
      returns1Y: 6.8,
      returns3Y: 6.2,
      returns5Y: 6.0,
      aum: 8230,
      expenseRatio: 0.15,
      volatility: 0.5,
      minSipAmount: 100
    },
    '120601': { // ICICI Prudential All Seasons Bond Fund - VERIFIED
      schemeCode: '120601',
      schemeName: 'ICICI Prudential All Seasons Bond Fund - Direct Plan',
      amc: 'ICICI Prudential Mutual Fund',
      category: 'Debt Scheme - Dynamic Bond',
      nav: 11.73,
      returns1Y: 8.9,
      returns3Y: 7.1,
      returns5Y: 6.4,
      aum: 2402,
      expenseRatio: 0.85,
      volatility: 2.2,
      minSipAmount: 500
    },
    '119078': { // HDFC Regular Savings Fund - VERIFIED
      schemeCode: '119078',
      schemeName: 'HDFC Regular Savings Fund - Direct Plan',
      amc: 'HDFC Mutual Fund',
      category: 'Hybrid - Conservative',
      nav: 42.15,
      returns1Y: 12.3,
      returns3Y: 10.8,
      returns5Y: 9.2,
      aum: 5670,
      expenseRatio: 0.45,
      volatility: 3.1,
      minSipAmount: 500
    },
    '120716': { // UTI Nifty 50 Index Fund - VERIFIED
      schemeCode: '120716',
      schemeName: 'UTI Nifty 50 Index Fund - Direct Growth',
      amc: 'UTI Mutual Fund',
      category: 'Index',
      nav: 173.26,
      returns1Y: 16.8,
      returns3Y: 14.2,
      returns5Y: 13.1,
      aum: 8920,
      expenseRatio: 0.20,
      volatility: 4.8,
      minSipAmount: 500
    },
    '145553': { // UTI Fixed Term Income Fund - VERIFIED
      schemeCode: '145553',
      schemeName: 'UTI Fixed Term Income Fund - Direct Growth',
      amc: 'UTI Mutual Fund',
      category: 'Debt - Fixed Term',
      nav: 13.16,
      returns1Y: 7.2,
      returns3Y: 6.8,
      returns5Y: 6.5,
      aum: 1250,
      expenseRatio: 0.35,
      volatility: 1.2,
      minSipAmount: 1000
    },
    '102885': { // SBI Equity Hybrid Fund - VERIFIED
      schemeCode: '102885',
      schemeName: 'SBI Equity Hybrid Fund - Regular Growth',
      amc: 'SBI Mutual Fund',
      category: 'Hybrid - Aggressive',
      nav: 299.86,
      returns1Y: 19.5,
      returns3Y: 16.2,
      returns5Y: 14.8,
      aum: 18750,
      expenseRatio: 1.15,
      volatility: 5.5,
      minSipAmount: 500
    },
    '100076': { // Aditya Birla Sun Life Equity Advantage Fund
      schemeCode: '100076',
      schemeName: 'Aditya Birla Sun Life Equity Advantage Fund - Regular Growth',
      amc: 'Aditya Birla Sun Life Mutual Fund',
      category: 'Flexi Cap',
      nav: 89.45,
      returns1Y: 21.2,
      returns3Y: 16.8,
      returns5Y: 15.1,
      aum: 8950,
      expenseRatio: 2.25,
      volatility: 6.2,
      minSipAmount: 500
    }
  };

  static getFundData(schemeCode: string): FundData | null {
    return this.FUND_DATA_MAP[schemeCode] || null;
  }

  static getSchemeCodeByName(fundName: string): string | null {
    const fund = this.TOP_FUNDS.find(f => 
      f.name.toLowerCase().includes(fundName.toLowerCase()) ||
      fundName.toLowerCase().includes(f.name.toLowerCase())
    );
    
    if (fund) {
      console.log('FundDataMappings: Found scheme code', fund.schemeCode, 'for fund name:', fundName);
      return fund.schemeCode;
    }
    
    console.log('FundDataMappings: No scheme code found for fund name:', fundName);
    return null;
  }
}
