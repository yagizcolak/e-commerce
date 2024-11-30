import React, { FC } from 'react';
import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from '@mui/material';
import styles from './TextField.module.scss';

// Define TextFieldProps as an intersection of MUITextFieldProps and an optional className
type TextFieldProps = MUITextFieldProps & {
  className?: string;
};

const TextField: FC<TextFieldProps> = ({ className, ...props }) => {
  return (
    <MUITextField
      className={`${styles.customTextField} ${className || ''}`}
      {...props}
    />
  );
};

export default TextField;