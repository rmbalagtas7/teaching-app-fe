import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import Navbar from "./Navbar";

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


const LiveSessionCalendar = ({ bookingDetails }) => {

  const events = Array.isArray(bookingDetails) && bookingDetails.length > 0
    ? bookingDetails.map((booking) => ({
      title: `${booking.title}`,
      start: new Date(booking.start), // Convert start to Date object if it's not already a Date object
      end: new Date(booking.end),     // Convert end to Date object if it's not already a Date object
      description: booking.description || "Interactive session on basic grammar rules.", // Fallback description
    }))
    : [];


  const user = JSON.parse(sessionStorage.getItem('user'));
  const emailWithoutDomain = user?.email?.split("@")[0];

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarHeight, setCalendarHeight] = useState("500px");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Adjust height based on screen size
    const handleResize = () => {
      setCalendarHeight(isSmallScreen ? "400px" : "500px");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSmallScreen]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  console.log(bookingDetails)
  return (
    <>
      <Navbar userFirstName={emailWithoutDomain} />

      <Box sx={{ padding: 4, marginTop: 9 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem" }, // Responsive font size
          }}
        >
          Live Sessions Schedule
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflowX: "auto", // Allows horizontal scrolling on smaller screens
          }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
              width: "100%",
              maxWidth: "1000px", // Limits max width for larger screens
              height: calendarHeight,
            }}
            onSelectEvent={handleEventClick}
          />
        </Box>

        {/* Event Details Dialog */}
        <Dialog open={!!selectedEvent} onClose={handleCloseDialog}>
          <DialogTitle>Teacher: {selectedEvent?.title} - Live session</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              {selectedEvent?.description}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Start: {selectedEvent?.start.toLocaleString()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              End: {selectedEvent?.end.toLocaleString()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={() => alert("Joining the session...")}
            >
              Join Session
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default LiveSessionCalendar;
