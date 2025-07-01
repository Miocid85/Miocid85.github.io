import React from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import logo from '../logo.png';

export const Footer = () => {
  return <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img src={logo} alt="КубСантехОпт логотип" className="h-10 w-10 object-contain" />
              <h3 className="text-xl font-bold text-white">КубСантехОпт</h3>
            </div>
            <p className="mb-4">
              Ваш надежный поставщик отопительного оборудования и сантехники с
              2005 года.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-500" title="Yandex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#FFCC00"/>
                  <path d="M12 6v12M12 6l4 7.5M12 6l-4 7.5" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
              <a href="#" className="hover:text-pink-500" title="TikTok">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17.5a3.5 3.5 0 1 1 3.5-3.5V7h2a3 3 0 0 0 3 3v2a5 5 0 0 1-5-5v7a1.5 1.5 0 1 0 1.5 1.5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="hover:text-blue-500" title="VK">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 8c.2 5.2 3.2 8 8 8h1v-2.5c2.2.2 3.8 1.3 4.5 2.5H20c-.7-1.7-2.5-3-4.2-3.3V13c1.7-.2 3.2-1.7 3.7-3.7h-2c-.5 1.2-1.7 2.2-3.5 2.2V6h-2v5.5c-1.8 0-3-1-3.5-2.2H4z" fill="#0077FF"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Каталог</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500">
                  Трубы и фитинги
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Радиаторы
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Теплые полы
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Котлы
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Насосы
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Водонагреватели
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <PhoneIcon size={18} className="mr-2 text-sky-400" />
                <span>+7 (800) 555-35-35</span>
              </li>
              <li className="flex items-center">
                <MailIcon size={18} className="mr-2 text-sky-400" />
                <span>info@kubsantehopt.ru</span>
              </li>
              <li className="flex items-start">
                <MapPinIcon size={18} className="mr-2 text-sky-400 mt-1" />
                <span>г. Краснодар, ул. Промышленная, 15</span>
              </li>
              <li className="flex items-center">
                <ClockIcon size={18} className="mr-2 text-sky-400" />
                <span>Пн-Пт: 9:00-18:00, Сб: 10:00-16:00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2023 КубСантехОпт. Все права защищены.</p>
        </div>
      </div>
    </footer>;
};