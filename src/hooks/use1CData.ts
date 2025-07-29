import { useState, useEffect, useCallback } from 'react';

export interface ProductXML {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  description: string;
  folder0: string;
  folder1: string;
  folder2: string;
  folder3: string;
  folder4: string;
  folder5: string;
}

export const use1CProducts = (category?: string, limit?: number) => {
  const [products, setProducts] = useState<ProductXML[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load XML file from local product directory
      const response = await fetch('/product/product.xml');
      
      if (!response.ok) {
        console.warn('XML file not found, using fallback data');
        // Use fallback data if XML fails to load
        const fallbackProducts: ProductXML[] = [
          {
            id: '1',
            name: 'Котел отопления BAXI',
            price: 35000,
            quantity: 12,
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Современный котел отопления',
            folder0: 'Котлы и бойлеры',
            folder1: 'Газовые котлы',
            folder2: 'BAXI',
            folder3: '',
            folder4: '',
            folder5: ''
          },
          {
            id: '2',
            name: 'Радиатор алюминиевый RIFAR',
            price: 4200,
            quantity: 34,
            imageUrl: 'https://images.unsplash.com/photo-1509599589979-3b5a15d2816e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Эффективный радиатор отопления',
            folder0: 'Греющие Элементы',
            folder1: 'Радиаторы',
            folder2: 'RIFAR',
            folder3: '',
            folder4: '',
            folder5: ''
          }
        ];
        
        let filteredProducts = fallbackProducts;
        if (category && category !== '') {
          filteredProducts = fallbackProducts.filter(product => 
            product.folder0.toLowerCase().includes(category.toLowerCase()) ||
            product.folder1.toLowerCase().includes(category.toLowerCase()) ||
            product.folder2.toLowerCase().includes(category.toLowerCase())
          );
        }
        
        if (limit) {
          filteredProducts = filteredProducts.slice(0, limit);
        }
        
        setProducts(filteredProducts);
        setLoading(false);
        return;
      }
      
      const xmlText = await response.text();
      
      // Parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const productNodes = xmlDoc.querySelectorAll('Product');
      
      const parsedProducts: ProductXML[] = Array.from(productNodes).map(node => {
        const getTextContent = (tagName: string) => {
          const element = node.querySelector(tagName);
          return element ? element.textContent || '' : '';
        };

        const id = getTextContent('Id');
        const name = getTextContent('Name');
        const price = parseFloat(getTextContent('Price')) || 0;
        const quantity = parseFloat(getTextContent('Quantity')) || 0;
        const imageUrl = getTextContent('ImageUrl');
        const description = getTextContent('Description');
        const folder0 = getTextContent('folder0');
        const folder1 = getTextContent('folder1');
        const folder2 = getTextContent('folder2');
        const folder3 = getTextContent('folder3');
        const folder4 = getTextContent('folder4');
        const folder5 = getTextContent('folder5');

        // Handle image URL - if image exists, use it, otherwise use placeholder
        let finalImageUrl = '';
        if (imageUrl && imageUrl.trim()) {
          // Check if image exists in img folder
          finalImageUrl = `/product/img/${imageUrl}`;
        } else {
          // Use placeholder image
          finalImageUrl = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        }

        return {
          id,
          name,
          price,
          quantity,
          imageUrl: finalImageUrl,
          description,
          folder0,
          folder1,
          folder2,
          folder3,
          folder4,
          folder5
        };
      });

      // Filter by category if specified
      let filteredProducts = parsedProducts;
      if (category && category !== '') {
        filteredProducts = parsedProducts.filter(product => 
          product.folder0.toLowerCase().includes(category.toLowerCase()) ||
          product.folder1.toLowerCase().includes(category.toLowerCase()) ||
          product.folder2.toLowerCase().includes(category.toLowerCase())
        );
      }

      // Apply limit if specified
      if (limit) {
        filteredProducts = filteredProducts.slice(0, limit);
      }

      setProducts(filteredProducts);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      
      // Set fallback products even on error
      const fallbackProducts: ProductXML[] = [
        {
          id: '1',
          name: 'Котел отопления BAXI',
          price: 35000,
          quantity: 12,
          imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: 'Современный котел отопления',
          folder0: 'Котлы и бойлеры',
          folder1: 'Газовые котлы',
          folder2: 'BAXI',
          folder3: '',
          folder4: '',
          folder5: ''
        }
      ];
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch };
}; 