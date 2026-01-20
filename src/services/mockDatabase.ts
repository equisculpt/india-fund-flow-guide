/**
 * Mock Database Service for Prototype
 * This provides realistic mock data for the prototype, simulating what the real database would contain
 */

export interface Profile {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  user_type: 'customer' | 'agent' | 'admin';
  kyc_status: 'pending' | 'verified' | 'rejected';
  referral_code?: string;
  commission_rate?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  onboarding_source?: 'agent' | 'direct' | 'referral';
  is_direct_customer?: boolean;
}

export interface MutualFund {
  id: string;
  scheme_code: string;
  scheme_name: string;
  amc_name: string;
  category: string;
  sub_category: string;
  nav: number;
  returns_1y: number;
  returns_3y: number;
  returns_5y: number;
  risk_level: 'Low' | 'Medium' | 'High' | 'Very High';
  min_sip_amount: number;
  min_lumpsum_amount: number;
  commission_rate: number;
  is_active: boolean;
  expense_ratio?: number;
  aum?: number;
}

export interface Investment {
  id: string;
  user_id: string;
  fund_id: string;
  fund_name: string;
  amount: number;
  units_allotted: number;
  nav_price: number;
  investment_type: 'SIP' | 'Lumpsum';
  status: 'active' | 'paused' | 'completed';
  total_invested: number;
  current_value: number;
  start_date: string;
  frequency?: string;
  gains: number;
  gainPercentage: number;
  xirr: number;
}

export interface Commission {
  id: string;
  agent_id: string;
  client_id: string;
  fund_id: string;
  amount: number;
  commission_type: 'trail' | 'upfront';
  status: 'pending' | 'paid' | 'processing';
  created_at: string;
  agent_share_percentage: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  status: 'draft' | 'published' | 'pending_review';
  moderation_status: 'pending' | 'approved' | 'rejected';
  published_at?: string;
  created_at: string;
  updated_at: string;
  category: string;
  tags: string[];
}

export interface CommunityQuestion {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  status: 'open' | 'answered' | 'closed';
  votes: number;
  answers_count: number;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  admin_notes?: string;
  created_at: string;
}

export interface UploadedFile {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  upload_status: 'uploaded' | 'processing' | 'completed';
  uploaded_by: string;
  created_at: string;
}

export interface AMC {
  id: string;
  amc_name: string;
  amc_code: string;
  is_active: boolean;
}

// Mock Data
export const mockProfiles: Profile[] = [
  {
    id: 'user-001',
    full_name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91-9876543210',
    user_type: 'customer',
    kyc_status: 'verified',
    referral_code: 'RAJESH2024',
    is_active: true,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    onboarding_source: 'direct',
    is_direct_customer: true
  },
  {
    id: 'user-002',
    full_name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91-9988776655',
    user_type: 'customer',
    kyc_status: 'verified',
    is_active: true,
    created_at: '2024-02-20T14:45:00Z',
    updated_at: '2024-02-20T14:45:00Z',
    onboarding_source: 'agent',
    is_direct_customer: false
  },
  {
    id: 'agent-001',
    full_name: 'Amit Patel',
    email: 'amit.patel@agent.com',
    phone: '+91-9123456789',
    user_type: 'agent',
    kyc_status: 'verified',
    referral_code: 'AGENT001',
    commission_rate: 75,
    is_active: true,
    created_at: '2023-06-01T09:00:00Z',
    updated_at: '2024-01-01T09:00:00Z'
  },
  {
    id: 'agent-002',
    full_name: 'Sunita Reddy',
    email: 'sunita.reddy@agent.com',
    phone: '+91-9876123456',
    user_type: 'agent',
    kyc_status: 'verified',
    referral_code: 'AGENT002',
    commission_rate: 90,
    is_active: true,
    created_at: '2023-03-15T11:30:00Z',
    updated_at: '2024-01-01T11:30:00Z'
  },
  {
    id: 'admin-001',
    full_name: 'Admin User',
    email: 'admin@sipbrewery.com',
    user_type: 'admin',
    kyc_status: 'verified',
    is_active: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  }
];

