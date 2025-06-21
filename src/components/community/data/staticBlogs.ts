
import type { StaticBlog } from '../types/blogTypes';

export const staticBlogs: StaticBlog[] = [
  {
    id: 'static-what-are-mutual-funds',
    title: 'What Are Mutual Funds: Complete Guide for Beginners',
    excerpt: 'A comprehensive guide to understanding mutual funds, how they work, and why they are perfect for beginner investors in India.',
    category: 'beginner-guide',
    tags: ['mutual funds', 'beginner guide', 'investing basics'],
    route: '/blog/what-are-mutual-funds-complete-guide',
    published_at: '2025-06-19',
    author: 'SIP Brewery Team',
    featured_image_url: '/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png'
  },
  {
    id: 'static-how-mutual-funds-work',
    title: 'How Mutual Funds Work: Detailed Explanation with Examples',
    excerpt: 'Learn the complete working mechanism of mutual funds with real-world examples, NAV calculation, and investment process.',
    category: 'investment-tips',
    tags: ['mutual funds', 'NAV', 'investment process'],
    route: '/blog/how-mutual-funds-work-detailed-explanation',
    published_at: '2025-06-19',
    author: 'SIP Brewery Team',
    featured_image_url: '/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png'
  },
  {
    id: 'static-fund-managers-money',
    title: 'How Fund Managers Make Money from Mutual Funds',
    excerpt: 'Understand the fee structure of mutual funds, how fund managers earn, and what it means for your returns.',
    category: 'fund-reviews',
    tags: ['fund managers', 'fees', 'expense ratio'],
    route: '/blog/how-fund-managers-make-money-mutual-funds',
    published_at: '2025-06-19',
    author: 'SIP Brewery Team',
    featured_image_url: '/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png'
  },
  {
    id: 'static-mutual-fund-benefits',
    title: 'Benefits of Mutual Funds for Individual Investors: Complete Guide',
    excerpt: 'Discover why mutual funds are the preferred investment choice for millions of Indian investors with detailed benefits analysis.',
    category: 'investment-tips',
    tags: ['benefits', 'advantages', 'individual investors'],
    route: '/blog/mutual-funds-benefits-individual-investors',
    published_at: '2025-06-19',
    author: 'SIP Brewery Team',
    featured_image_url: '/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png'
  },
  {
    id: 'veeda-clinical-research-ipo-analysis',
    title: 'Veeda Clinical Research IPO: Complete SWOT & Financial Analysis',
    excerpt: 'In-depth analysis of Veeda Clinical Research IPO with financial charts, SWOT analysis, and key insights for healthcare sector investors.',
    author: 'SIP Brewery Research Team',
    published_at: new Date().toISOString(),
    category: 'market-analysis',
    featured_image_url: '/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png',
    tags: ['IPO Analysis', 'Healthcare', 'CRO Sector', 'Financial Review'],
    route: '/blog/veeda-clinical-research-ipo-analysis'
  }
];
