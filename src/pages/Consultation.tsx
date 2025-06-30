import React, { useState } from 'react';

type FormFields = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const Consultation: React.FC = () => {
  const [form, setForm] = useState<FormFields>({ name: '', phone: '', email: '', message: '' });
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true });
    if (form.name && form.phone && form.email) {
      setSubmitted(true);
    }
  };

  const validateName = (name: string) => name.trim().length >= 2;
  const validatePhone = (phone: string) => /^((\+7|7|8)[\s-]?)?(\(?[489][0-9]{2}\)?[\s-]?)?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(phone.trim());
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isError = (field: keyof FormFields) => {
    if (!touched[field]) return false;
    if (field === 'name') return !validateName(form.name);
    if (field === 'phone') return !validatePhone(form.phone);
    if (field === 'email') return !validateEmail(form.email);
    return false;
  };

  const isFormValid = validateName(form.name) && validatePhone(form.phone) && validateEmail(form.email);

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Получить консультацию</h1>
      <p className="mb-6 text-gray-700">Заполните форму, и мы свяжемся с вами для консультации по вашему вопросу.</p>
      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">Спасибо! Ваша заявка отправлена.</div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium" htmlFor="name">Имя <span className="text-red-500">*</span></label>
            <input
              className={`w-full border rounded px-3 py-2 ${isError('name') ? 'border-red-500' : ''}`}
              id="name"
              name="name"
              type="text"
              placeholder="Ваше имя"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {isError('name') && <span className="text-red-500 text-sm">Имя должно содержать минимум 2 буквы</span>}
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="phone">Телефон <span className="text-red-500">*</span></label>
            <input
              className={`w-full border rounded px-3 py-2 ${isError('phone') ? 'border-red-500' : ''}`}
              id="phone"
              name="phone"
              type="tel"
              placeholder="Ваш телефон"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {isError('phone') && <span className="text-red-500 text-sm">Введите корректный номер телефона</span>}
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">Email <span className="text-red-500">*</span></label>
            <input
              className={`w-full border rounded px-3 py-2 ${isError('email') ? 'border-red-500' : ''}`}
              id="email"
              name="email"
              type="email"
              placeholder="Ваш email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {isError('email') && <span className="text-red-500 text-sm">Введите корректный email</span>}
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="message">Сообщение (необязательно)</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              id="message"
              name="message"
              placeholder="Ваше сообщение"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50" type="submit" disabled={!isFormValid}>Отправить</button>
        </form>
      )}
    </div>
  );
};

export default Consultation; 