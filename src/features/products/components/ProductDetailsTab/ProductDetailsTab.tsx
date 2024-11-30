import React from "react";
import { Box, Grid2, Rating } from "@mui/material";
import { Product } from "../../../../types/Product";
import { Currency } from "../../../../context/CurrencyContext";
import { convertPrice } from "../../utils/currencyUtils";
import { Typography } from "../../../../components";
import styles from "./ProductDetailsTab.module.scss";

interface ProductDetailsTabProps {
  product: Product;
  commentsCount: number;
  currency: Currency;
}

const ProductDetailsTab: React.FC<ProductDetailsTabProps> = ({
  product,
  commentsCount,
  currency,
}) => {
  return (
    <Box className={styles.detailsTabContainer}>
      <Typography
        variant="h4"
        className={styles.title}
        data-testid="product-name"
      >
        {product.name}
      </Typography>

      <Typography
        variant="h5"
        className={styles.price}
        data-testid="product-price-detail"
      >
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
        }).format(convertPrice(product.price, currency))}
      </Typography>

      <Box className={styles.ratingContainer}>
        <Rating
          name={`rating-${product.id}`}
          value={product.rating}
          precision={0.1}
          readOnly
        />
        <Typography variant="body1" className={styles.ratingText}>
          {product.rating.toFixed(1)}
        </Typography>
      </Box>

      <Grid2 container spacing={2} className={styles.infoGrid}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle1" className={styles.infoItemTitle}>
            <strong>Arrival Date:</strong>
          </Typography>
          <Typography variant="body2" className={styles.infoItemContent}>
            {new Date(product.arrivalDate).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle1" className={styles.infoItemTitle}>
            <strong>Total Comments:</strong>
          </Typography>
          <Typography variant="body2" className={styles.infoItemContent}>
            {commentsCount}
          </Typography>
        </Grid2>
      </Grid2>

      <Box className={styles.description}>
        <Typography
          variant="subtitle1"
          className={styles.descriptionTitle}
          gutterBottom
        >
          Description:
        </Typography>
        <Typography variant="body1" className={styles.descriptionBody}>
          {product.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetailsTab;
