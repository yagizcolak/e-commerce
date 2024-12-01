import React from "react";
import { Box } from "@mui/material";
import { Typography } from "../../common";
import { useTheme } from "@mui/material/styles";
import styles from "./Footer.module.scss";

/*
Little CSS problem
SCSS variables are compiled at build time
CSS variables can access runtime values, but 
cannot perform  conditional logic within SCSS
One way to solve this would be to duplicate the
theme colors into the _variables.scss
but I think using sx prop just this once is better
*/

const Footer: React.FC = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";

  return (
    <Box
      component="footer"
      data-testid="footer"
      className={styles.footer}
      sx={{
        backgroundColor: isLightMode
          ? theme.palette.primary.main
          : theme.palette.background.paper,
        color: isLightMode
          ? theme.palette.common.white
          : theme.palette.text.primary,
      }}
    >
      <Typography variant="body2" className={styles.footerText}>
        &copy; {new Date().getFullYear()} all rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
