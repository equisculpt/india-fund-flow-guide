
export class FundCategoryDetector {
  static detectCategory(schemeName: string, categoryStr?: string): string {
    const name = schemeName.toLowerCase();
    const category = (categoryStr || '').toLowerCase();
    
    // Small Cap detection - improved logic
    if (name.includes('small cap') || name.includes('smallcap') || 
        category.includes('small cap') || category.includes('smallcap')) {
      return 'Small Cap';
    }
    
    // Mid Cap detection
    if (name.includes('mid cap') || name.includes('midcap') || 
        category.includes('mid cap') || category.includes('midcap')) {
      return 'Mid Cap';
    }
    
    // Large Cap detection
    if (name.includes('large cap') || name.includes('largecap') || 
        category.includes('large cap') || category.includes('largecap') ||
        name.includes('bluechip') || name.includes('blue chip')) {
      return 'Large Cap';
    }
    
    // ELSS detection
    if (name.includes('elss') || name.includes('tax saver') || 
        category.includes('elss') || category.includes('equity linked savings')) {
      return 'ELSS';
    }
    
    // Index fund detection
    if (name.includes('index') || name.includes('nifty') || name.includes('sensex') ||
        category.includes('index')) {
      return 'Index';
    }
    
    // Debt fund detection
    if (name.includes('debt') || name.includes('bond') || name.includes('gilt') ||
        name.includes('liquid') || name.includes('ultra short') || name.includes('short term') ||
        category.includes('debt') || category.includes('bond')) {
      return 'Debt';
    }
    
    // Hybrid fund detection
    if (name.includes('hybrid') || name.includes('balanced') || name.includes('conservative') ||
        name.includes('aggressive') || category.includes('hybrid')) {
      return 'Hybrid';
    }
    
    // International/Global fund detection
    if (name.includes('international') || name.includes('global') || name.includes('overseas') ||
        category.includes('international') || category.includes('global')) {
      return 'International';
    }
    
    // Sector specific funds
    if (name.includes('pharma') || name.includes('banking') || name.includes('technology') ||
        name.includes('infrastructure') || name.includes('fmcg') || name.includes('auto')) {
      return 'Sectoral';
    }
    
    // Default to Equity if none of the above
    if (name.includes('equity') || category.includes('equity')) {
      return 'Equity';
    }
    
    return 'Other';
  }
}
