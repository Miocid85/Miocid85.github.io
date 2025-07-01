import React from 'react';

export const Design = () => {
  return (
    <main className="flex-grow">
      <div className="bg-gray-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Проектирование</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Мы предлагаем профессиональные услуги по проектированию систем отопления, водоснабжения и других инженерных коммуникаций для вашего дома или бизнеса.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Наши услуги проектирования</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-8">
          <li>Индивидуальное проектирование систем отопления</li>
          <li>Проектирование водоснабжения и канализации</li>
          <li>Подбор оборудования и материалов</li>
          <li>Сопровождение и консультации на всех этапах</li>
        </ul>
        <div className="text-center">
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-8 rounded-md transition">
            Оставить заявку на проектирование
          </button>
        </div>
      </div>
    </main>
  );
}; 