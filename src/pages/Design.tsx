import { useState } from 'react';
import { 
  FileText, 
  Calculator, 
  Settings, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Award, 
  Users, 
  Zap,
  Home,
  Building,
  Factory,
  Thermometer,
  Droplets,
  Wrench
} from 'lucide-react';

interface DesignService {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const designServices: DesignService[] = [
  {
    id: 1,
    title: 'Проектирование систем отопления',
    description: 'Полный комплекс проектных работ для создания эффективной системы отопления',
    icon: <Thermometer className="w-8 h-8" />,
    features: [
      'Расчет тепловых нагрузок',
      'Подбор отопительного оборудования',
      'Разработка схем разводки',
      'Автоматизация и управление',
      'Энергоэффективные решения'
    ],
    price: 'от 50.000₽'
  },
  {
    id: 2,
    title: 'Проектирование водоснабжения',
    description: 'Проектирование систем холодного и горячего водоснабжения',
    icon: <Droplets className="w-8 h-8" />,
    features: [
      'Расчет водопотребления',
      'Подбор насосного оборудования',
      'Проектирование водопроводных сетей',
      'Системы очистки воды',
      'Горячее водоснабжение'
    ],
    price: 'от 35.000₽'
  },
  {
    id: 3,
    title: 'Проектирование канализации',
    description: 'Разработка проектов внутренней и наружной канализации',
    icon: <Wrench className="w-8 h-8" />,
    features: [
      'Расчет стоков',
      'Проектирование канализационных сетей',
      'Очистные сооружения',
      'Наружные сети',
      'Внутренняя канализация'
    ],
    price: 'от 30.000₽'
  },
  {
    id: 4,
    title: 'Комплексное проектирование',
    description: 'Полный проект всех инженерных систем здания',
    icon: <FileText className="w-8 h-8" />,
    features: [
      'Все инженерные системы',
      'Координация между системами',
      'Энергоэффективность',
      'Согласование с надзорными органами',
      'Сопровождение строительства'
    ],
    price: 'от 150.000₽'
  }
];

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Консультация и обследование',
    description: 'Выезд специалиста на объект, изучение требований и технических условий',
    icon: <Users className="w-6 h-6" />
  },
  {
    step: 2,
    title: 'Техническое задание',
    description: 'Разработка технического задания с учетом всех пожеланий заказчика',
    icon: <FileText className="w-6 h-6" />
  },
  {
    step: 3,
    title: 'Предварительный расчет',
    description: 'Выполнение предварительных расчетов и подбор оборудования',
    icon: <Calculator className="w-6 h-6" />
  },
  {
    step: 4,
    title: 'Разработка проекта',
    description: 'Создание полного комплекта проектной документации',
    icon: <FileText className="w-6 h-6" />
  },
  {
    step: 5,
    title: 'Согласование',
    description: 'Согласование проекта с заказчиком и внесение корректировок',
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    step: 6,
    title: 'Сопровождение',
    description: 'Техническое сопровождение строительства и монтажа',
    icon: <Settings className="w-6 h-6" />
  }
];

const projectTypes = [
  {
    name: 'Частные дома',
    description: 'Проектирование для коттеджей и загородных домов',
    icon: <Home className="w-8 h-8" />
  },
  {
    name: 'Многоквартирные дома',
    description: 'Проектирование для жилых комплексов',
    icon: <Building className="w-8 h-8" />
  },
  {
    name: 'Коммерческие объекты',
    description: 'Офисы, магазины, рестораны',
    icon: <Building className="w-8 h-8" />
  },
  {
    name: 'Промышленные объекты',
    description: 'Заводы, склады, производственные цеха',
    icon: <Factory className="w-8 h-8" />
  }
];

export const Design = () => {
  const [selectedService, setSelectedService] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Проектирование инженерных систем
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Профессиональное проектирование систем отопления, водоснабжения и канализации 
            с учетом всех современных требований и стандартов
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Лицензированные проектировщики</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Соответствие СНиП и ГОСТ</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>Энергоэффективные решения</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Project Types */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Типы объектов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                  <div className="text-blue-600">{type.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Design Services */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Услуги проектирования</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {designServices.map((service, index) => (
              <div
                key={service.id}
                className={`bg-white rounded-lg shadow-md p-8 cursor-pointer transition-all duration-300 ${
                  selectedService === index
                    ? 'ring-2 ring-blue-500 transform scale-105'
                    : 'hover:shadow-lg hover:transform hover:scale-105'
                }`}
                onClick={() => setSelectedService(index)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                    <div className="text-blue-600">{service.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-blue-600">Что входит в услугу:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{service.price}</div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition">
                    Заказать проект
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Этапы работы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                    <div className="text-blue-600">{step.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">Шаг {step.step}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-blue-200"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Опыт и квалификация</h3>
                <p className="text-gray-600">Более 10 лет опыта в проектировании инженерных систем</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Полная документация</h3>
                <p className="text-gray-600">Разработка полного комплекта проектной документации</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto">
                  <Settings className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Сопровождение</h3>
                <p className="text-gray-600">Техническое сопровождение на всех этапах реализации</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Заказать проектирование</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Свяжитесь с нами</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">Телефон</div>
                      <a href="tel:+79182393722" className="hover:underline">
                        +7 (918) 239-37-22
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <a href="mailto:info@kub-opt.com" className="hover:underline">
                        info@kub-opt.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">Адрес</div>
                      <div>Г. Краснодар, ул. Аэродромная, д. 21</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Время работы</h3>
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
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Бесплатная консультация:</strong> Первичная консультация и выезд на объект бесплатно.
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
              <h3 className="text-lg font-semibold mb-2">Сколько времени занимает разработка проекта?</h3>
              <p className="text-gray-600">Сроки зависят от сложности объекта. Простой проект - 2-3 недели, сложный - 1-2 месяца.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Нужно ли согласовывать проект с надзорными органами?</h3>
              <p className="text-gray-600">Да, мы помогаем согласовать проект со всеми необходимыми инстанциями.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Предоставляете ли вы сопровождение строительства?</h3>
              <p className="text-gray-600">Да, мы осуществляем техническое сопровождение на всех этапах строительства.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Можно ли внести изменения в проект после его разработки?</h3>
              <p className="text-gray-600">Да, мы вносим корректировки в проект в рамках разумных изменений.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}; 