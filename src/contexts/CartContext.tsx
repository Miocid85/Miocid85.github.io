import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  maxStock: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  }) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item already exists, increase quantity (but don't exceed stock)
        const newQuantity = Math.min(existingItem.quantity + 1, product.stock);
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          maxStock: product.stock
        }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, Math.min(newQuantity, item.maxStock)) }
          : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};