import { useState, useEffect, useCallback } from 'react';
import { oneCApi, Product1C, Order1C, Customer1C } from '../services/1cApi';

export const use1CProducts = (category?: string, limit?: number) => {
  const [products, setProducts] = useState<Product1C[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await oneCApi.getProducts(category, limit);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};

export const use1CProduct = (id: string) => {
  const [product, setProduct] = useState<Product1C | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await oneCApi.getProduct(id);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
};

export const use1COrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(async (orderData: Omit<Order1C, 'id' | 'status' | 'createdAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const order = await oneCApi.createOrder(orderData);
      return order;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create order';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrder = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const order = await oneCApi.getOrder(id);
      return order;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch order';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { createOrder, getOrder, loading, error };
};

export const use1CCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCustomer = useCallback(async (customerData: Omit<Customer1C, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const customer = await oneCApi.createCustomer(customerData);
      return customer;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create customer';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const findCustomer = useCallback(async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      const customer = await oneCApi.findCustomerByEmail(email);
      return customer;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to find customer';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { createCustomer, findCustomer, loading, error };
};

export const use1CStock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStock = useCallback(async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      const stock = await oneCApi.getProductStock(productId);
      return stock;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stock';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStock = useCallback(async (productId: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);
      await oneCApi.updateStock(productId, quantity);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update stock';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { getStock, updateStock, loading, error };
}; 