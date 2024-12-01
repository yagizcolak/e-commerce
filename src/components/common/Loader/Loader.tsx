import React from "react";
import { Box, CircularProgress } from "@mui/material";
import styles from "./Loader.module.scss";

/**
 * `Loader` displays a centered circular loading spinner.
 */
const Loader: React.FC = () => (
  <Box className={styles.loader} data-testid="loader">
    <CircularProgress role="progressbar" />
  </Box>
);

export default Loader;
