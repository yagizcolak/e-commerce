import axiosInstance from '../../../api/axiosInstance';
import { Product } from '../../../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  // throw new Error('Simulated fetchProducts error for testing.');
  const response = await axiosInstance.get('/products');
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  // throw new Error('Simulated fetchProductById error for testing.');
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};