export const mockMutualFunds: MutualFund[] = [
  {
    id: 'fund-001',
    scheme_code: 'HDFC001',
    scheme_name: 'HDFC Top 100 Fund - Direct Growth',
    amc_name: 'HDFC Mutual Fund',
    category: 'Equity',
    sub_category: 'Large Cap',
    nav: 892.45,
    returns_1y: 18.5,
    returns_3y: 15.2,
    returns_5y: 14.8,
    risk_level: 'Medium',
    min_sip_amount: 500,
    min_lumpsum_amount: 5000,
    commission_rate: 1.2,
    is_active: true,
    expense_ratio: 0.98,
    aum: 45230
  },
  {
    id: 'fund-002',
    scheme_code: 'SBI002',
    scheme_name: 'SBI Small Cap Fund - Direct Growth',
    amc_name: 'SBI Mutual Fund',
    category: 'Equity',
    sub_category: 'Small Cap',
    nav: 156.78,
    returns_1y: 32.4,
    returns_3y: 22.8,
    returns_5y: 24.1,
    risk_level: 'Very High',
    min_sip_amount: 500,
    min_lumpsum_amount: 5000,
    commission_rate: 1.5,
    is_active: true,
    expense_ratio: 0.72,
    aum: 28450
  },
  {
    id: 'fund-003',
    scheme_code: 'AXIS003',
    scheme_name: 'Axis Bluechip Fund - Direct Growth',
    amc_name: 'Axis Mutual Fund',
    category: 'Equity',
    sub_category: 'Large Cap',
    nav: 48.92,
    returns_1y: 16.8,
    returns_3y: 14.5,
    returns_5y: 13.9,
    risk_level: 'Medium',
    min_sip_amount: 500,
    min_lumpsum_amount: 5000,
    commission_rate: 1.0,
    is_active: true,
    expense_ratio: 0.45,
    aum: 35670
  },
  {
    id: 'fund-004',
    scheme_code: 'ICICI004',
    scheme_name: 'ICICI Prudential Balanced Advantage - Direct',
    amc_name: 'ICICI Prudential Mutual Fund',
    category: 'Hybrid',
    sub_category: 'Balanced Advantage',
    nav: 62.34,
    returns_1y: 14.2,
    returns_3y: 11.8,
    returns_5y: 12.5,
    risk_level: 'Medium',
    min_sip_amount: 1000,
    min_lumpsum_amount: 5000,
    commission_rate: 0.8,
    is_active: true,
    expense_ratio: 1.02,
    aum: 52340
  },
  {
    id: 'fund-005',
    scheme_code: 'PPFAS005',
    scheme_name: 'Parag Parikh Flexi Cap Fund - Direct',
    amc_name: 'PPFAS Mutual Fund',
    category: 'Equity',
    sub_category: 'Flexi Cap',
    nav: 72.45,
    returns_1y: 28.6,
    returns_3y: 19.4,
    returns_5y: 21.2,
    risk_level: 'High',
    min_sip_amount: 1000,
    min_lumpsum_amount: 1000,
    commission_rate: 1.3,
    is_active: true,
    expense_ratio: 0.63,
    aum: 42180
  }
];

export const mockInvestments: Investment[] = [
  {
    id: 'inv-001',
    user_id: 'user-001',
    fund_id: 'fund-001',
    fund_name: 'HDFC Top 100 Fund - Direct Growth',
    amount: 5000,
    units_allotted: 67.23,
    nav_price: 892.45,
    investment_type: 'SIP',
    status: 'active',
    total_invested: 60000,
    current_value: 72450,
    start_date: '2023-01-15',
    frequency: 'monthly',
    gains: 12450,
    gainPercentage: 20.75,
    xirr: 18.5
  },
  {
    id: 'inv-002',
    user_id: 'user-001',
    fund_id: 'fund-002',
    fund_name: 'SBI Small Cap Fund - Direct Growth',
    amount: 3000,
    units_allotted: 229.34,
    nav_price: 156.78,
    investment_type: 'SIP',
    status: 'active',
    total_invested: 36000,
    current_value: 48560,
    start_date: '2023-03-01',
    frequency: 'monthly',
    gains: 12560,
    gainPercentage: 34.89,
    xirr: 32.4
  },
  {
    id: 'inv-003',
    user_id: 'user-002',
    fund_id: 'fund-005',
    fund_name: 'Parag Parikh Flexi Cap Fund - Direct',
    amount: 100000,
    units_allotted: 1380.26,
    nav_price: 72.45,
    investment_type: 'Lumpsum',
    status: 'active',
    total_invested: 100000,
    current_value: 128650,
    start_date: '2023-06-15',
    gains: 28650,
    gainPercentage: 28.65,
    xirr: 28.6
  }
];

