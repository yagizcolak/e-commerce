import React, { FC } from "react";
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from "@mui/material";
import styles from "./Button.module.scss";

/** Extends MUI Button props with an optional icon */
interface ButtonProps extends MUIButtonProps {
  /** Optional icon to display inside the button */
  icon?: React.ReactNode;
}

/**
 * `Button` wraps MUI's Button with custom styles and an optional icon.
 */
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
