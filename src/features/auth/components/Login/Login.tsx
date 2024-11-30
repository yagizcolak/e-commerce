import React, { useState } from "react";
import { Box, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useLoginForm from "../../hooks/useLoginForm";
import logo from "../../../../assets/logo.svg";
import { Button, TextField } from "../../../../components";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const { formik } = useLoginForm();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Box className={styles.loginContainer}>
      <Box className={styles.loginBox}>
        <Box className={styles.formContainer}>
          <img src={logo} alt="Company Logo" className={styles.logo} />
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className={styles.loginForm}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              data-testid="username-field"
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
              type={showPassword ? "text" : "password"}
              id="password"
              data-testid="password-field"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.password && Boolean(formik.errors.password)) ||
                Boolean(formik.status)
              }
              helperText={
                (formik.touched.password && formik.errors.password) ||
                (formik.status as string)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      data-testid="visibility-button"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={formik.isSubmitting || !formik.isValid}
              className={styles.submitButton}
              data-testid="submit-button"
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