export const mockCommissions: Commission[] = [
  {
    id: 'comm-001',
    agent_id: 'agent-001',
    client_id: 'user-001',
    fund_id: 'fund-001',
    amount: 450,
    commission_type: 'trail',
    status: 'paid',
    created_at: '2024-01-01T00:00:00Z',
    agent_share_percentage: 75
  },
  {
    id: 'comm-002',
    agent_id: 'agent-001',
    client_id: 'user-002',
    fund_id: 'fund-002',
    amount: 680,
    commission_type: 'trail',
    status: 'pending',
    created_at: '2024-01-15T00:00:00Z',
    agent_share_percentage: 75
  },
  {
    id: 'comm-003',
    agent_id: 'agent-002',
    client_id: 'user-001',
    fund_id: 'fund-003',
    amount: 920,
    commission_type: 'upfront',
    status: 'paid',
    created_at: '2024-01-20T00:00:00Z',
    agent_share_percentage: 90
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    title: 'Understanding SIP: A Beginner\'s Guide to Systematic Investment Plans',
    content: 'SIP or Systematic Investment Plan is one of the most popular ways to invest in mutual funds...',
    author_id: 'admin-001',
    status: 'published',
    moderation_status: 'approved',
    published_at: '2024-01-10T10:00:00Z',
    created_at: '2024-01-08T14:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
    category: 'Investment Basics',
    tags: ['SIP', 'Mutual Funds', 'Beginners']
  },
  {
    id: 'blog-002',
    title: 'Top 5 Large Cap Funds for 2024',
    content: 'Large cap funds are ideal for conservative investors looking for stable returns...',
    author_id: 'agent-001',
    status: 'published',
    moderation_status: 'approved',
    published_at: '2024-01-15T09:00:00Z',
    created_at: '2024-01-14T16:00:00Z',
    updated_at: '2024-01-15T09:00:00Z',
    category: 'Fund Analysis',
    tags: ['Large Cap', 'Fund Selection', '2024']
  },
  {
    id: 'blog-003',
    title: 'Tax Benefits of ELSS Funds',
    content: 'ELSS or Equity Linked Savings Scheme offers tax benefits under Section 80C...',
    author_id: 'admin-001',
    status: 'pending_review',
    moderation_status: 'pending',
    created_at: '2024-01-18T11:00:00Z',
    updated_at: '2024-01-18T11:00:00Z',
    category: 'Tax Planning',
    tags: ['ELSS', 'Tax Saving', '80C']
  }
];

export const mockCommunityQuestions: CommunityQuestion[] = [
  {
    id: 'q-001',
    user_id: 'user-001',
    title: 'Which is better - SIP or Lumpsum investment?',
    content: 'I have ₹1 lakh to invest. Should I do a lumpsum or start an SIP?',
    category: 'Investment Strategy',
    status: 'answered',
    votes: 45,
    answers_count: 8,
    created_at: '2024-01-12T15:30:00Z'
  },
  {
    id: 'q-002',
    user_id: 'user-002',
    title: 'How to calculate XIRR for my mutual fund portfolio?',
    content: 'Can someone explain how XIRR is calculated and why it\'s important?',
    category: 'Performance Metrics',
    status: 'answered',
    votes: 32,
    answers_count: 5,
    created_at: '2024-01-14T09:00:00Z'
  }
];

