import React, { FC } from "react";
import {
  Typography as MUITypography,
  TypographyProps as MUITypographyProps,
} from "@mui/material";
import styles from "./Typography.module.scss";

/** Props for Typography component */
type TypographyProps = MUITypographyProps;

/**
 * `Typography` wraps MUI's Typography with custom styles.
 */
const Typography: FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <MUITypography
      className={`${styles.customTypography} ${className || ""}`}
      {...props}
    >
      {children}
    </MUITypography>
  );
};

export default Typography;
