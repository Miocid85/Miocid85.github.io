import React, { useState } from 'react';
import { CategoryNav } from './CategoryNav';
import { ProductCard, Product } from './ProductCard';
import { use1CProducts, ProductXML } from '../hooks/use1CData';

export const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { products: products1C, loading, error, refetch } = use1CProducts(selectedCategory);

  // Convert XML products to local Product format with safety checks
  const products: Product[] = (products1C || []).map((product: ProductXML) => ({
    id: parseInt(product.id.replace(/\D/g, '') || '0'), // Extract numbers from ID
    name: product.name || 'Товар без названия',
    description: product.description || `${product.folder0 || ''} - ${product.folder1 || ''}`,
    price: product.price || 0,
    image: product.imageUrl || 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: product.folder0 || 'Без категории',
    stock: product.quantity || 0
  }));

  // Get unique categories for navigation with safety checks
  // Always include all categories, not just from filtered products
  const allCategories = Array.from(new Set((products1C || []).map(p => p.folder0).filter(Boolean)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Ошибка загрузки товаров</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={refetch}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Каталог товаров 5</h1>
          <p className="text-lg text-gray-600">Найдено товаров: {products.length}</p>
        </div>

        {/* Category Navigation */}
        <CategoryNav 
          categories={allCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Товары не найдены
            </h3>
            <p className="text-gray-500">
              {selectedCategory 
                ? `В категории "${selectedCategory}" товары не найдены`
                : 'Попробуйте выбрать другую категорию'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};