export const mockContactSubmissions: ContactSubmission[] = [
  {
    id: 'contact-001',
    name: 'Vikram Singh',
    email: 'vikram@email.com',
    phone: '+91-9876543210',
    subject: 'Partnership Inquiry',
    message: 'I am interested in becoming a distribution partner.',
    status: 'in_progress',
    admin_notes: 'Scheduled a call for next week',
    created_at: '2024-01-16T10:00:00Z'
  },
  {
    id: 'contact-002',
    name: 'Meera Iyer',
    email: 'meera@email.com',
    subject: 'Technical Support',
    message: 'Unable to complete my KYC verification.',
    status: 'new',
    created_at: '2024-01-18T14:30:00Z'
  }
];

export const mockUploadedFiles: UploadedFile[] = [
  {
    id: 'file-001',
    file_name: 'HDFC_Portfolio_Jan2024.xlsx',
    file_type: 'XLSX',
    file_size: 245000,
    upload_status: 'completed',
    uploaded_by: 'admin-001',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'file-002',
    file_name: 'SBI_NAV_Update.pdf',
    file_type: 'PDF',
    file_size: 156000,
    upload_status: 'completed',
    uploaded_by: 'admin-001',
    created_at: '2024-01-16T09:00:00Z'
  }
];

export const mockAMCList: AMC[] = [
  { id: 'amc-001', amc_name: 'HDFC Mutual Fund', amc_code: 'HDFC', is_active: true },
  { id: 'amc-002', amc_name: 'SBI Mutual Fund', amc_code: 'SBI', is_active: true },
  { id: 'amc-003', amc_name: 'Axis Mutual Fund', amc_code: 'AXIS', is_active: true },
  { id: 'amc-004', amc_name: 'ICICI Prudential Mutual Fund', amc_code: 'ICICI', is_active: true },
  { id: 'amc-005', amc_name: 'PPFAS Mutual Fund', amc_code: 'PPFAS', is_active: true },
  { id: 'amc-006', amc_name: 'Kotak Mutual Fund', amc_code: 'KOTAK', is_active: true },
  { id: 'amc-007', amc_name: 'Nippon India Mutual Fund', amc_code: 'NIPPON', is_active: true },
  { id: 'amc-008', amc_name: 'Mirae Asset Mutual Fund', amc_code: 'MIRAE', is_active: true }
];

/**
 * Mock Database API - Simulates Supabase-like operations
 */
class MockDatabase {
  private delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

  async getProfiles() {
    await this.delay();
    return { data: mockProfiles, error: null };
  }

  async getMutualFunds() {
    await this.delay();
    return { data: mockMutualFunds, error: null };
  }

  async getInvestments() {
    await this.delay();
    return { data: mockInvestments, error: null };
  }

  async getCommissions() {
    await this.delay();
    return { data: mockCommissions, error: null };
  }

  async getBlogPosts() {
    await this.delay();
    return { data: mockBlogPosts, error: null };
  }

  async getCommunityQuestions() {
    await this.delay();
    return { data: mockCommunityQuestions, error: null };
  }

  async getContactSubmissions() {
    await this.delay();
    return { data: mockContactSubmissions, error: null };
  }

  async getUploadedFiles() {
    await this.delay();
    return { data: mockUploadedFiles, error: null };
  }

  async getAMCList() {
    await this.delay();
    return { data: mockAMCList, error: null };
  }

  // Simulate insert/update operations (just log and return success for prototype)
  async insert(table: string, data: any) {
    await this.delay(500);
    console.log(`[Mock DB] INSERT into ${table}:`, data);
    return { data: { id: `mock-${Date.now()}`, ...data }, error: null };
  }

  async update(table: string, id: string, data: any) {
    await this.delay(500);
    console.log(`[Mock DB] UPDATE ${table} where id=${id}:`, data);
    return { data: { id, ...data }, error: null };
  }

  async delete(table: string, id: string) {
    await this.delay(300);
    console.log(`[Mock DB] DELETE from ${table} where id=${id}`);
    return { data: null, error: null };
  }
}

export const mockDb = new MockDatabase();
