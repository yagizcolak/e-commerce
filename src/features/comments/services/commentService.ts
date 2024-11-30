// src/features/comments/services/commentService.ts

import axiosInstance from '../../../api/axiosInstance';
import { Comment } from '../../../types/Comment';

export const addComment = async (
  productId: number,
  comment: Comment
): Promise<Comment> => {
  // throw new Error('Simulated addComment error for testing.');
  const response = await axiosInstance.post(`/products/${productId}/comments`, comment);
  return response.data;
};