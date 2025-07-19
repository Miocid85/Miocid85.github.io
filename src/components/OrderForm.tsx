import React, { useState } from 'react';
import { use1COrder, use1CCustomer } from '../hooks/use1CData';
import { Product } from './ProductCard';

interface OrderFormProps {
  products: Product[];
  onOrderComplete?: (orderId: string) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ products, onOrderComplete }) => {
  const [selectedProducts, setSelectedProducts] = useState<Array<{ product: Product; quantity: number }>>([]);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  const { createOrder, loading: orderLoading, error: orderError } = use1COrder();
  const { createCustomer, loading: customerLoading, error: customerError } = use1CCustomer();

  const addToOrder = (product: Product) => {
    const existing = selectedProducts.find(item => item.product.id === product.id);
    if (existing) {
      setSelectedProducts(prev => 
        prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedProducts(prev => [...prev, { product, quantity: 1 }]);
    }
  };

  const removeFromOrder = (productId: number) => {
    setSelectedProducts(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(productId);
      return;
    }
    
    setSelectedProducts(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalAmount = () => {
    return selectedProducts.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedProducts.length === 0) {
      alert('Пожалуйста, выберите товары для заказа');
      return;
    }

    try {
      // Create customer first
      const customer = await createCustomer({
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address
      });

      // Create order
      const order = await createOrder({
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        deliveryAddress: customer.address,
        items: selectedProducts.map(item => ({
          productId: item.product.id.toString(),
          quantity: item.quantity,
          price: item.product.price,
          total: item.product.price * item.quantity
        })),
        totalAmount: getTotalAmount()
      });

      setOrderId(order.id);
      setIsOrderComplete(true);
      
      if (onOrderComplete) {
        onOrderComplete(order.id);
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  if (isOrderComplete) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Заказ успешно создан!
        </h3>
        <p className="text-green-600 mb-4">
          Номер заказа: <span className="font-mono">{orderId}</span>
        </p>
        <p className="text-green-600">
          Мы свяжемся с вами в ближайшее время для подтверждения заказа.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Оформить заказ</h2>
      
      {(orderError || customerError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Ошибка: {orderError || customerError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Выберите товары</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {products.map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.price.toLocaleString()} ₽</p>
                  {product.stock !== undefined && (
                    <p className="text-xs text-gray-500">
                      В наличии: {product.stock} шт.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => addToOrder(product)}
                  disabled={!product.stock || product.stock <= 0}
                  className={`ml-3 px-3 py-1 rounded text-sm ${
                    product.stock && product.stock > 0
                      ? 'bg-sky-500 hover:bg-sky-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Добавить
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Ваш заказ</h3>
          
          {selectedProducts.length === 0 ? (
            <p className="text-gray-500">Товары не выбраны</p>
          ) : (
            <div className="space-y-3">
              {selectedProducts.map(item => (
                <div key={item.product.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">
                      {item.product.price.toLocaleString()} ₽ × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Итого:</span>
                  <span>{getTotalAmount().toLocaleString()} ₽</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold">Контактная информация</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Имя *</label>
            <input
              type="text"
              required
              value={customerData.name}
              onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Email *</label>
            <input
              type="email"
              required
              value={customerData.email}
              onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Телефон *</label>
            <input
              type="tel"
              required
              value={customerData.phone}
              onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Адрес доставки</label>
            <input
              type="text"
              value={customerData.address}
              onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={orderLoading || customerLoading || selectedProducts.length === 0}
          className={`w-full py-3 px-4 rounded font-medium transition ${
            orderLoading || customerLoading || selectedProducts.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-sky-500 hover:bg-sky-600 text-white'
          }`}
        >
          {orderLoading || customerLoading ? 'Создание заказа...' : 'Оформить заказ'}
        </button>
      </form>
    </div>
  );
}; 