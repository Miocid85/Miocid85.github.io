import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, TrashIcon, ArrowLeftIcon, PackageIcon, CheckCircleIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/AuthModal';
import { sendOrderNotification, Order } from '../services/emailService';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleCheckout = async () => {
    if (!isAuthenticated()) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!user) {
      alert('Ошибка: пользователь не найден');
      return;
    }

    setIsProcessingOrder(true);

    try {
      // Generate order ID
      const newOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setOrderId(newOrderId);

      // Create order object
      const order: Order = {
        id: newOrderId,
        user: {
          name: user.name,
          surname: user.surname,
          patronymic: user.patronymic,
          email: user.email,
          phone: user.phone,
          sector: user.sector
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: getTotalPrice(),
        orderDate: new Date().toLocaleString('ru-RU')
      };

      // Send email notifications
      await sendOrderNotification(order);

      // Clear cart after successful order
      clearCart();
      
      // Show success state
      setOrderSuccess(true);

    } catch (error) {
      console.error('Error processing order:', error);
      alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const handleAuthSuccess = () => {
    // After successful authentication, proceed with checkout
    handleCheckout();
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Заказ оформлен!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Номер заказа: <span className="font-semibold">{orderId}</span>
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800">
                Спасибо за ваш заказ! Мы отправили подтверждение на ваш email.
                Наш менеджер свяжется с вами в ближайшее время для уточнения деталей доставки.
              </p>
            </div>
            <div className="space-y-3">
              <Link
                to="/"
                className="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Вернуться к покупкам
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeftIcon size={20} className="mr-2" />
              Вернуться к покупкам
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Корзина
          </h1>
          <p className="text-gray-600">
            {getTotalItems()} товаров на сумму {getTotalPrice().toLocaleString('ru-RU')} ₽
          </p>
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-12">
            <ShoppingCartIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ваша корзина пуста
            </h2>
            <p className="text-gray-600 mb-6">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <PackageIcon size={20} className="mr-2" />
              Перейти в каталог
            </Link>
          </div>
        ) : (
          /* Cart Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Товары в корзине ({cartItems.length})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded-md object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Цена за единицу: {item.price.toLocaleString('ru-RU')} ₽
                          </p>
                          <p className="text-sm text-gray-500">
                            Доступно: {item.maxStock} шт.
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <span className="px-3 py-1 text-sm font-medium border-x border-gray-300">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity >= item.maxStock}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Удалить товар"
                          >
                            <TrashIcon size={20} />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Очистить корзину
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Итого заказа
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Товары ({getTotalItems()}):</span>
                    <span>{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Доставка:</span>
                    <span>Бесплатно</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Итого:</span>
                      <span>{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                {user && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-md">
                    <h3 className="text-sm font-medium text-blue-900 mb-2">
                      Данные для заказа
                    </h3>
                    <div className="text-xs text-blue-800 space-y-1">
                      <p><strong>Имя:</strong> {user.surname} {user.name} {user.patronymic}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Телефон:</strong> {user.phone}</p>
                      <p><strong>Сектор:</strong> {user.sector}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessingOrder}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {isProcessingOrder ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Оформление заказа...
                      </div>
                    ) : (
                      'Оформить заказ'
                    )}
                  </button>
                  
                  <Link
                    to="/"
                    className="block w-full text-center bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                  >
                    Продолжить покупки
                  </Link>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-md">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">
                    Информация о заказе
                  </h3>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Бесплатная доставка при заказе от 10,000 ₽</li>
                    <li>• Возврат товара в течение 14 дней</li>
                    <li>• Гарантия на все товары</li>
                    <li>• Оплата при получении</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Authentication Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </div>
    </div>
  );
};