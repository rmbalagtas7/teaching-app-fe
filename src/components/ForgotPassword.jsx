import { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  width: "90%",
  maxWidth: 500,
  "@media (max-width:600px)": {
    width: "90%", // Use 90% width on smaller screens
    maxWidth: "none", // Remove the max-width on smaller screens
    p: 2, // Adjust padding for smaller screens
  },
};

export default function ForgotPassword({ open, handleClose }) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const validateInputs = () => {
    const email = document.getElementById("email");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
      console.log("nice")
    }

    return isValid;
  };

  const handleEmailChange = (event) => {
    setEmailError(false);
    setEmailErrorMessage("");
  };


  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Reset password
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          variant="body2"
          color="textSecondary"
        >
          Enter your account's email address, and we'll send you a link to reset
          your password.
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

        <Box sx={{ float: "right", p: 2 }}>
          <Button sx={{ mr: 2}} variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={validateInputs}>
            Continue
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
