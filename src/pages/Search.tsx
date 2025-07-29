import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SearchIcon, PackageIcon, FileTextIcon } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, loading } = useSearch(query);
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      image: product.image || 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      stock: 999 // Default stock for search results
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Результаты поиска
          </h1>
          {query && (
            <p className="text-gray-600">
              Поиск по запросу: <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Поиск...</span>
          </div>
        )}

        {/* No Results */}
        {!loading && results.length === 0 && query && (
          <div className="text-center py-12">
            <SearchIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ничего не найдено
            </h3>
            <p className="text-gray-600">
              Попробуйте изменить поисковый запрос или просмотрите наш каталог
            </p>
            <Link
              to="/"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="space-y-6">
            {/* Products */}
            {results.filter(r => r.type === 'product').length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <PackageIcon className="w-5 h-5 mr-2" />
                  Товары ({results.filter(r => r.type === 'product').length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {results
                    .filter(result => result.type === 'product')
                    .map((product) => (
                      <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Product Image */}
                        <div className="h-48 overflow-hidden bg-gray-100">
                          <img
                            src={product.image || 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          {product.category && (
                            <span className="inline-block text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-2">
                              {product.category}
                            </span>
                          )}
                          
                          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          
                          {product.description && (
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>
                          )}

                          <div className="flex justify-between items-center">
                            <span className="font-bold text-lg text-gray-900">
                              {product.price?.toLocaleString()} ₽
                            </span>
                            
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                              title="Добавить в корзину"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Pages */}
            {results.filter(r => r.type === 'page').length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2" />
                  Страницы ({results.filter(r => r.type === 'page').length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results
                    .filter(result => result.type === 'page')
                    .map((page) => (
                      <Link
                        key={page.id}
                        to={page.url || '/'}
                        className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {page.name}
                        </h3>
                        {page.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {page.description}
                          </p>
                        )}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !query && (
          <div className="text-center py-12">
            <SearchIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Введите поисковый запрос
            </h3>
            <p className="text-gray-600">
              Используйте поиск для нахождения товаров и страниц на сайте
            </p>
          </div>
        )}
      </div>
    </div>
  );
};