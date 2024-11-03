import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Home as HomeIcon,
  Logout as LogoutIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ColorModeContext } from '../context/ColorModeContext';
import { CurrencyContext, Currency } from '../context/CurrencyContext';

// Define the currencies constant
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'TRY',
    label: '₺',
  },
];

interface CustomAppBarProps {
  title: string;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({ title }) => {
  const authContext = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const navigate = useNavigate();

  if (!authContext) {
    return null;
  }

  const { logout } = authContext;

  // Handler for Home button and "Crea" text click
  const handleHomeClick = () => {
    navigate('/products'); // Ensure this route matches your ProductList route
  };

  // Handler for Logout button click
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Updated handler for currency change
  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value as Currency);
  };

  return (
    <AppBar
      position="fixed" // Makes the AppBar sticky
      color="primary"
      elevation={4}
      sx={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        {/* Home Button and "Crea" Text */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={handleHomeClick}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 1 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold' }}
          >
            Crea
          </Typography>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Currency Selector */}
        <TextField
          id="select-currency"
          select
          value={currency}
          onChange={handleCurrencyChange}
          variant="standard"
          sx={{
            mr: 2,
            minWidth: 80,
            color: 'white',
            '& .MuiInput-underline:before': {
              borderBottomColor: 'white',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
          }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {`${option.label} ${option.value}`}
            </MenuItem>
          ))}
        </TextField>

        {/* Dark Mode Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {colorMode.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* Logout Button */}
        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            textTransform: 'none',
            fontWeight: 'medium',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;