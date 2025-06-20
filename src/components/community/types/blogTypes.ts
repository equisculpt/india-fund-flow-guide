
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  category: string;
  tags: string[];
  views_count: number;
  published_at: string;
  created_at: string;
  author_id: string;
  moderation_status: string;
  edited_by_admin: boolean;
  admin_edited_title: string | null;
  admin_edited_content: string | null;
  profiles?: {
    full_name: string;
  } | null;
}

export interface StaticBlog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  route: string;
  published_at: string;
  author: string;
  featured_image_url?: string;
}

export interface BlogWithType extends BlogPost {
  type: 'dynamic';
}

export interface StaticBlogWithType extends StaticBlog {
  type: 'static';
}

export type CombinedBlog = BlogWithType | StaticBlogWithType;

export interface Category {
  value: string;
  label: string;
}
