// src/features/products/components/ProductList/ProductList.tsx

import React, { useContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid2, Pagination } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import { CurrencyContext } from "../../../../context/CurrencyContext";
import { useNotification, NotificationSeverity } from "../../../../context/NotificationContext";
import useProducts from "../../hooks/useProducts";
import { Loader, NoData } from "../../../../components";
import styles from "./ProductList.module.scss";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { currency } = useContext(CurrencyContext);
  const { showNotification } = useNotification();
  
  const memoizedShowNotification = useCallback(
    (message: string, severity: NotificationSeverity) => {
      showNotification({ message, severity });
    },
    [showNotification]
  );

  // Move sessionStorage removal to useEffect
  useEffect(() => {
    sessionStorage.removeItem("selectedProductId");
  }, []);

  const { products, loading } = useProducts({
    showNotification: memoizedShowNotification,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const handleProductClick = (productId: number) => {
    sessionStorage.setItem("selectedProductId", productId.toString());
    navigate(`/products/${productId}`);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Loader />;
  }

  if (products.length === 0) {
    return <NoData message="No products available." />;
  }

  return (
    <Box className={styles.productListContainer}>
      <Grid2 container spacing={4}>
        {currentProducts.map((product) => (
          <Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard
              product={product}
              onViewDetails={handleProductClick}
              currency={currency}
            />
          </Grid2>
        ))}
      </Grid2>

      <Box className={styles.paginationContainer}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          className={styles.pagination}
        />
      </Box>
    </Box>
  );
};

export default ProductList;