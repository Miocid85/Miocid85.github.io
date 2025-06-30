import React from 'react';
import { CategoryNav } from './CategoryNav';
import { ProductCard, Product } from './ProductCard';
export const ProductSection = () => {
  // Mock product data
  const products: Product[] = [{
    id: 1,
    name: 'Трубы PEX-AL-PEX 16x2.0',
    description: 'Металлопластиковая труба для систем отопления и водоснабжения',
    price: 120,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Трубы и фитинги'
  }, {
    id: 2,
    name: 'Радиатор биметаллический Royal Thermo Revolution',
    description: 'Биметаллический радиатор, 10 секций, боковое подключение',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1509599589979-3b5a15d2816e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Радиаторы'
  }, {
    id: 3,
    name: 'Комплект теплого пола Thermomat',
    description: 'Электрический теплый пол, мощность 150 Вт/м², 3 м²',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Теплые полы'
  }, {
    id: 4,
    name: 'Газовый котел Bosch Gaz 6000 W',
    description: 'Настенный газовый котел, 24 кВт, двухконтурный',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Котлы'
  }, {
    id: 5,
    name: 'Циркуляционный насос Grundfos UPS 25-40',
    description: 'Циркуляционный насос для систем отопления, 3 скорости',
    price: 5800,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Насосы'
  }, {
    id: 6,
    name: 'Водонагреватель Thermex IF 50 V',
    description: 'Электрический накопительный водонагреватель, 50 л',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1607149882246-c7339f004583?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Водонагреватели'
  }, {
    id: 7,
    name: 'Коллекторный шкаф встраиваемый VALTEC',
    description: 'Шкаф коллекторный для систем теплого пола, 6-8 выходов',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Комплектующие'
  }, {
    id: 8,
    name: 'Фитинги для металлопластиковых труб',
    description: 'Комплект фитингов для соединения металлопластиковых труб',
    price: 450,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Трубы и фитинги'
  }];
  return <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Наши товары</h2>
        <CategoryNav />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
        <div className="mt-10 text-center">
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded-md">
            Показать больше товаров
          </button>
        </div>
      </div>
    </section>;
};