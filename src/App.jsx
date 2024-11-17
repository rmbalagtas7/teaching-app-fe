import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import Login from "./components/Login";
import Register from "./components/Register";
import Student from "./components/Student";
import LiveSessionCalendar from "./components/LiveSessionCalendar";
import Booking from "./components/Booking";


const theme = createTheme({
  palette: {
    primary: {
      main: "#3890E8", // Custom primary color
      contrastText: "#fff", // Text color
    },
    secondary: {
      main: "#f44336", // Custom secondary color
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
  const [bookingDetails, setBookingDetails] = useState(null);


  const handleBookingConfirmation = (data) => {
    setBookingDetails(data);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/student-home" element={<Student />} />
            <Route path="/student-calendar" element={<LiveSessionCalendar bookingDetails={bookingDetails} />} />
            <Route path="/student-booking" element={<Booking onConfirmBooking={handleBookingConfirmation} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
