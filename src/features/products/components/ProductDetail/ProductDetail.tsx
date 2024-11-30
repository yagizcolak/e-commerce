import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, Tab, Box, Card } from "@mui/material";
import ImageSlider from "../ImageSlider/ImageSlider";
import { CurrencyContext } from "../../../../context/CurrencyContext";
import {
  useNotification,
  NotificationSeverity,
} from "../../../../context/NotificationContext";
import useProduct from "../../hooks/useProduct";
import useAddComment from "../../../comments/hooks/useAddComment";
import ProductDetailsTab from "../ProductDetailsTab/ProductDetailsTab";
import { CommentsTab } from "../../../comments";
import { Loader, NoData } from "../../../../components";
import styles from "./ProductDetail.module.scss";

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : NaN;
  const selectedProductId = useMemo(
    () => sessionStorage.getItem("selectedProductId"),
    []
  );

  useEffect(() => {
    if (!id || isNaN(productId) || selectedProductId !== id) {
      navigate("/products", { replace: true });
    }
  }, [id, productId, selectedProductId, navigate]);

  const { currency } = useContext(CurrencyContext);
  const { showNotification } = useNotification();
  const memoizedShowNotification = useCallback(
    (message: string, severity: NotificationSeverity) => {
      showNotification({ message, severity });
    },
    [showNotification]
  );

  const { product, setProduct, comments, setComments, loading } = useProduct({
    productId,
    showNotification: memoizedShowNotification,
  });

  const { handleAddComment, loading: addingComment } = useAddComment({
    productId,
    setProduct,
    setComments,
    showNotification: memoizedShowNotification,
  });

  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Show loader during data fetching or comment addition
  if (loading || addingComment) {
    return <Loader />;
  }

  if (!product) {
    return <NoData message="Product not found." />;
  }

  return (
    <Box>
      <Box className={styles.productDetailContainer}>
        <Card className={styles.card}>
          <Box className={styles.contentBox}>
            {/* Left: Product Image */}
            <Box className={styles.leftBox}>
              {/* <ImageSlider images={product.images} altText={product.name} /> */}
              <ImageSlider
                images={product.images}
                altText={product.name}
                autoSlide={false}
                slideOnHover={false}
                showNavigation={true}
                showThumbnails={true}
              />
            </Box>

            {/* Right: Tabs */}
            <Box className={styles.rightBox}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="Product Tabs"
                className={styles.tabs}
              >
                <Tab
                  label="DETAILS"
                  className={styles.tabLabel}
                  data-testid="details-tab"
                />
                <Tab
                  label={`COMMENTS (${comments.length})`}
                  className={styles.tabLabel}
                  data-testid="comments-tab"
                />
              </Tabs>

              <Box className={styles.tabContent}>
                {activeTab === 0 && (
                  <ProductDetailsTab
                    product={product}
                    commentsCount={comments.length}
                    currency={currency}
                  />
                )}

                {activeTab === 1 && (
                  <CommentsTab
                    comments={comments}
                    onAddComment={handleAddComment}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductDetail;
