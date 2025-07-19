import React, { useState } from 'react';

interface CategoryNavProps {
  onCategoryChange?: (category: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ onCategoryChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const categories = ['Все товары', 'Трубы и фитинги', 'Радиаторы', 'Теплые полы', 'Котлы', 'Насосы', 'Водонагреватели', 'Комплектующие'];
  
  const handleCategoryClick = (category: string, index: number) => {
    setSelectedIndex(index);
    if (onCategoryChange) {
      // Convert "Все товары" to empty string for API
      const categoryForApi = category === 'Все товары' ? '' : category;
      onCategoryChange(categoryForApi);
    }
  };

  return <div className="bg-white py-4 mb-6 overflow-x-auto">
      <div className="container mx-auto px-4">
        <div className="flex space-x-6">
          {categories.map((category, index) => (
            <button 
              key={index} 
              onClick={() => handleCategoryClick(category, index)}
              className={`whitespace-nowrap py-2 px-4 rounded-md text-sm font-medium transition ${
                index === selectedIndex ? 'bg-sky-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>;
};