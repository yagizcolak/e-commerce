// src/features/products/hooks/useProducts.ts

import { useState, useEffect } from 'react';
import { NotificationSeverity } from '../../../context/NotificationContext';
import { fetchProducts } from '../services/productService';
import { Product } from '../../../types/Product';
import { AxiosError } from 'axios';

interface UseProductsProps {
  showNotification: (message: string, severity: NotificationSeverity) => void;
}

const useProducts = ({ showNotification }: UseProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Error fetching products:', error);
          showNotification(
            error.response?.data?.message || 'Failed to fetch products.',
            NotificationSeverity.Error
          );
        } else {
          console.error('Unexpected error:', error);
          showNotification('Failed to fetch products.', NotificationSeverity.Error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [showNotification]);

  return { products, loading };
};

export default useProducts;