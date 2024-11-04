import React, { useContext, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import type { AxiosError } from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ErrorResponseData {
  message: string;
}

function isAxiosError(error: unknown): error is AxiosError<ErrorResponseData> {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as any).isAxiosError === true
  );
}

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setServerError('');
      try {
        if (authContext) {
          await authContext.login(values.username, values.password);
        }
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.error(error);
          setServerError(error.response?.data?.message || 'Failed to login.');
        } else {
          console.error('Unexpected error:', error);
          setServerError('Failed to login.');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!authContext) {
    return null;
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #288CFC, #9c27b0)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={logo} alt="Company Logo" style={{ width: '150px', marginBottom: '20px' }} />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {serverError && (
                <Typography color="error" variant="body2">
                  {serverError}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={formik.isSubmitting || !formik.isValid}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;