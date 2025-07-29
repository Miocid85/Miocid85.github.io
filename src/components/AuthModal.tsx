import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XIcon, UserIcon, LockIcon, MailIcon, PhoneIcon, BuildingIcon } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    sector: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};

    if (!loginData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email или номер телефона обязательны для заполнения';
    }

    if (!loginData.password.trim()) {
      newErrors.password = 'Пароль обязателен для заполнения';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignupForm = () => {
    const newErrors: Record<string, string> = {};

    if (!signupData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    }

    if (!signupData.surname.trim()) {
      newErrors.surname = 'Фамилия обязательна для заполнения';
    }

    if (!signupData.patronymic.trim()) {
      newErrors.patronymic = 'Отчество обязательно для заполнения';
    }

    if (!signupData.phone.trim()) {
      newErrors.phone = 'Номер телефона обязателен для заполнения';
    }

    if (!signupData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!signupData.password.trim()) {
      newErrors.password = 'Пароль обязателен для заполнения';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (!signupData.sector) {
      newErrors.sector = 'Выберите сектор';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful login
      const mockUser = {
        id: '1',
        name: 'Иван',
        surname: 'Иванов',
        patronymic: 'Иванович',
        email: loginData.emailOrPhone.includes('@') ? loginData.emailOrPhone : 'user@example.com',
        phone: loginData.emailOrPhone.includes('@') ? '+7 (999) 123-45-67' : loginData.emailOrPhone,
        sector: 'Частники'
      };
      
      // Store user data (in real app, this would come from your auth system)
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      onSuccess();
      onClose();
    }, 2000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignupForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate signup API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful signup
      const mockUser = {
        id: '1',
        name: signupData.name,
        surname: signupData.surname,
        patronymic: signupData.patronymic,
        email: signupData.email,
        phone: signupData.phone,
        sector: signupData.sector
      };
      
      // Store user data (in real app, this would come from your auth system)
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      onSuccess();
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, form: 'login' | 'signup') => {
    const { name, value } = e.target;
    
    if (form === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setSignupData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XIcon size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isLogin ? (
              /* Login Form */
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email или номер телефона
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="emailOrPhone"
                      value={loginData.emailOrPhone}
                      onChange={(e) => handleChange(e, 'login')}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.emailOrPhone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="example@email.com или +7 (999) 123-45-67"
                    />
                  </div>
                  {errors.emailOrPhone && (
                    <p className="mt-1 text-sm text-red-600">{errors.emailOrPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Пароль
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={(e) => handleChange(e, 'login')}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Введите ваш пароль"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Вход...
                    </div>
                  ) : (
                    'Войти'
                  )}
                </button>
              </form>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={signupData.name}
                      onChange={(e) => handleChange(e, 'signup')}
                      className={`block w-full px-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Иван"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фамилия *
                    </label>
                    <input
                      type="text"
                      name="surname"
                      value={signupData.surname}
                      onChange={(e) => handleChange(e, 'signup')}
                      className={`block w-full px-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.surname ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Иванов"
                    />
                    {errors.surname && (
                      <p className="mt-1 text-sm text-red-600">{errors.surname}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Отчество *
                    </label>
                    <input
                      type="text"
                      name="patronymic"
                      value={signupData.patronymic}
                      onChange={(e) => handleChange(e, 'signup')}
                      className={`block w-full px-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.patronymic ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Иванович"
                    />
                    {errors.patronymic && (
                      <p className="mt-1 text-sm text-red-600">{errors.patronymic}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Номер телефона *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={signupData.phone}
                      onChange={(e) => handleChange(e, 'signup')}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={signupData.email}
                      onChange={(e) => handleChange(e, 'signup')}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="example@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сектор *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="sector"
                      value={signupData.sector}
                      onChange={(e) => handleChange(e, 'signup')}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.sector ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Выберите сектор</option>
                      <option value="Монтажники">Монтажники</option>
                      <option value="Опт">Опт</option>
                      <option value="Частники">Частники</option>
                    </select>
                  </div>
                  {errors.sector && (
                    <p className="mt-1 text-sm text-red-600">{errors.sector}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Пароль *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={signupData.password}
                        onChange={(e) => handleChange(e, 'signup')}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.password ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Минимум 6 символов"
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Подтвердите пароль *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={(e) => handleChange(e, 'signup')}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Повторите пароль"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Регистрация...
                    </div>
                  ) : (
                    'Зарегистрироваться'
                  )}
                </button>
              </form>
            )}

            {/* Toggle between login and signup */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};