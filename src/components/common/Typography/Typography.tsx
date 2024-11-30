import React, { FC } from 'react';
import {
  Typography as MUITypography,
  TypographyProps as MUITypographyProps,
} from '@mui/material';
import styles from './Typography.module.scss';

type TypographyProps = MUITypographyProps

const Typography: FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <MUITypography
      className={`${styles.customTypography} ${className || ''}`}
      {...props}
    >
      {children}
    </MUITypography>
  );
};

export default Typography;