import { useState } from 'react';
import { NotificationSeverity } from '../../../context/NotificationContext';
import { addComment } from '../services/commentService';
import { fetchProductById } from '../../products/services/productService';
import { Product } from '../../../types/Product';
import { Comment } from '../../../types/Comment';

interface UseAddCommentProps {
  productId: number;
  setProduct: (product: Product) => void;
  setComments: (comments: Comment[]) => void;
  showNotification: (message: string, severity: NotificationSeverity) => void;
}

const useAddComment = ({
  productId,
  setProduct,
  setComments,
  showNotification,
}: UseAddCommentProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddComment = async (content: string, rating: number) => {
    const comment: Comment = {
      id: Date.now(),
      username: 'Current User',
      content,
      rating,
      date: new Date().toISOString(),
    };
    setLoading(true);
    try {
      await addComment(productId, comment);

      // Fetch the updated product data
      const updatedProduct = await fetchProductById(productId);
      setProduct(updatedProduct);
      setComments(updatedProduct.comments || []);
      showNotification('Comment added successfully.', NotificationSeverity.Success);
    } catch (error) {
      console.error('Failed to add comment:', error);
      showNotification('Failed to add comment.', NotificationSeverity.Error);
    } finally {
      setLoading(false);
    }
  };

  return { handleAddComment, loading };
};

export default useAddComment;