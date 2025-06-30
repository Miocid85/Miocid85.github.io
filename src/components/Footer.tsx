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
              <a href="#" className="hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.5 12c0-5.799-4.701-10.5-10.5-10.5S1.5 6.201 1.5 12s4.701 10.5 10.5 10.5 10.5-4.701 10.5-10.5Z" />
                  <path d="M12 7.5v9" />
                  <path d="M7.5 12h9" />
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