import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Связаться с нами</h1>
      <p className="mb-2">Телефон: +7 (999) 123-45-67</p>
      <p className="mb-2">Email: info@example.com</p>
      <p className="mb-2">Адрес: г. Москва, ул. Примерная, д. 1</p>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block mb-1" htmlFor="name">Имя</label>
          <input className="w-full border rounded px-3 py-2" id="name" type="text" placeholder="Ваше имя" />
        </div>
        <div>
          <label className="block mb-1" htmlFor="email">Email</label>
          <input className="w-full border rounded px-3 py-2" id="email" type="email" placeholder="Ваш email" />
        </div>
        <div>
          <label className="block mb-1" htmlFor="message">Сообщение</label>
          <textarea className="w-full border rounded px-3 py-2" id="message" placeholder="Ваше сообщение" />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default Contact; 