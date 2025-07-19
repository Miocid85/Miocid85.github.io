import React from 'react';
import { ShoppingCartIcon } from 'lucide-react';
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
export const ProductCard: React.FC<ProductCardProps> = ({
  product
}) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-48 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <span className="text-xs text-gray-500">{product.category}</span>
        <h3 className="font-medium text-gray-900 mt-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="font-bold text-lg">
              {product.price.toLocaleString()} ₽
            </span>
            {product.stock !== undefined && (
              <div className="text-sm text-gray-500 mt-1">
                В наличии: {product.stock > 0 ? `${product.stock} шт.` : 'Нет в наличии'}
              </div>
            )}
          </div>
          <button 
            className={`p-2 rounded-full ${
              product.stock && product.stock > 0 
                ? 'bg-sky-500 hover:bg-sky-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!product.stock || product.stock <= 0}
          >
            <ShoppingCartIcon size={18} />
          </button>
        </div>
      </div>
    </div>;
};