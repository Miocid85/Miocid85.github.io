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
      if (!response.ok) throw new Error('Ошибка загрузки XML');
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
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      console.error('Error loading products:', err);
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