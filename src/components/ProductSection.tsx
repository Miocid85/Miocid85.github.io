import React, { useState } from 'react';
import { CategoryNav } from './CategoryNav';
import { ProductCard, Product } from './ProductCard';
import { use1CProducts } from '../hooks/use1CData';

export const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { products: products1C, loading, error, refetch } = use1CProducts(selectedCategory, 20);

  // Convert 1C products to local Product format
  const products: Product[] = products1C.map(product => ({
    id: parseInt(product.id),
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.imageUrl || 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: product.category,
    stock: product.stock
  }));
  return <section id="products" className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Наши товары</h2>
        <CategoryNav onCategoryChange={setSelectedCategory} />
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
            <p className="mt-2 text-gray-600">Загрузка товаров...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Ошибка загрузки товаров: {error}</p>
            <button 
              onClick={refetch}
              className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded-md"
            >
              Попробовать снова
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
            <div className="mt-10 text-center">
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded-md">
                Показать больше товаров
              </button>
            </div>
          </>
        )}
      </div>
    </section>;
};