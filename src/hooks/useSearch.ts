import { useState, useEffect, useCallback } from 'react';
import { use1CProducts, ProductXML } from './use1CData';

export interface SearchResult {
  id: string;
  name: string;
  type: 'product' | 'page';
  url?: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
}

export const useSearch = (query: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { products: allProducts } = use1CProducts(); // Get all products without category filter

  const searchProducts = useCallback((searchQuery: string, products: ProductXML[]): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(' ').filter(term => term.length > 0);
    
    return products
      .filter(product => {
        // Search in product name, description, and category
        const searchableText = [
          product.name,
          product.description,
          product.folder0,
          product.folder1,
          product.folder2
        ].join(' ').toLowerCase();
        
        // Check if all search terms are found in the searchable text
        return searchTerms.every(term => searchableText.includes(term));
      })
      .map(product => ({
        id: product.id,
        name: product.name,
        type: 'product' as const,
        description: product.description,
        price: product.price,
        image: product.imageUrl,
        category: product.folder0,
        url: `/?category=${encodeURIComponent(product.folder0)}`
      }))
      .slice(0, 20); // Limit to 20 results
  }, []);

  const searchPages = useCallback((searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(' ').filter(term => term.length > 0);
    
    const pages = [
      {
        id: 'about',
        name: 'О компании',
        type: 'page' as const,
        url: '/about',
        description: 'Информация о компании КубСантехОпт, наша история и миссия'
      },
      {
        id: 'delivery',
        name: 'Доставка',
        type: 'page' as const,
        url: '/delivery',
        description: 'Условия доставки, сроки и стоимость доставки товаров'
      },
      {
        id: 'contact',
        name: 'Контакты',
        type: 'page' as const,
        url: '/contact',
        description: 'Контактная информация, адрес, телефон, email'
      },
      {
        id: 'design',
        name: 'Проектирование',
        type: 'page' as const,
        url: '/design',
        description: 'Услуги по проектированию отопительных систем'
      },
      {
        id: 'consultation',
        name: 'Консультация',
        type: 'page' as const,
        url: '/consultation',
        description: 'Получить консультацию по выбору отопительного оборудования'
      }
    ];
    
    return pages
      .filter(page => {
        const searchableText = [page.name, page.description].join(' ').toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      })
      .slice(0, 5); // Limit to 5 page results
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    // Simulate search delay for better UX
    const timeoutId = setTimeout(() => {
      const productResults = searchProducts(query, allProducts || []);
      const pageResults = searchPages(query);
      
      setResults([...productResults, ...pageResults]);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, allProducts, searchProducts, searchPages]);

  return { results, loading };
};