import React, { memo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const OptimizedImage = memo(({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false 
}: OptimizedImageProps) => {
  const loading = priority ? 'eager' : 'lazy';
  const fetchPriority = priority ? 'high' : 'low';
  
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        objectFit: 'cover',
        willChange: priority ? 'auto' : 'transform',
      }}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;