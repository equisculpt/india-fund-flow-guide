
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { staticBlogs } from './data/staticBlogs';
import { useBlogs } from './hooks/useBlogs';
import { CombinedBlog } from './types/blogTypes';
import CategoryFilter from './components/CategoryFilter';
import BlogCard from './components/BlogCard';

const CommunityBlogs = () => {
  const [category, setCategory] = useState<string>('all');
  const navigate = useNavigate();
  const { blogs, loading } = useBlogs(category);

  const handleBlogClick = (blog: CombinedBlog) => {
    if (blog.type === 'static') {
      navigate((blog as any).route);
    } else {
      navigate(`/community/blog/${blog.id}`);
    }
  };

  // Filter static blogs based on category
  const filteredStaticBlogs = category === 'all' ? staticBlogs : staticBlogs.filter(blog => blog.category === category);

  // Combine and sort all blogs
  const allBlogs: CombinedBlog[] = [
    ...filteredStaticBlogs.map(blog => ({ ...blog, type: 'static' as const })),
    ...blogs.map(blog => ({ ...blog, type: 'dynamic' as const }))
  ].sort((a, b) => {
    const dateA = new Date(a.published_at || (a.type === 'dynamic' ? (a as any).created_at : a.published_at));
    const dateB = new Date(b.published_at || (b.type === 'dynamic' ? (b as any).created_at : b.published_at));
    return dateB.getTime() - dateA.getTime();
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CategoryFilter 
        category={category} 
        onCategoryChange={setCategory} 
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBlogs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No blog posts found for this category.</p>
          </div>
        ) : (
          allBlogs.map((blog) => (
            <BlogCard 
              key={blog.id}
              blog={blog}
              onBlogClick={handleBlogClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityBlogs;
