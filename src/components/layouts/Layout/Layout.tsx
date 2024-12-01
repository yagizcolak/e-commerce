import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Toolbar, Box } from "@mui/material";
import styles from "./Layout.module.scss";

/** Props for Layout component */
interface LayoutProps {
  /** Main content to be rendered within the layout */
  children: React.ReactNode;
}

/**
 * `Layout` wraps pages with Header and Footer, providing consistent structure.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box className={styles.layout}>
      <Header />
      {/* Spacer to prevent content being hidden behind AppBar */}
      <Toolbar />
      {/* Main content */}
      <Box className={styles.mainContent}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
