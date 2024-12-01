import React from "react";
import { Card, CardActionArea, CardContent, Rating, Box } from "@mui/material";
import { Product } from "../../../../types/Product";
import { Currency } from "../../../../context/CurrencyContext";
import { convertPrice } from "../../utils/currencyUtils";
import { Button, Typography } from "../../../../components";
import ImageSlider from "../ImageSlider/ImageSlider";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: number) => void;
  currency: Currency;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  currency,
}) => {
  const handleClick = () => {
    onViewDetails(product.id);
  };

  return (
    <Card className={styles.productCard}>
      <CardActionArea className={styles.cardActionArea} onClick={handleClick}>
        <ImageSlider
          images={product.images}
          altText={product.name}
          interval={1500}
          autoSlide={false}
          slideOnHover={true}
          showNavigation={false}
          showThumbnails={false}
        />
        <CardContent>
          <Typography variant="h6" className={styles.productName}>
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            className={styles.price}
            data-testid={`product-price-${product.id}`}
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
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" className={styles.ratingText}>
              {product.rating.toFixed(1)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box className={styles.buttonContainer}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleClick}
          className={styles.button}
          data-testid={`view-details-button-${product.id}`}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
