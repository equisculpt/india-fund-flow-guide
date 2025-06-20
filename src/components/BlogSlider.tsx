
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogSlider = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const blogs = [
    {
      title: "Why Regular Mutual Fund Plans Can Outperform Direct",
      highlight: "Professional guidance adds 3-4% annual value",
      description: "Evidence-based research showing how regular plans deliver better outcomes",
      url: "/blog/why-regular-mutual-funds-make-sense",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "What Are Mutual Funds? Complete Beginner's Guide",
      highlight: "Start investing with just ₹500",
      description: "Everything you need to know about mutual fund investing",
      url: "/blog/what-are-mutual-funds-complete-guide",
      color: "from-green-500 to-blue-600"
    },
    {
      title: "How Mutual Funds Work - Step by Step Explanation",
      highlight: "Understand the investment process",
      description: "Learn how your money grows through professional fund management",
      url: "/blog/how-mutual-funds-work-detailed-explanation",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Top 10 Benefits of Mutual Fund Investment in India",
      highlight: "Discover key advantages",
      description: "Why mutual funds are perfect for Indian investors",
      url: "/blog/mutual-funds-benefits-individual-investors",
      color: "from-orange-500 to-red-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  const handleSlideClick = (url: string) => {
    navigate(url);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-gray-700">Investment Education</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="h-8 w-8 p-0 hover:bg-blue-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="h-8 w-8 p-0 hover:bg-blue-100"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden h-48">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out cursor-pointer ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
            onClick={() => handleSlideClick(blog.url)}
          >
            <div className={`bg-gradient-to-r ${blog.color} text-white p-6 rounded-lg h-full flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300`}>
              <div>
                <h3 className="font-bold text-xl mb-3 line-clamp-2">{blog.title}</h3>
                <p className="text-sm opacity-90 mb-2 font-medium">{blog.highlight}</p>
                <p className="text-sm opacity-75">{blog.description}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(blog.url);
                  }}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white border text-sm px-4 py-2"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Read Article
                </Button>
                <span className="text-xs opacity-75">Click anywhere to read →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {blogs.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSlider;
