import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Button,
  Box,
} from '@mui/material';
import { Product } from '../types/Product';
import { Currency } from '../context/CurrencyContext';
import { convertPrice } from '../utils/currencyUtils';

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: number) => void;
  currency: Currency;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, currency }) => {
  const handleClick = () => {
    onViewDetails(product.id);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        sx={{ flexGrow: 1 }}
        onClick={handleClick}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          loading="lazy"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            noWrap
          >
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {/* ${product.price.toFixed(2)} */}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: currency,
            }).format(convertPrice(product.price, currency))}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <Rating
              name={`rating-${product.id}`}
              value={product.rating}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ ml: 0.5 }}
            >
              {product.rating.toFixed(1)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box sx={{ padding: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClick}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;