import React from "react";
import { Box } from "@mui/material";
import Typography from "../Typography/Typography";
import styles from "./NoData.module.scss";

/** Props for NoData component */
interface NoDataProps {
  /** Message to display when no data is available */
  message?: string;
}

/**
 * `NoData` displays a message indicating the absence of data.
 */
const NoData: React.FC<NoDataProps> = ({ message = "No data available." }) => {
  return (
    <Box className={styles.noData}>
      <Typography variant="h6" className={styles.noDataText}>
        {message}
      </Typography>
    </Box>
  );
};

export default NoData;
