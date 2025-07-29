import React from 'react';
import { ShoppingCartIcon, PackageIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock?: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const isInStock = product.stock && product.stock > 0;
  
  const handleAddToCart = () => {
    if (isInStock) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock || 0
      });
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        {/* Stock Badge */}
        {product.stock !== undefined && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
            isInStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isInStock ? `${product.stock} шт.` : 'Нет в наличии'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <span className="inline-block text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-2">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price and Action */}
        <div className="flex justify-between items-end">
          <div>
            <span className="font-bold text-lg text-gray-900">
              {product.price.toLocaleString()} ₽
            </span>
            {product.stock !== undefined && (
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <PackageIcon size={12} className="mr-1" />
                {isInStock ? 'В наличии' : 'Нет в наличии'}
              </div>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className={`p-3 rounded-full transition-all duration-200 ${
              isInStock 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!isInStock}
            title={isInStock ? 'Добавить в корзину' : 'Товар отсутствует'}
          >
            <ShoppingCartIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};