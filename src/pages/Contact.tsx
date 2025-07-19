import React, { useState } from 'react';
import { use1CCustomer } from '../hooks/use1CData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  User,
  Building,
  MessageSquare
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { createCustomer, loading, error } = use1CCustomer();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create customer in 1C
      await createCustomer({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || undefined
      });
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (err) {
      console.error('Failed to submit contact form:', err);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Телефон',
      value: '+7(918)239-37-22',
      description: 'Звоните в любое время'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'info@kub-opt.com',
      description: 'Пишите нам'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Адрес',
      value: 'Г. Краснодар, ул. Аэродромная, д. 21',
      description: 'Приходите к нам'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Режим работы',
      value: 'Пн-Пт: 9:00-18:00',
      description: 'Сб-Вс: по договоренности'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')` 
          }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Свяжитесь с нами
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Готовы ответить на ваши вопросы и помочь с выбором оптимальных решений 
            для ваших инженерных систем
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Быстрый ответ</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Профессиональная консультация</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Бесплатная оценка</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Контактная информация</h2>
              <p className="text-lg text-gray-600 mb-8">
                Наши специалисты готовы помочь вам с любыми вопросами по проектированию 
                и монтажу инженерных систем. Свяжитесь с нами удобным для вас способом.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full flex-shrink-0">
                    <div className="text-blue-600">{info.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                    <p className="text-lg text-blue-600 font-medium mb-1">{info.value}</p>
                    <p className="text-gray-600">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-800 font-medium">Интерактивная карта</p>
                  <p className="text-blue-600 text-sm">Г. Краснодар, ул. Аэродромная, д. 21</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Отправить сообщение</h2>
              <p className="text-gray-600">
                Заполните форму ниже, и мы свяжемся с вами в ближайшее время
              </p>
            </div>

            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Сообщение отправлено!</p>
                  <p className="text-sm">Мы свяжемся с вами в ближайшее время.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Ошибка отправки</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-700" htmlFor="name">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      Имя *
                    </div>
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                    id="name" 
                    name="name"
                    type="text" 
                    placeholder="Ваше имя" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium text-gray-700" htmlFor="email">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email *
                    </div>
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="Ваш email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-700" htmlFor="phone">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      Телефон *
                    </div>
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                    id="phone" 
                    name="phone"
                    type="tel" 
                    placeholder="+7 (___) ___-__-__" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium text-gray-700" htmlFor="company">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      Компания
                    </div>
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                    id="company" 
                    name="company"
                    type="text" 
                    placeholder="Название компании" 
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-2 font-medium text-gray-700" htmlFor="message">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Сообщение
                  </div>
                </label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none" 
                  id="message" 
                  name="message"
                  rows={5}
                  placeholder="Опишите ваш проект или задайте вопрос..." 
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
              
              <button 
                className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`} 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Отправить сообщение
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Часто задаваемые вопросы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Сколько времени занимает проектирование?</h3>
              <p className="text-gray-600">В зависимости от сложности проекта: от 1-2 недель для простых систем до 1-2 месяцев для комплексных решений.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Какие документы нужны для начала работы?</h3>
              <p className="text-gray-600">Техническое задание, планировки помещений, данные о здании. Мы поможем составить полный список.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Работаете ли вы по всей России?</h3>
              <p className="text-gray-600">Основной регион работы - Краснодарский край, но рассматриваем проекты по всей России.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 