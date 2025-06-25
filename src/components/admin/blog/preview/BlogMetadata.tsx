
import React from 'react';

interface BlogMetadataProps {
  tags: string[];
  slug: string;
}

const BlogMetadata = ({ tags, slug }: BlogMetadataProps) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <p className="text-sm text-gray-500 mb-3 font-medium">Tags:</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
            #{tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        URL Slug: <code className="bg-gray-100 px-2 py-1 rounded font-mono text-xs">{slug}</code>
      </p>
    </div>
  );
};

export default BlogMetadata;
