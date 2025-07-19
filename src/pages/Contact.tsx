import React, { useState } from 'react';
import { use1CCustomer } from '../hooks/use1CData';

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

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Связаться с нами</h1>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Контактная информация:</h2>
        <p className="mb-1">Телефон: +7(918)239-37-22</p>
        <p className="mb-1">Email: info@kub-opt.com</p>
        <p className="mb-1">Адрес: Г. Краснодар. ул, Аэродромная, Д. 21</p>
      </div>

      {isSubmitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Ошибка: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">Имя *</label>
          <input 
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" 
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
          <label className="block mb-1 font-medium" htmlFor="email">Email *</label>
          <input 
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" 
            id="email" 
            name="email"
            type="email" 
            placeholder="Ваш email" 
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium" htmlFor="phone">Телефон *</label>
          <input 
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" 
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
          <label className="block mb-1 font-medium" htmlFor="company">Компания</label>
          <input 
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" 
            id="company" 
            name="company"
            type="text" 
            placeholder="Название компании (необязательно)" 
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium" htmlFor="message">Сообщение</label>
          <textarea 
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" 
            id="message" 
            name="message"
            rows={4}
            placeholder="Ваше сообщение или вопрос" 
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>
        
        <button 
          className={`w-full py-3 px-4 rounded font-medium transition ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-sky-500 hover:bg-sky-600 text-white'
          }`} 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Отправка...' : 'Отправить сообщение'}
        </button>
      </form>
    </div>
  );
};

export default Contact; 