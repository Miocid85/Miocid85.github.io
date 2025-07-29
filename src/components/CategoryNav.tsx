import React, { useState } from 'react';

interface CategoryNavProps {
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ 
  categories = [], 
  selectedCategory = '', 
  onCategoryChange 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Add "Все товары" (All products) as the first option
  const allCategories = ['Все товары', ...categories];
  
  const handleCategoryClick = (category: string, index: number) => {
    setSelectedIndex(index);
    if (onCategoryChange) {
      // Convert "Все товары" to empty string for API
      const categoryForApi = category === 'Все товары' ? '' : category;
      onCategoryChange(categoryForApi);
    }
  };

  // Update selected index when selectedCategory changes
  React.useEffect(() => {
    const index = allCategories.findIndex(cat => 
      cat === 'Все товары' ? selectedCategory === '' : cat === selectedCategory
    );
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [selectedCategory, allCategories]);

  return (
    <div className="bg-white py-4 mb-6 overflow-x-auto shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex space-x-4">
          {allCategories.map((category, index) => (
            <button 
              key={index} 
              onClick={() => handleCategoryClick(category, index)}
              className={`whitespace-nowrap py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                index === selectedIndex 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};