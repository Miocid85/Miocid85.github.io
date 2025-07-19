import React, { useState } from 'react';
import { Truck, MapPin, Clock, CreditCard, Phone, Mail, Package, CheckCircle } from 'lucide-react';

interface DeliveryZone {
  name: string;
  description: string;
  price: string;
  time: string;
  minOrder?: string;
  icon: React.ReactNode;
}

const deliveryZones: DeliveryZone[] = [
  {
    name: 'Краснодар',
    description: 'Бесплатная доставка по городу',
    price: 'Бесплатно',
    time: '1-2 дня',
    icon: <MapPin className="w-6 h-6" />
  },
  {
    name: 'Краснодарский край',
    description: 'Доставка по всему краю',
    price: 'Бесплатно от 10.000₽',
    time: '2-3 дня',
    minOrder: 'При заказе от 10.000₽',
    icon: <Truck className="w-6 h-6" />
  },
  {
    name: 'Южный федеральный округ',
    description: 'Доставка в соседние регионы',
    price: 'По договоренности',
    time: '3-7 дней',
    icon: <Package className="w-6 h-6" />
  },
  {
    name: 'По России',
    description: 'Доставка в любую точку России',
    price: 'По договоренности',
    time: '5-14 дней',
    icon: <Truck className="w-6 h-6" />
  }
];

const paymentMethods = [
  {
    name: 'Наличными при получении',
    description: 'Оплата курьеру при доставке',
    icon: <CreditCard className="w-6 h-6" />
  },
  {
    name: 'Банковской картой',
    description: 'Visa, MasterCard, МИР',
    icon: <CreditCard className="w-6 h-6" />
  },
  {
    name: 'Безналичный расчет',
    description: 'Для юридических лиц',
    icon: <CreditCard className="w-6 h-6" />
  },
  {
    name: 'Онлайн оплата',
    description: 'Через сайт или мобильное приложение',
    icon: <CreditCard className="w-6 h-6" />
  }
];

const Delivery: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Доставка отопительного оборудования
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Быстрая и надежная доставка по Краснодару, краю и всей России
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Бесплатная доставка по Краснодару</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Доставка в день заказа</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Гарантия сохранности груза</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Delivery Zones */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Зоны доставки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryZones.map((zone, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-300 ${
                  selectedZone === index
                    ? 'ring-2 ring-sky-500 transform scale-105'
                    : 'hover:shadow-lg hover:transform hover:scale-105'
                }`}
                onClick={() => setSelectedZone(index)}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-sky-100 rounded-full mb-4 mx-auto">
                  <div className="text-sky-600">{zone.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{zone.name}</h3>
                <p className="text-gray-600 text-center mb-4">{zone.description}</p>
                <div className="space-y-2 text-center">
                  <div className="text-2xl font-bold text-sky-600">{zone.price}</div>
                  <div className="flex items-center justify-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{zone.time}</span>
                  </div>
                  {zone.minOrder && (
                    <div className="text-sm text-gray-500">{zone.minOrder}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Zone Details */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Подробная информация о доставке в {deliveryZones[selectedZone].name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-sky-600">Условия доставки</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Доставка осуществляется в удобное для вас время</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Возможна доставка в выходные и праздничные дни</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Проверка товара при получении</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Помощь в разгрузке и заносе товара</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-sky-600">Что нужно для доставки</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Указать точный адрес доставки</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Подготовить место для разгрузки</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Иметь документы для оплаты</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Быть доступным по указанному телефону</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Способы оплаты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
                  <div className="text-green-600">{method.icon}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{method.name}</h3>
                <p className="text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Заказать доставку</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-sky-600">Свяжитесь с нами</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-sky-600" />
                    <div>
                      <div className="font-semibold">Телефон</div>
                      <a href="tel:+79182393722" className="text-sky-600 hover:underline">
                        +7 (918) 239-37-22
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-sky-600" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <a href="mailto:info@kub-opt.com" className="text-sky-600 hover:underline">
                        info@kub-opt.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-sky-600" />
                    <div>
                      <div className="font-semibold">Адрес</div>
                      <div>Г. Краснодар, ул. Аэродромная, д. 21</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-sky-600">Время работы</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Понедельник - Пятница:</span>
                    <span className="font-semibold">8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Суббота:</span>
                    <span className="font-semibold">9:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Воскресенье:</span>
                    <span className="font-semibold">10:00 - 14:00</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-sky-50 rounded-lg">
                  <p className="text-sm text-sky-800">
                    <strong>Важно:</strong> Доставка осуществляется в рабочие дни. 
                    Для срочной доставки свяжитесь с нами по телефону.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Можно ли заказать доставку в выходные?</h3>
              <p className="text-gray-600">Да, возможна доставка в выходные дни по предварительной договоренности.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Есть ли возможность самовывоза?</h3>
              <p className="text-gray-600">Да, вы можете забрать товар самостоятельно с нашего склада в Краснодаре.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Что делать, если товар поврежден при доставке?</h3>
              <p className="text-gray-600">При обнаружении повреждений откажитесь от приемки товара и свяжитесь с нами для решения вопроса.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Можно ли изменить адрес доставки после оформления заказа?</h3>
              <p className="text-gray-600">Да, но не позднее чем за 2 часа до планируемой доставки.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Delivery; 