import React from 'react';
import { Link } from 'react-router-dom';

"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

export const Hero = () => {
  return <section className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Отопительное оборудование для вашего дома
            </h2>
            <p className="text-lg mb-6">
              Широкий выбор труб, радиаторов, теплых полов и комплектующих от
              ведущих производителей
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-gray-700 font-medium py-2 px-6 rounded-md hover:bg-gray-100 transition">
                Перейти в каталог
              </button>
              <Link to="/consultation" className="border border-white text-white font-medium py-2 px-6 rounded-md hover:bg-white/10 transition text-center flex items-center justify-center">
                Получить консультацию
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="https://komplekt.com.ua/published/publicdata/S55555CKOMPLEKT2011/attachments/SC/products_pictures/54326659_2zp.jpg" alt="Отопительное оборудование" className="rounded-lg shadow-lg max-h-96 object-cover mx-auto" />
          </div>
        </div>
      </div>
    </section>;
};