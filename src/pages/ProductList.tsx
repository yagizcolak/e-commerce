import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid2, Toolbar, Pagination } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import { AxiosError } from 'axios';
import { Product } from '../types/Product';
import CustomAppBar from '../components/CustomAppBar';
import ProductCard from '../components/ProductCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorAlert from '../components/ErrorAlert';
import { CurrencyContext } from '../context/CurrencyContext';

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { currency } = useContext(CurrencyContext);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  useEffect(() => {
    // Clear the selected product ID when the products list is loaded
    sessionStorage.removeItem('selectedProductId');

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error('Error fetching products:', error);
          setError(error.response?.data?.message || 'Failed to fetch products.');
        } else {
          console.error('Unexpected error:', error);
          setError('Failed to fetch products.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId: number) => {
    // Store the selected product ID in sessionStorage
    sessionStorage.setItem('selectedProductId', productId.toString());
    navigate(`/products/${productId}`);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <CustomAppBar title="Products" />

      {/* Spacer to prevent content being hidden behind AppBar */}
      <Toolbar />

      <Box sx={{ padding: 4 }}>
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorAlert message={error} />
        ) : (
          <>
            <Grid2 container spacing={4}>
              {currentProducts.map((product: Product) => (
                <Grid2
                  key={product.id}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  component="div"
                >
                  <ProductCard
                    product={product}
                    onViewDetails={handleProductClick}
                    currency={currency}
                  />
                </Grid2>
              ))}
            </Grid2>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop={4}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductList;