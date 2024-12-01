import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import {
  Home as HomeIcon,
  Logout as LogoutIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../features/auth/context/AuthProvider";
import { ColorModeContext } from "../../../context/ColorModeContext";
import { CurrencyContext, Currency } from "../../../context/CurrencyContext";
import { Button, Typography, CurrencySelector } from "../../common";
import styles from "./Header.module.scss";

interface HeaderProps {
  title?: string;
}

/**
 * `Header` displays the navigation bar with home, currency selector, theme toggle, and logout.
 */
const Header: React.FC<HeaderProps> = ({ title }) => {
  const authContext = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const navigate = useNavigate();

  if (!authContext) {
    return null;
  }

  const { logout } = authContext;

  const handleHomeClick = () => {
    navigate("/products");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrency(event.target.value as Currency);
  };

  return (
    <AppBar position="fixed" elevation={4} className={styles.header}>
      <Toolbar>
        {/* Home Button and "CREA" Text */}
        <Box className={styles.homeButtonContainer} onClick={handleHomeClick}>
          <IconButton
            className={styles.homeIconButton}
            data-testid="home-button"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={styles.homeTypography}>
            CREA
          </Typography>
        </Box>

        {/* Spacer */}
        <Box className={styles.spacer} />

        {/* Currency Selector */}
        <CurrencySelector
          value={currency}
          onChange={handleCurrencyChange}
          data-testid="currency-selector"
        />

        {/* Dark Mode Toggle */}
        <Box className={styles.darkModeToggle}>
          <IconButton
            onClick={colorMode.toggleColorMode}
            className={styles.darkModeIconButton}
            data-testid="dark-mode-button"
          >
            {colorMode.mode === "dark" ? (
              <Brightness7 data-testid="brightness7-icon" />
            ) : (
              <Brightness4 data-testid="brightness4-icon" />
            )}
          </IconButton>
        </Box>

        {/* Logout Button */}
        <Button
          icon={<LogoutIcon />}
          onClick={handleLogout}
          className={styles.logoutButton}
          data-testid="logout-button"
        >
          <span className={styles.logoutButtonText}>Logout</span>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
