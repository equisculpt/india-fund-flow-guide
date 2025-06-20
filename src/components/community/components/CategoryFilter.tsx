
import React from 'react';
import { Button } from "@/components/ui/button";
import { categories } from '../data/blogCategories';

interface CategoryFilterProps {
  category: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ category, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((cat) => (
        <Button
          key={cat.value}
          variant={category === cat.value ? 'default' : 'outline'}
          onClick={() => onCategoryChange(cat.value)}
          size="sm"
        >
          {cat.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
