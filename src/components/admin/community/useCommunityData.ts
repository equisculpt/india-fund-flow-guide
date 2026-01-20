
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  expert_only: boolean;
  is_answered: boolean;
  status: string;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string;
  } | null;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  category: string;
  views_count: number;
  created_at: string;
  published_at: string;
  author_id: string;
  moderation_status?: string;
  profiles?: {
    full_name: string;
  } | null;
}

// Mock questions for prototype
const mockQuestions: Question[] = [
  {
    id: 'q-1',
    title: 'Best SIP for beginners?',
    content: 'I am new to mutual funds. Which SIP should I start with for long-term wealth creation?',
    category: 'Investment',
    expert_only: false,
    is_answered: true,
    status: 'answered',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    user_id: 'user-1',
    profiles: { full_name: 'Rahul Sharma' }
  },
  {
    id: 'q-2',
    title: 'How to calculate SIP returns?',
    content: 'Can someone explain how SIP returns are calculated? I want to understand XIRR.',
    category: 'Education',
    expert_only: false,
    is_answered: false,
    status: 'pending',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    user_id: 'user-2',
    profiles: { full_name: 'Priya Patel' }
  },
  {
    id: 'q-3',
    title: 'Tax benefits on ELSS funds',
    content: 'What are the tax benefits of investing in ELSS funds under Section 80C?',
    category: 'Tax',
    expert_only: true,
    is_answered: true,
    status: 'answered',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    user_id: 'user-3',
    profiles: { full_name: 'Amit Kumar' }
  }
];

// Mock blog posts for prototype
const mockBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 Reasons to Start SIP Today',
    content: 'Systematic Investment Plans (SIPs) are one of the best ways to build wealth...',
    status: 'published',
    category: 'Investment Tips',
    views_count: 1250,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    published_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    author_id: 'author-1',
    moderation_status: 'approved',
    profiles: { full_name: 'Investment Expert' }
  },
  {
    id: 'blog-2',
    title: 'Understanding Mutual Fund Categories',
    content: 'Mutual funds are categorized based on their investment objectives...',
    status: 'draft',
    category: 'Education',
    views_count: 0,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    published_at: '',
    author_id: 'author-2',
    moderation_status: 'pending',
    profiles: { full_name: 'Financial Analyst' }
  }
];

export const useCommunityData = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newQuestionsCount, setNewQuestionsCount] = useState(0);
  const [pendingBlogsCount, setPendingBlogsCount] = useState(0);

  const fetchCommunityData = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));

      setQuestions(mockQuestions);
      setBlogs(mockBlogs);

      // Count new/unanswered questions
      const unansweredCount = mockQuestions.filter(q => !q.is_answered).length;
      setNewQuestionsCount(unansweredCount);

      // Count pending blogs
      const pendingCount = mockBlogs.filter(b => b.moderation_status === 'pending').length;
      setPendingBlogsCount(pendingCount);
    } catch (error) {
      console.error('Error fetching community data:', error);
      toast.error('Failed to load community data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityData();
  }, []);

  return {
    questions,
    blogs,
    loading,
    newQuestionsCount,
    pendingBlogsCount,
    fetchCommunityData
  };
};
