import { useState, useEffect } from 'react';
import { NotificationSeverity } from '../../../context/NotificationContext';
import { fetchProductById } from '../services/productService';
import { Product } from '../../../types/Product';
import { AxiosError } from 'axios';
import { Comment } from '../../../types/Comment';

interface useProductProps {
  productId: number;
  showNotification: (message: string, severity: NotificationSeverity) => void
}

const useProduct = ({ productId, showNotification }: useProductProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(productId);
        if (data) {
          setProduct(data);
          setComments(data.comments || []);
        } else {
          setProduct(null);
          setComments([]);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Error fetching product:', error);
          showNotification(error.response?.data?.message || 'Failed to fetch product.', NotificationSeverity.Error);
        } else {
          console.error('Unexpected error:', error);
          showNotification('Failed to fetch product.', NotificationSeverity.Error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, showNotification]);

  return { product, setProduct, comments, setComments, loading };
};

export default useProduct;