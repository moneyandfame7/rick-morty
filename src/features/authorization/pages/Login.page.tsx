import React, { FC, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useLogin } from "features/authorization/hooks";
import { ValidatedInput } from "shared/components/ValidatedInput";
import { PasswordInput } from "shared/components/PasswordInput";
import { useAppSelector } from "application/store";
import { HOME_ROUTE } from "shared/routes";
import { selectIsAuthenticated } from "features/authorization/services";
import { ErrorMessage } from "shared/components";
import { Backdrop } from "shared/components/Backdrop";
import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { SocialLoginModal } from "features/authorization/components/SocialLogin";
import { useToggle } from "shared/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginPage: FC = () => {
  const formRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useToggle();
  const navigate = useNavigate();
  const { formik, isLoading, error } = useLogin();
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated);
  useEffect(() => {
    if (isUserAuthenticated) {
      console.log("LOGIN PAGE REDIRECT BECAUSE >>>>> Already authenticated");
      navigate({ pathname: HOME_ROUTE.path });
    }
  }, []);
  return (
    <Container component="main" maxWidth="xs" sx={{
      minHeight: "100vh",
      my: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>

      {isLoading && <Backdrop />}
      <Box component="div" sx={{ marginTop: 10 }}>
        <div>
          <Typography component="h2" fontSize="25px" fontWeight="600">
            Welcome back
          </Typography>
          <Typography variant="body1" sx={{ my: 1, mb: 3, opacity: 0.5 }}>
            Let&apos;s get started! Please enter your details.
          </Typography>
        </div>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate ref={formRef}
             sx={{ display: "flex", flexDirection: "column", gap: 2, mt: "50px" }}>


          <ValidatedInput
            fullWidth
            value={formik.values.email}
            errorText={formik.errors.email}
            touched={formik.touched.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            type="email"
            placeholder="Enter your email"
            label="Email"
          >
            Email
          </ValidatedInput>

          <PasswordInput
            fullWidth
            value={formik.values.password}
            errorText={formik.errors.password}
            touched={formik.touched.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#3990FF",
                          fontSize: 15,
                          outline: "none",
                          borderBottom: "none",
                        }}
                        component={RouterLink}
                        to="/signup">
              Don't have an account? Sign Up
            </Typography>
            <Typography variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#3990FF",
                          fontSize: 15,
                          outline: "none",
                          borderBottom: "none",
                        }}
                        component={RouterLink}
                        to="/forgot"
            >
              Forgot password
            </Typography>
          </Box>
          <Box component="div" sx={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <SocialLoginModal open={isModalOpen} onClose={setIsModalOpen} />
            <Button variant="outlined" type="button" fullWidth onClick={setIsModalOpen}>
              Social login
            </Button>
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </Box>

        </Box>
      </Box>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </Container>

  );
};
