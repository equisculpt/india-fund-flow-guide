
import { SIPCalculationResult } from './types';
import { NAVHistoryService } from './navHistoryService';

export class SIPCalculationService {
  static async calculateSIPReturns(schemeCode: string, period: string, monthlyAmount: number): Promise<SIPCalculationResult | null> {
    try {
      const navHistory = await NAVHistoryService.getExtendedNAVHistory(schemeCode, period);
      
      if (navHistory.length < 2) {
        return null;
      }

      // Calculate number of months based on period
      let months = 12;
      switch (period) {
        case '1W':
          months = 0.25;
          break;
        case '1M':
          months = 1;
          break;
        case '3M':
          months = 3;
          break;
        case '6M':
          months = 6;
          break;
        case '1Y':
          months = 12;
          break;
        case '3Y':
          months = 36;
          break;
        case '5Y':
          months = 60;
          break;
        case '10Y':
          months = 120;
          break;
      }

      const totalInvested = monthlyAmount * Math.floor(months);
      const currentNAV = navHistory[navHistory.length - 1].nav_value;
      const startNAV = navHistory[0].nav_value;
      
      // Simple calculation for demonstration
      const totalUnits = totalInvested / ((startNAV + currentNAV) / 2);
      const finalValue = totalUnits * currentNAV;
      const absoluteReturn = finalValue - totalInvested;
      
      // Calculate IRR (simplified)
      const totalReturn = (finalValue - totalInvested) / totalInvested;
      const irrPercentage = (totalReturn / (months / 12)) * 100;

      return {
        total_invested: totalInvested,
        final_value: finalValue,
        absolute_return: absoluteReturn,
        irr_percentage: irrPercentage
      };
    } catch (error) {
      console.error('Error calculating SIP returns:', error);
      return null;
    }
  }

  static async calculateLumpsumReturns(schemeCode: string, period: string): Promise<{ absoluteReturn: number; irrReturn: number } | null> {
    try {
      const navHistory = await NAVHistoryService.getExtendedNAVHistory(schemeCode, period);
      
      if (navHistory.length < 2) {
        return null;
      }

      const startNAV = navHistory[0].nav_value;
      const endNAV = navHistory[navHistory.length - 1].nav_value;
      
      const absoluteReturn = ((endNAV - startNAV) / startNAV) * 100;
      
      // Calculate annualized return
      const days = navHistory.length;
      const years = days / 365;
      const irrReturn = years > 0 ? Math.pow((endNAV / startNAV), (1 / years)) - 1 : 0;
      
      return {
        absoluteReturn,
        irrReturn: irrReturn * 100
      };
    } catch (error) {
      console.error('Error calculating lumpsum returns:', error);
      return null;
    }
  }
}
