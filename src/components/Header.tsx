import React, { useState } from 'react';
import { ShoppingCartIcon, MenuIcon, SearchIcon, UserIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between md:justify-start">
          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
          {/* Logo - centered on mobile, left-aligned on desktop */}
          <div className="flex-1 flex justify-center md:justify-start items-center gap-3">
            <img src={logo} alt="КубСантехОпт логотип" className="h-24 w-24 object-contain" />
            <Link to="/" className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-700">КубСантехОпт</h1>
              <p className="text-xs text-gray-500">Отопительное оборудование</p>
            </Link>
          </div>
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 ml-12">
            <Link to="/" className="text-gray-700 hover:text-sky-500 font-medium">
              Каталог
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-sky-500 font-medium">
              О компании
            </Link>
            <Link to="/delivery" className="text-gray-700 hover:text-sky-500 font-medium">
              Доставка
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-sky-500 font-medium">
              Контакты
            </Link>
            <Link to="/design" className="text-gray-700 hover:text-sky-500 font-medium">
              Проектирование
            </Link>
          </nav>
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="p-1 hover:text-sky-500">
              <SearchIcon size={20} />
            </button>
            <button aria-label="Account" className="p-1 hover:text-sky-500">
              <UserIcon size={20} />
            </button>
            <button aria-label="Shopping cart" className="p-1 hover:text-sky-500 relative">
              <ShoppingCartIcon size={20} />
              <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && <div className="md:hidden mt-4 pb-2">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-sky-500 font-medium">
                Каталог
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-sky-500 font-medium">
                О компании
              </Link>
              <Link to="/delivery" className="text-gray-700 hover:text-sky-500 font-medium">
                Доставка
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-sky-500 font-medium">
                Контакты
              </Link>
              <Link to="/design" className="text-gray-700 hover:text-sky-500 font-medium">
                Проектирование
              </Link>
            </nav>
          </div>}
      </div>
    </header>;
};