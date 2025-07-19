import React from 'react';
import { 
  Building, 
  Users, 
  Award, 
  Heart, 
  CheckCircle, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Target,
  ArrowRight
} from 'lucide-react';

export const About = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "5000+",
      label: "Довольных клиентов",
      description: "Успешно реализованных проектов"
    },
    {
      icon: <Building className="w-8 h-8" />,
      number: "3+",
      label: "Года опыта",
      description: "Профессиональной работы"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "100%",
      label: "Гарантия качества",
      description: "На все поставляемое оборудование"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "24/7",
      label: "Поддержка",
      description: "Техническая консультация"
    }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Качество",
      description: "Работаем только с проверенными производителями и поставляем оборудование высочайшего качества"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Надежность",
      description: "Гарантируем надежность всех систем и предоставляем полную техническую поддержку"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Забота о клиентах",
      description: "Индивидуальный подход к каждому проекту и забота о комфорте наших клиентов"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Инновации",
      description: "Постоянно следим за новыми технологиями и предлагаем современные решения"
    }
  ];

  const testimonials = [
    {
      name: "Александр Петров",
      company: "ООО 'ТеплоСтрой'",
      text: "Отличное качество оборудования и профессиональная поддержка. Рекомендую всем!",
      rating: 5
    },
    {
      name: "Елена Смирнова",
      company: "Частный домовладелец",
      text: "Спасибо за качественное проектирование системы отопления. Все работает идеально!",
      rating: 5
    },
    {
      name: "Дмитрий Козлов",
      company: "Строительная компания",
      text: "Долгосрочное сотрудничество. Всегда качественно и в срок. Надежный партнер.",
      rating: 5
    }
  ];

  const team = [
    {
      name: "Команда проектировщиков",
      description: "Опытные инженеры с многолетним стажем в проектировании инженерных систем",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Техническая поддержка",
      description: "Специалисты готовы помочь с любыми вопросами по оборудованию и монтажу",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Служба доставки",
      description: "Быстрая и надежная доставка по всему Краснодарскому краю",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
            О компании КубСанТехОпт
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Ваш надежный партнер в мире отопительного оборудования и инженерных систем 
            с 2021 года. Качество, надежность и забота о каждом клиенте.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Лицензированная деятельность</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Опытная команда</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Гарантия качества</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Наша история</h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  КубСанТехОпт начал свой путь в 2021 году в городе Краснодаре. 
                  Основатели компании поставили перед собой амбициозную цель - обеспечить 
                  жителей Краснодарского края качественным отопительным оборудованием 
                  по доступным ценам.
                </p>
                <p>
                  За годы работы мы выросли из небольшого магазина в одного из 
                  крупнейших поставщиков отопительного оборудования в южном регионе России. 
                  Но наши ценности остались неизменными - качество, надежность и 
                  забота о каждом клиенте.
                </p>
                <p>
                  Сегодня мы не только поставщики оборудования, но и профессиональные 
                  проектировщики инженерных систем. Работаем с клиентами всех уровней: 
                  от розничных покупателей до крупных строительных компаний.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="h-96 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Офис компании КубСанТехОпт" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-6">
                <div className="text-3xl font-bold text-blue-600">2021</div>
                <div className="text-gray-600">Год основания</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши ценности</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Принципы, которые лежат в основе нашей работы и определяют 
              качество обслуживания клиентов
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                  <div className="text-blue-600">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наша команда</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Профессионалы с многолетним опытом в области инженерных систем
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Что говорят о нас наши довольные клиенты
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-blue-600 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Наша миссия</h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Мы стремимся создавать комфорт в каждом доме, предоставляя качественное 
              отопительное оборудование и профессиональную поддержку нашим клиентам. 
              Наша команда постоянно развивается, изучает новые технологии и тренды 
              в области отопительных систем, чтобы предложить вам лучшие решения 
              для вашего дома или бизнеса.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-lg transition flex items-center gap-2 mx-auto">
              Свяжитесь с нами
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Contact Info */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Готовы начать сотрудничество?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-md">
              <Phone className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-semibold">Телефон</div>
                <div className="text-blue-600">+7(918)239-37-22</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-md">
              <Mail className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-semibold">Email</div>
                <div className="text-blue-600">info@kub-opt.com</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-md">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-semibold">Адрес</div>
                <div className="text-blue-600">Г. Краснодар, ул. Аэродромная, д. 21</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};