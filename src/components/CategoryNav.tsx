import React from 'react';
export const CategoryNav = () => {
  const categories = ['Все товары', 'Трубы и фитинги', 'Радиаторы', 'Теплые полы', 'Котлы', 'Насосы', 'Водонагреватели', 'Комплектующие'];
  return <div className="bg-white py-4 mb-6 overflow-x-auto">
      <div className="container mx-auto px-4">
        <div className="flex space-x-6">
          {categories.map((category, index) => <button key={index} className={`whitespace-nowrap py-2 px-4 rounded-md text-sm font-medium transition ${index === 0 ? 'bg-sky-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
              {category}
            </button>)}
        </div>
      </div>
    </div>;
};