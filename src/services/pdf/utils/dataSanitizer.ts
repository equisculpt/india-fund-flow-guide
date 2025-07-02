export class PDFDataSanitizer {
  /**
   * Clean text by removing problematic symbols and emojis that cause PDF rendering issues
   */
  static cleanText(text: string): string {
    if (!text || typeof text !== 'string') return '';
    
    return text
      // Remove all emojis and unicode symbols
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      // Remove special symbols that might cause issues
      .replace(/[💰📈📊📉🎯👥⭐🎁]/g, '')
      // Remove other problematic unicode characters
      .replace(/[\u2000-\u206F\u2E00-\u2E7F]/g, ' ')
      // Clean up multiple spaces
      .replace(/\s+/g, ' ')
      // Trim whitespace
      .trim();
  }

  /**
   * Sanitize AI insight data structure
   */
  static sanitizeAIInsight(insight: any): any {
    if (!insight || typeof insight !== 'object') return insight;

    return {
      title: this.cleanText(insight.title || ''),
      insight: this.cleanText(insight.insight || ''),
      recommendation: this.cleanText(insight.recommendation || ''),
      highlight: this.cleanText(insight.highlight || ''),
      percentile: this.cleanText(insight.percentile || ''),
      percentileValue: insight.percentileValue || 0
    };
  }

  /**
   * Sanitize all text fields in an object recursively
   */
  static sanitizeObject(obj: any): any {
    if (!obj) return obj;
    
    if (typeof obj === 'string') {
      return this.cleanText(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item));
    }
    
    if (typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = this.sanitizeObject(value);
      }
      return sanitized;
    }
    
    return obj;
  }

  /**
   * Clean portfolio data for PDF generation
   */
  static sanitizePortfolioData(portfolio: any): any {
    if (!portfolio) return portfolio;

    return {
      ...portfolio,
      goalName: this.cleanText(portfolio.goalName || ''),
      // Keep numeric values as-is
      totalInvested: portfolio.totalInvested || 0,
      currentValue: portfolio.currentValue || 0,
      totalReturns: portfolio.totalReturns || 0,
      returnsPercentage: portfolio.returnsPercentage || 0,
      xirr: portfolio.xirr || 0,
      goalTarget: portfolio.goalTarget || 0,
      goalAchieved: portfolio.goalAchieved || 0
    };
  }

  /**
   * Clean holdings data
   */
  static sanitizeHoldings(holdings: any[]): any[] {
    if (!Array.isArray(holdings)) return [];

    return holdings.map(holding => ({
      ...holding,
      schemeName: this.cleanText(holding.schemeName || ''),
      amcName: this.cleanText(holding.amcName || ''),
      category: this.cleanText(holding.category || ''),
      lockinEndDate: this.cleanText(holding.lockinEndDate || ''),
      // Keep numeric values
      units: holding.units || 0,
      currentNav: holding.currentNav || 0,
      marketValue: holding.marketValue || 0,
      pnl: holding.pnl || 0,
      pnlPercentage: holding.pnlPercentage || 0,
      expenseRatio: holding.expenseRatio || 0,
      // Keep boolean values
      isELSS: Boolean(holding.isELSS),
      isLiquid: Boolean(holding.isLiquid)
    }));
  }

  /**
   * Clean user info data
   */
  static sanitizeUserInfo(userInfo: any): any {
    if (!userInfo) return userInfo;

    return {
      ...userInfo,
      name: this.cleanText(userInfo.name || ''),
      email: this.cleanText(userInfo.email || ''),
      clientCode: this.cleanText(userInfo.clientCode || ''),
      phone: this.cleanText(userInfo.phone || ''),
      address: this.cleanText(userInfo.address || '')
    };
  }

  /**
   * Main sanitization function for entire statement data
   */
  static sanitizeStatementData(statementData: any): any {
    if (!statementData) return statementData;

    return {
      userInfo: this.sanitizeUserInfo(statementData.userInfo),
      portfolio: this.sanitizePortfolioData(statementData.portfolio),
      holdings: this.sanitizeHoldings(statementData.holdings || []),
      transactions: this.sanitizeObject(statementData.transactions || []),
      sips: this.sanitizeObject(statementData.sips || []),
      rewards: this.sanitizeObject(statementData.rewards || {}),
      capitalGains: this.sanitizeObject(statementData.capitalGains || {}),
      chartsData: statementData.chartsData // Keep chart data as-is
    };
  }
}
