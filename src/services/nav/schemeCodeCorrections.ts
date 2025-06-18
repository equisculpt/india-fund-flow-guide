
export class SchemeCodeCorrections {
  // Scheme code corrections mapping - fixes known incorrect mappings
  private static schemeCodeCorrections: Record<string, string> = {
    // SBI Small Cap Fund corrections
    '120601': '125497', // Correct the wrong scheme code for SBI Small Cap Fund
    // Add other corrections as needed
  };

  static correctSchemeCode(originalCode: string): string {
    return this.schemeCodeCorrections[originalCode] || originalCode;
  }

  static hasCorrection(schemeCode: string): boolean {
    return !!this.schemeCodeCorrections[schemeCode];
  }

  static logCorrection(originalCode: string, correctedCode: string, schemeName: string, index?: number): void {
    const indexStr = index !== undefined ? `[${index}]` : '';
    console.log(`🔧 SCHEME CODE CORRECTION ${indexStr} - Fixed: ${originalCode} → ${correctedCode} for ${schemeName}`);
  }

  static verifySBICorrection(fund: any, index?: number): void {
    if (fund.schemeName?.includes('SBI Small Cap')) {
      const indexStr = index !== undefined ? `[${index}]` : '';
      console.log(`✅ FINAL SBI SMALL CAP VERIFICATION ${indexStr}:`, {
        schemeCode: fund.schemeCode,
        schemeName: fund.schemeName,
        amcName: fund.amcName,
        isCorrectCode: fund.schemeCode === '125497'
      });
      
      if (fund.schemeCode !== '125497') {
        console.error(`🚨 STILL WRONG! SBI Small Cap Fund still has incorrect scheme code: ${fund.schemeCode}, should be 125497`);
      }
    }
  }
}
