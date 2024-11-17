import React, { useState } from "react";
import Image from "../assets/bg.png";
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
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Grid from "@mui/material/Grid2";

//dipa tapos validaition and some bugs
export default function Register() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }

    if (isValid) {
      // Proceed with the form submission logic
      console.log("Form Submitted");
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
                Create an account and start your language learning journey!
              </Typography>

              <TextField
                type="text"
                label="First Name"
                id="firstName"
                name="firstName"
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <TextField
                type="text"
                label="Last Name"
                id="lastName"
                name="lastName"
                variant="outlined"
                fullWidth
                margin="normal"
              />

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
                type="password"
                id="password"
                name="password"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
                onChange={handlePasswordChange}
              />

              <TextField
                error={confirmPasswordError}
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={confirmPasswordErrorMessage}
                color={confirmPasswordError ? "error" : "primary"}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, borderRadius: 1, textTransform: "none" }}
                onClick={validateInputs}
              >
                Sign up
              </Button>

              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ mt: 3 }}
              >
                Have an account?{" "}
                <Link href="/" underline="none" color="primary">
                  Sign in
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
                Sign up with Google
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
