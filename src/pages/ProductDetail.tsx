import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  Typography,
  Tabs,
  Tab,
  Box,
  Rating,
  Grid2,
  Toolbar,
  Card,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { AxiosError } from "axios";
import CustomAppBar from "../components/CustomAppBar";
import { Product, Comment } from "../types/Product";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorAlert from "../components/ErrorAlert";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import ImageSlider from "../components/ImageSlider";
import { CurrencyContext } from "../context/CurrencyContext";
import { convertPrice } from "../utils/currencyUtils";
import NotificationSnackbar from "../components/NotificationSnackbar"; // Import the new component

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id!, 10);

  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [isProductSelected, setIsProductSelected] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { currency } = useContext(CurrencyContext);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const selectedProductId = sessionStorage.getItem("selectedProductId");
    if (selectedProductId !== id) {
      setIsProductSelected(false);
    }
  }, [id]);

  useEffect(() => {
    if (isProductSelected) {
      const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axiosInstance.get(`/products/${productId}`);
          setProduct(response.data);
          setComments(response.data.comments || []);
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error(error);
            setError(
              error.response?.data?.message || "Failed to fetch product."
            );
          } else {
            console.error("Unexpected error:", error);
            setError("Failed to fetch product.");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId, isProductSelected]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleAddComment = async (content: string, rating: number) => {
    const comment: Comment = {
      id: Date.now(),
      username: "Current User",
      content,
      rating,
      date: new Date().toISOString(),
    };
    try {
      await axiosInstance.post(`/products/${productId}/comments`, comment);
      const response = await axiosInstance.get(`/products/${productId}`);
      setProduct(response.data);
      setComments(response.data.comments);

      // Show success message
      setSnackbarMessage("Comment added successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error(error);
          setError(error.response?.data?.message || "Failed to add comment.");
        } else {
          console.error("Unexpected error:", error);
          setError("Failed to add comment.");
        }
      }
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (!isProductSelected) {
    return <Navigate to="/products" replace />;
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!product) {
    return null;
  }

  return (
    <Box>
      {/* Enhanced App Bar */}
      <CustomAppBar title="Product Detail" />

      {/* Spacer to prevent content being hidden behind AppBar */}
      <Toolbar />

      {/* Content */}
      <Box sx={{ width: "90%", margin: "auto", mt: 2, mb: 2 }}>
        <Grid2 container spacing={4}>
          {/* Left Side: Product Image */}
          <Grid2
            size={{ xs: 12, md: 6 }}
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card sx={{ maxWidth: '25vw', boxShadow: 3, borderRadius: 2 }}>
              <ImageSlider images={product.images} altText={product.name} />
            </Card>
          </Grid2>

          {/* Right Side: Tabs */}
          <Grid2 size={{ xs: 12, md: 6 }} component="div">
            <Card
              sx={{ height: "100%", boxShadow: 3, borderRadius: 2, padding: 2 }}
            >
              {/* Tabs */}
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                aria-label="Product Tabs"
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <Tab label="Details" />
                <Tab label={`Comments (${comments.length})`} />
              </Tabs>

              {/* Tab Panels */}
              <Box sx={{ mt: 2 }}>
                {tabIndex === 0 && (
                  <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                  {/* Product Name */}
                  <Typography variant="h4" component="h1" gutterBottom>
                    {product.name}
                  </Typography>
                
                  {/* Price */}
                  <Typography variant="h5" color="primary" gutterBottom>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: currency,
                    }).format(convertPrice(product.price, currency))}
                  </Typography>
                
                  {/* Rating */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Rating
                      name={`rating-${product.id}`}
                      value={product.rating}
                      precision={0.1}
                      readOnly
                    />
                    <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                      {product.rating.toFixed(1)}
                    </Typography>
                  </Box>
                
                  {/* Product Details */}
                  <Grid2 container spacing={2} sx={{ mb: 2 }}>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        <strong>Arrival Date:</strong>
                      </Typography>
                      <Typography variant="body2">
                        {new Date(product.arrivalDate).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        <strong>Total Comments:</strong>
                      </Typography>
                      <Typography variant="body2">{comments.length}</Typography>
                    </Grid2>
                  </Grid2>
                
                  {/* Description */}
                  <Box>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      Description:
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {product.description}
                    </Typography>
                  </Box>
                </Box>
                )}

                {tabIndex === 1 && (
                  <Box>
                    {/* Comment List */}
                    {comments.length === 0 ? (
                      <Typography variant="body1" color="text.secondary">
                        No comments yet. Be the first to comment!
                      </Typography>
                    ) : (
                      <Box sx={{ maxHeight: "40vh", overflowY: "auto" }}>
                        {comments.map((comment) => (
                          <CommentCard key={comment.id} comment={comment} />
                        ))}
                      </Box>
                    )}

                    {/* Add Comment */}
                    <CommentForm onAddComment={handleAddComment} />
                  </Box>
                )}
              </Box>
            </Card>
          </Grid2>
        </Grid2>
      </Box>

      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default ProductDetail;
