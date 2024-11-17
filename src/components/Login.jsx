import React, { useState } from "react";
import Image from "../assets/bg.png";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";
import {
  FormControlLabel,
  Card,
  Typography,
  Box,
  Button,
  CardContent,
  TextField,
  Checkbox,
  Link,
  Divider,
  IconButton,
  CircularProgress,
  Backdrop
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from "@mui/icons-material/Google";
import Grid from "@mui/material/Grid2";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import userData from "../users";
import { saveToStorage } from "../utilities/Storage";

export default function Login() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (isValid) {
      userData.map((user) => {
        if (email.value === user.email && password.value === user.password) {
          if (user.access_level === 1) {
            console.log("superadmin")
          }
          if (user.access_level === 2) {
            console.log('admin')
          }
          if (user.access_level === 3) {
            console.log('teacher')
          }
          if (user.access_level === 4) {
            sessionStorage.setItem('user', JSON.stringify(user));
            return navigate('/student-home')
          }
        } else {
          //to be continue
          setPasswordErrorMessage("Invalid email or password. Please try again.");
        }
      })
    }
  };

  const handleEmailChange = (event) => {
    setEmailError(false);
    setEmailErrorMessage("");
  };

  const handlePasswordChange = (event) => {
    setPasswordError(false);
    setPasswordErrorMessage("");
  };


  const handleOpenForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Grid
        container
        spacing={2}
        columns={16}
        sx={{ maxWidth: 1200, width: "100%" }}
      >
        {/* Left Image Grid */}
        <Grid
          item
          xs={16}
          md={8}
          sx={{
            display: { xs: "none", md: "flex" }, // Hide on small screens
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={Image}
            alt="Illustration"
            sx={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>

        {/* Right Card Grid */}
        <Grid
          item
          xs={16}
          md={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 500,
              boxShadow: 3,
              p: 3,
              borderRadius: 1,
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Welcome to ESL!
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={3}>
                Log in to your account and begin your language journey!
              </Typography>

              <TextField
                error={emailError}
                type="email"
                label="Email"
                id="email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={emailErrorMessage}
                color={emailError ? "error" : "primary"}
                onChange={handleEmailChange}
              />
              <TextField
                error={passwordError}
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={passwordErrorMessage}
                sx={{
                  '& .MuiFormHelperText-root': {
                    color: 'red',  // Always set helper text color to red
                  }
                }}
                color={passwordError ? "error" : "primary"}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember Me"
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, borderRadius: 1, textTransform: "none" }}
                onClick={validateInputs}
              >
                Sign in
              </Button>

              <Link
                component="button"
                type="button"
                variant="body2"
                underline="none"
                sx={{ mt: 1 }}
                onClick={handleOpenForgotPassword}
              >
                Forgot your password?
              </Link>

              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ mt: 3 }}
              >
                New on our platform?{" "}
                <Link href="sign-up" underline="none" color="primary">
                  Create an account
                </Link>
              </Typography>
            </CardContent>
            <Divider sx={{ pb: 2 }}>or</Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert("Sign in with Google")}
                startIcon={<GoogleIcon />}
                sx={{ textTransform: "none" }}
              >
                Sign in with Google
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <ForgotPassword
        open={openForgotPassword}
        handleClose={handleCloseForgotPassword}
      />
    </Box>
  );
}
