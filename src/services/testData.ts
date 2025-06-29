
export const TEST_USER_DATA = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  profile: {
    id: '550e8400-e29b-41d4-a716-446655440000',
    full_name: 'Test User',
    phone: '+91-9876543210',
    pan_number: 'ABCDE1234F',
    user_type: 'customer' as const,
    kyc_status: 'verified' as const,
    referral_code: 'TESTUSER123',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  
  mutualFunds: [
    {
      id: 'fund-1-hdfc-top-100',
      scheme_code: 'HDFC001',
      scheme_name: 'HDFC Top 100 Fund',
      amc_name: 'HDFC Mutual Fund',
      category: 'Equity',
      sub_category: 'Large Cap',
      nav: 245.67,
      returns_1y: 15.2,
      returns_3y: 18.5,
      returns_5y: 16.8,
      risk_level: 'Medium',
      min_sip_amount: 500,
      min_lumpsum_amount: 5000,
      commission_rate: 1.5,
      is_active: true
    },
    {
      id: 'fund-2-sbi-small-cap',
      scheme_code: 'SBI002',
      scheme_name: 'SBI Small Cap Fund',
      amc_name: 'SBI Mutual Fund',
      category: 'Equity',
      sub_category: 'Small Cap',
      nav: 89.45,
      returns_1y: 22.1,
      returns_3y: 19.8,
      returns_5y: 21.2,
      risk_level: 'High',
      min_sip_amount: 1000,
      min_lumpsum_amount: 10000,
      commission_rate: 2.0,
      is_active: true
    },
    {
      id: 'fund-3-axis-bluechip',
      scheme_code: 'AXIS003',
      scheme_name: 'Axis Bluechip Fund',
      amc_name: 'Axis Mutual Fund',
      category: 'Equity',
      sub_category: 'Large Cap',
      nav: 156.32,
      returns_1y: 12.8,
      returns_3y: 14.5,
      returns_5y: 13.9,
      risk_level: 'Medium',
      min_sip_amount: 500,
      min_lumpsum_amount: 5000,
      commission_rate: 1.2,
      is_active: true
    }
  ],
  
  investments: [
    {
      id: 'investment-1-test-user',
      user_id: '550e8400-e29b-41d4-a716-446655440000',
      fund_id: 'fund-1-hdfc-top-100',
      fund_name: 'HDFC Top 100 Fund',
      amount: 25000,
      units_allotted: 101.78,
      nav_price: 245.67,
      investment_type: 'SIP',
      status: 'active',
      total_invested: 25000,
      current_value: 31200,
      start_date: '2024-01-01',
      frequency: 'monthly',
      gains: 6200,
      gainPercentage: 24.8
    },
    {
      id: 'investment-2-test-user',
      user_id: '550e8400-e29b-41d4-a716-446655440000',
      fund_id: 'fund-2-sbi-small-cap',
      fund_name: 'SBI Small Cap Fund',
      amount: 35000,
      units_allotted: 391.12,
      nav_price: 89.45,
      investment_type: 'SIP',
      status: 'active',
      total_invested: 35000,
      current_value: 42350,
      start_date: '2024-02-01',
      frequency: 'monthly',
      gains: 7350,
      gainPercentage: 21.0
    },
    {
      id: 'investment-3-test-user',
      user_id: '550e8400-e29b-41d4-a716-446655440000',
      fund_id: 'fund-3-axis-bluechip',
      fund_name: 'Axis Bluechip Fund',
      amount: 25000,
      units_allotted: 159.95,
      nav_price: 156.32,
      investment_type: 'Lumpsum',
      status: 'active',
      total_invested: 25000,
      current_value: 28900,
      start_date: '2024-03-01',
      frequency: null,
      gains: 3900,
      gainPercentage: 15.6
    }
  ],
  
  portfolioAnalytics: {
    totalValue: 102450,
    totalInvested: 85000,
    totalGains: 17450,
    gainPercentage: 20.5,
    dayChange: 1250,
    dayChangePercentage: 1.23,
    riskScore: 6.8,
    peerPercentile: 82,
    volatility: 12.5,
    sharpeRatio: 1.64
  }
};
