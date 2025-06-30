import React from 'react';
import { ShoppingCartIcon } from 'lucide-react';
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
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
          <span className="font-bold text-lg">
            {product.price.toLocaleString()} ₽
          </span>
          <button className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-full">
            <ShoppingCartIcon size={18} />
          </button>
        </div>
      </div>
    </div>;
};