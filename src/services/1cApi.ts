// 1C API Integration Service
export interface Product1C {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  sku: string;
  unit: string;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
}

export interface Order1C {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveryAddress?: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Customer1C {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  company?: string;
}

// Define interface for 1C API service
interface IOneCApiService {
  getProducts(category?: string, limit?: number): Promise<Product1C[]>;
  getProduct(id: string): Promise<Product1C>;
  getProductStock(id: string): Promise<number>;
  createOrder(orderData: Omit<Order1C, 'id' | 'status' | 'createdAt'>): Promise<Order1C>;
  getOrder(id: string): Promise<Order1C>;
  updateOrderStatus(id: string, status: Order1C['status']): Promise<Order1C>;
  createCustomer(customerData: Omit<Customer1C, 'id'>): Promise<Customer1C>;
  getCustomer(id: string): Promise<Customer1C>;
  findCustomerByEmail(email: string): Promise<Customer1C | null>;
  updateStock(productId: string, quantity: number): Promise<void>;
  getPrices(productIds: string[]): Promise<Record<string, number>>;
  getCategories(): Promise<string[]>;
}

class OneCApiService implements IOneCApiService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    // Configure these values based on your 1C setup
    this.baseUrl = process.env.REACT_APP_1C_BASE_URL || 'http://your-1c-server:port';
    this.apiKey = process.env.REACT_APP_1C_API_KEY || '';
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`1C API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Product Management
  async getProducts(category?: string, limit?: number): Promise<Product1C[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (limit) params.append('limit', limit.toString());

    return this.makeRequest(`/products?${params.toString()}`);
  }

  async getProduct(id: string): Promise<Product1C> {
    return this.makeRequest(`/products/${id}`);
  }

  async getProductStock(id: string): Promise<number> {
    const result = await this.makeRequest(`/products/${id}/stock`);
    return result.stock;
  }

  // Order Management
  async createOrder(order: Omit<Order1C, 'id' | 'status' | 'createdAt'>): Promise<Order1C> {
    return this.makeRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async getOrder(id: string): Promise<Order1C> {
    return this.makeRequest(`/orders/${id}`);
  }

  async updateOrderStatus(id: string, status: Order1C['status']): Promise<Order1C> {
    return this.makeRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Customer Management
  async createCustomer(customer: Omit<Customer1C, 'id'>): Promise<Customer1C> {
    return this.makeRequest('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  }

  async getCustomer(id: string): Promise<Customer1C> {
    return this.makeRequest(`/customers/${id}`);
  }

  async findCustomerByEmail(email: string): Promise<Customer1C | null> {
    try {
      return await this.makeRequest(`/customers/search?email=${encodeURIComponent(email)}`);
    } catch (error) {
      return null;
    }
  }

  // Inventory Management
  async updateStock(productId: string, quantity: number): Promise<void> {
    await this.makeRequest(`/products/${productId}/stock`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  // Price Management
  async getPrices(productIds: string[]): Promise<Record<string, number>> {
    return this.makeRequest('/prices', {
      method: 'POST',
      body: JSON.stringify({ productIds }),
    });
  }

  // Categories
  async getCategories(): Promise<string[]> {
    return this.makeRequest('/categories');
  }
}

// Export the interface
export type { IOneCApiService };

// Create the appropriate service instance
const isMockMode = process.env.REACT_APP_ENABLE_1C_MOCK === 'true';

export const oneCApi: IOneCApiService = isMockMode 
  ? new (require('./1cMockApi').OneCMockApiService)()
  : new OneCApiService(); 