
import { AdvancedNAVAnalysis } from './types';
import { SchemeCodeCorrections } from './schemeCodeCorrections';
import { DataParsingUtils } from './dataParsingUtils';
import { supabase } from "@/integrations/supabase/client";

// Mock analysis data for prototype
const generateMockAnalysisData = (): AdvancedNAVAnalysis[] => {
  const funds = [
    { schemeCode: '125497', schemeName: 'SBI Small Cap Fund - Direct Growth', amcName: 'SBI Mutual Fund', category: 'Equity', subCategory: 'Small Cap' },
    { schemeCode: '100016', schemeName: 'SBI Bluechip Fund - Direct Growth', amcName: 'SBI Mutual Fund', category: 'Equity', subCategory: 'Large Cap' },
    { schemeCode: '120601', schemeName: 'ICICI Prudential All Seasons Bond Fund', amcName: 'ICICI Prudential', category: 'Debt', subCategory: 'Dynamic Bond' },
    { schemeCode: '118989', schemeName: 'HDFC Mid-Cap Opportunities Fund', amcName: 'HDFC Mutual Fund', category: 'Equity', subCategory: 'Mid Cap' },
    { schemeCode: '120716', schemeName: 'UTI Nifty 50 Index Fund', amcName: 'UTI Mutual Fund', category: 'Equity', subCategory: 'Index' },
    { schemeCode: '120503', schemeName: 'Axis ELSS Tax Saver Fund', amcName: 'Axis Mutual Fund', category: 'Equity', subCategory: 'ELSS' },
  ];

  return funds.map(fund => ({
    schemeCode: fund.schemeCode,
    schemeName: fund.schemeName,
    amcName: fund.amcName,
    category: fund.category,
    subCategory: fund.subCategory,
    nav: 50 + Math.random() * 150,
    date: new Date().toISOString().split('T')[0],
    trendScore: 60 + Math.random() * 30,
    confidence: 70 + Math.random() * 25,
    historical3MonthAverage: 5 + Math.random() * 15,
    historical3MonthData: [],
    riskLevel: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)] as 'LOW' | 'MEDIUM' | 'HIGH',
    volatilityScore: 5 + Math.random() * 20,
    sharpeRatio: 0.5 + Math.random() * 2,
    performanceRank: Math.floor(Math.random() * 50) + 1,
    totalSchemes: 100
  }));
};

export class AdvancedAnalysisService {
  static async getAdvancedAnalysis(): Promise<AdvancedNAVAnalysis[]> {
    try {
      console.log('🔍 ENHANCED NAV SERVICE - Using mock analysis data for prototype...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const mockData = generateMockAnalysisData();
      
      console.log(`✅ ENHANCED NAV SERVICE - Successfully generated ${mockData.length} analysis records`);
      return mockData;

    } catch (error) {
      console.error('Enhanced NAV Service error:', error);
      throw new Error(`Enhanced analysis fetch failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async triggerDailyAnalysis(): Promise<any> {
    try {
      console.log('Triggering daily analysis function (mock)...');
      
      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Daily analysis triggered successfully (mock)');
      return { success: true, message: 'Analysis completed' };
    } catch (error) {
      console.error('Error triggering daily analysis:', error);
      throw error;
    }
  }
}
