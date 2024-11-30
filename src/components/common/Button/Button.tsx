import React, { FC } from "react";
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from "@mui/material";
import styles from "./Button.module.scss";

interface ButtonProps extends MUIButtonProps {
  icon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, icon, className, ...props }) => {
  return (
    <MUIButton
      className={`${styles.customButton} ${className || ""}`}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </MUIButton>
  );
};

export default Button;
