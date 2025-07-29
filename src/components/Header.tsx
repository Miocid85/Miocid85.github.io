import React, { useState } from 'react';
import { ShoppingCartIcon, MenuIcon, SearchIcon, UserIcon, XIcon, LogOutIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import logo from '../logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCart();
  const navigate = useNavigate();

  // Mock user state - replace with real authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    // Focus the search input after a short delay
    setTimeout(() => {
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between md:justify-start">
          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
          {/* Logo - centered on mobile, left-aligned on desktop */}
          <div className="flex-1 flex justify-center md:justify-start items-center gap-3">
            <img src={logo as string} alt="КубСантехОпт логотип" className="h-24 w-24 object-contain" />
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
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск товаров..."
                    className="w-64 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                  >
                    <SearchIcon size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <XIcon size={16} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={handleSearchClick}
                  aria-label="Search"
                  className="p-1 hover:text-sky-500"
                >
                  <SearchIcon size={20} />
                </button>
              )}
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="Account"
                className="p-1 hover:text-sky-500"
              >
                <UserIcon size={20} />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">Пользователь</p>
                        <p className="text-gray-500">user@example.com</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOutIcon size={16} className="mr-2" />
                        Выйти
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Войти
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Зарегистрироваться
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <button 
              onClick={toggleCart}
              aria-label="Shopping cart" 
              className="p-1 hover:text-sky-500 relative"
            >
              <ShoppingCartIcon size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
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
              <div className="border-t pt-3">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-sky-500 font-medium"
                  >
                    Выйти
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="block text-gray-700 hover:text-sky-500 font-medium mb-2">
                      Войти
                    </Link>
                    <Link to="/signup" className="block text-gray-700 hover:text-sky-500 font-medium">
                      Зарегистрироваться
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};