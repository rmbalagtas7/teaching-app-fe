import React from "react";
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
const theme = createTheme({
  palette: {
    primary: {
      main: "#243642", // Custom primary color
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
  return (
    <div>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-up" element={<Register />} />
            </Routes>
          </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;
