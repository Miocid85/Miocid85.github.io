import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailIcon, LockIcon, PhoneIcon } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email или номер телефона обязательны для заполнения';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Пароль обязателен для заполнения';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically authenticate with your backend
      alert('Вход выполнен успешно!');
      navigate('/');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const isEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const getInputIcon = () => {
    return isEmail(formData.emailOrPhone) ? MailIcon : PhoneIcon;
  };

  const getInputType = () => {
    return isEmail(formData.emailOrPhone) ? 'email' : 'tel';
  };

  const getPlaceholder = () => {
    return isEmail(formData.emailOrPhone) ? 'example@email.com' : '+7 (999) 123-45-67';
  };

  const InputIcon = getInputIcon();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Вход в аккаунт
          </h2>
          <p className="text-gray-600">
            Войдите в свой аккаунт для доступа к каталогу товаров
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email or Phone */}
            <div>
              <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 mb-2">
                Email или номер телефона *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <InputIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="emailOrPhone"
                  name="emailOrPhone"
                  type={getInputType()}
                  required
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.emailOrPhone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={getPlaceholder()}
                />
              </div>
              {errors.emailOrPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.emailOrPhone}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Пароль *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Запомнить меня
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Забыли пароль?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Вход...
                  </div>
                ) : (
                  'Войти'
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Нет аккаунта?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};