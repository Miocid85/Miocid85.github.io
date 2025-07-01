import React from 'react';
import { BuildingIcon, UsersIcon, AwardIcon, HeartIcon } from 'lucide-react';
export const About = () => {
  return <main className="flex-grow">
      <div className="bg-gray-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">О компании</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Ваш надежный партнер в мире отопительного оборудования с 2005 года
          </p>
          <p className="text-lg text-center max-w-3xl mx-auto mt-4 text-sky-700">
            Мы не только поставщики оборудования, но можем спроектировать любые инженерные системы. И работаем с клиентами: розница, сотрудничество с монтажниками, оптовая торговля.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Наша история</h2>
            <p className="text-gray-600 mb-4">
              КубСантехОпт начал свой путь в 2005 году в городе Краснодаре.
              Основатели компании поставили перед собой цель - обеспечить
              жителей Краснодарского края качественным отопительным
              оборудованием по доступным ценам.
            </p>
            <p className="text-gray-600">
              За годы работы мы выросли из небольшого магазина в одного из
              крупнейших поставщиков отопительного оборудования в южном регионе
              России, но наши ценности остались неизменными - качество,
              надежность и забота о каждом клиенте.
            </p>
          </div>
          <div className="relative h-80">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Офис компании КубСантехОпт" className="rounded-lg shadow-lg w-full h-full object-cover" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <BuildingIcon size={40} className="mx-auto mb-4 text-sky-500" />
            <h3 className="text-xl font-bold mb-2">Основано в Краснодаре</h3>
            <p className="text-gray-600">
              Глубокое понимание местного рынка и потребностей клиентов
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <UsersIcon size={40} className="mx-auto mb-4 text-sky-500" />
            <h3 className="text-xl font-bold mb-2">5000+ клиентов</h3>
            <p className="text-gray-600">
              Доверие и признание наших заказчиков
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <AwardIcon size={40} className="mx-auto mb-4 text-sky-500" />
            <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
            <p className="text-gray-600">
              Только проверенные производители и поставщики
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <HeartIcon size={40} className="mx-auto mb-4 text-sky-500" />
            <h3 className="text-xl font-bold mb-2">Забота о людях</h3>
            <p className="text-gray-600">
              Индивидуальный подход к каждому клиенту
            </p>
          </div>
        </div>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
          <p className="text-gray-600 mb-8">
            Мы стремимся создавать комфорт в каждом доме, предоставляя
            качественное отопительное оборудование и профессиональную поддержку
            нашим клиентам. Наша команда постоянно развивается, изучает новые
            технологии и тренды в области отопительных систем, чтобы предложить
            вам лучшие решения для вашего дома или бизнеса.
          </p>
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-8 rounded-md transition">
            Свяжитесь с нами
          </button>
        </div>
      </div>
    </main>;
};