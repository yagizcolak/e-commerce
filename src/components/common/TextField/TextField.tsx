import React, { FC } from "react";
import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import styles from "./TextField.module.scss";

/** Props for TextField component */
type TextFieldProps = MUITextFieldProps & {
  /** Optional CSS class */
  className?: string;
};

/**
 * `TextField` wraps MUI's TextField with custom styles.
 */
const TextField: FC<TextFieldProps> = ({ className, ...props }) => {
  return (
    <MUITextField
      className={`${styles.customTextField} ${className || ""}`}
      {...props}
    />
  );
};

export default TextField;
