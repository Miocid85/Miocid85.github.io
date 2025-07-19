// Mock 1C API Service for Development
import { Product1C, Order1C, Customer1C } from './1cApi';
import type { IOneCApiService } from './1cApi';

// Mock data
const mockProducts: Product1C[] = [
  {
    id: '1',
    name: 'Трубы PEX-AL-PEX 16x2.0',
    description: 'Металлопластиковая труба для систем отопления и водоснабжения',
    price: 120,
    stock: 150,
    category: 'Трубы и фитинги',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    sku: 'PEX-16-2.0',
    unit: 'м'
  },
  {
    id: '2',
    name: 'Радиатор биметаллический Royal Thermo Revolution',
    description: 'Биметаллический радиатор, 10 секций, боковое подключение',
    price: 9500,
    stock: 25,
    category: 'Радиаторы',
    imageUrl: 'https://images.unsplash.com/photo-1509599589979-3b5a15d2816e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    sku: 'RT-REV-10',
    unit: 'шт'
  },
  {
    id: '3',
    name: 'Комплект теплого пола Thermomat',
    description: 'Электрический теплый пол, мощность 150 Вт/м², 3 м²',
    price: 4200,
    stock: 0,
    category: 'Теплые полы',
    imageUrl: 'https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    sku: 'TM-150-3',
    unit: 'компл'
  },
  {
    id: '4',
    name: 'Газовый котел Bosch Gaz 6000 W',
    description: 'Настенный газовый котел, 24 кВт, двухконтурный',
    price: 42000,
    stock: 8,
    category: 'Котлы',
    imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    sku: 'BOSCH-6000-24',
    unit: 'шт'
  },
  {
    id: '5',
    name: 'Циркуляционный насос Grundfos UPS 25-40',
    description: 'Циркуляционный насос для систем отопления, 3 скорости',
    price: 5800,
    stock: 45,
    category: 'Насосы',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    sku: 'GRUNDFOS-UPS-25-40',
    unit: 'шт'
  },
  {
    id: '6',
    name: 'Водонагреватель Thermex IF 50 V',
    description: 'Электрический накопительный водонагреватель, 50 л',
    price: 12500,
    stock: 12,
    category: 'Водонагреватели',
    imageUrl: 'https://images.unsplash.com/photo-1607149882246-c7339f004583?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    sku: 'THERMEX-IF-50V',
    unit: 'шт'
  }
];

const mockCustomers: Customer1C[] = [];
const mockOrders: Order1C[] = [];

class OneCMockApiService implements IOneCApiService {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Product Management
  async getProducts(category?: string, limit?: number): Promise<Product1C[]> {
    await this.delay();
    
    let filteredProducts = mockProducts;
    
    if (category) {
      filteredProducts = mockProducts.filter(p => p.category === category);
    }
    
    if (limit) {
      filteredProducts = filteredProducts.slice(0, limit);
    }
    
    return filteredProducts;
  }

  async getProduct(id: string): Promise<Product1C> {
    await this.delay();
    
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  }

  async getProductStock(id: string): Promise<number> {
    await this.delay();
    
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product.stock;
  }

  // Order Management
  async createOrder(orderData: Omit<Order1C, 'id' | 'status' | 'createdAt'>): Promise<Order1C> {
    await this.delay();
    
    const newOrder: Order1C = {
      id: `order_${Date.now()}`,
      ...orderData,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    
    mockOrders.push(newOrder);
    
    // Update stock levels
    for (const item of orderData.items) {
      const product = mockProducts.find(p => p.id === item.productId);
      if (product && product.stock >= item.quantity) {
        product.stock -= item.quantity;
      }
    }
    
    return newOrder;
  }

  async getOrder(id: string): Promise<Order1C> {
    await this.delay();
    
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    
    return order;
  }

  async updateOrderStatus(id: string, status: Order1C['status']): Promise<Order1C> {
    await this.delay();
    
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    
    order.status = status;
    return order;
  }

  // Customer Management
  async createCustomer(customerData: Omit<Customer1C, 'id'>): Promise<Customer1C> {
    await this.delay();
    
    const newCustomer: Customer1C = {
      id: `customer_${Date.now()}`,
      ...customerData
    };
    
    mockCustomers.push(newCustomer);
    return newCustomer;
  }

  async getCustomer(id: string): Promise<Customer1C> {
    await this.delay();
    
    const customer = mockCustomers.find(c => c.id === id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    
    return customer;
  }

  async findCustomerByEmail(email: string): Promise<Customer1C | null> {
    await this.delay();
    
    const customer = mockCustomers.find(c => c.email === email);
    return customer || null;
  }

  // Inventory Management
  async updateStock(productId: string, quantity: number): Promise<void> {
    await this.delay();
    
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    product.stock = quantity;
  }

  // Price Management
  async getPrices(productIds: string[]): Promise<Record<string, number>> {
    await this.delay();
    
    const prices: Record<string, number> = {};
    
    for (const id of productIds) {
      const product = mockProducts.find(p => p.id === id);
      if (product) {
        prices[id] = product.price;
      }
    }
    
    return prices;
  }

  // Categories
  async getCategories(): Promise<string[]> {
    await this.delay();
    
    const categories = [...new Set(mockProducts.map(p => p.category))];
    return categories;
  }
}

export const oneCMockApi = new OneCMockApiService(); 