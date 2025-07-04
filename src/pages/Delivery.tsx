import React from 'react';

const Delivery: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Доставка</h1>
      <p className="mb-2">Мы осуществляем доставку по всей России.</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Курьерская доставка по Москве — 500₽</li>
        <li>Почта России — 300₽</li>
        <li>Самовывоз — бесплатно</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">Сроки доставки</h2>
      <p className="mb-2">Москва: 1-2 дня</p>
      <p className="mb-2">Регионы: 3-7 дней</p>
      <h2 className="text-xl font-semibold mb-2 mt-4">Оплата</h2>
      <p>Вы можете оплатить заказ наличными при получении или онлайн на сайте.</p>
      <h2 className="text-xl font-semibold mb-2 mt-4">Условия доставки</h2>
      <p className="mb-2">
        Осуществляем доставку по Краснодарскому краю при покупке от 10 тыс руб. Доставка по г. Краснодар — бесплатно. Другие регионы — стоимость доставки уточнять у менеджеров отдела продаж, по номеру телефона +7(918)239-37-22.
      </p>
    </div>
  );
};

export default Delivery; 