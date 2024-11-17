import * as React from 'react';
import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Modal,
  Box,
  TextField,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import Navbar from './Navbar';

const teachers = [
  { id: 1, name: 'Ms. Emily Johnson', specialty: 'Beginner English' },
  { id: 2, name: 'Mr. David Lee', specialty: 'Advanced Grammar' },
  { id: 3, name: 'Ms. Sarah Brown', specialty: 'Conversational English' },
];

const Booking = ({ onConfirmBooking }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const emailWithoutDomain = user?.email?.split("@")[0];
  const [selectedTeacher, setSelectedTeacher] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [startTime, setStartTime] = React.useState(dayjs().startOf('day').hour(9)); // Set default time as 9AM
  const [endTime, setEndTime] = React.useState(dayjs().startOf('day').hour(9).add(30, 'minute')); // Default end time 30 mins later
  const [openSelectModal, setOpenSelectModal] = React.useState(false);
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const [bookings, setBookings] = useState([]);

  const handleTeacherSelect = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenSelectModal(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleConfirmBooking = () => {
    const bookingData = {
      teacher: selectedTeacher.name,
      date: selectedDate.format('MM/DD/YYYY'),
      startTime: startTime.format('h:mm A'),
      endTime: endTime.format('h:mm A'),
    };

    // Parse the selected date (MM/DD/YYYY format)
    const [month, day, year] = bookingData.date.split('/');
    const dateObject = new Date(year, month - 1, day); // JavaScript months are 0-indexed

    // Parse start time (e.g., "2:00 PM")
    const startTimeParts = startTime.format('h:mm A').split(' '); // ['2:00', 'PM']
    const startTimeArray = startTimeParts[0].split(':');
    const startHour = parseInt(startTimeArray[0]) + (startTimeParts[1] === 'PM' && parseInt(startTimeArray[0]) !== 12 ? 12 : 0); // Handle PM times
    const startMinute = parseInt(startTimeArray[1]);

    // Parse end time (e.g., "3:00 PM")
    const endTimeParts = endTime.format('h:mm A').split(' '); // ['3:00', 'PM']
    const endTimeArray = endTimeParts[0].split(':');
    const endHour = parseInt(endTimeArray[0]) + (endTimeParts[1] === 'PM' && parseInt(endTimeArray[0]) !== 12 ? 12 : 0); // Handle PM times
    const endMinute = parseInt(endTimeArray[1]);

    // Create the start and end Date objects using the parsed date and time
    const startDate = new Date(dateObject.setHours(startHour, startMinute, 0, 0));
    const endDate = new Date(dateObject.setHours(endHour, endMinute, 0, 0));


    const calendarEvent = {
      title: `${bookingData.teacher}`,
      start: startDate, // Date object for the start time
      end: endDate,     // Date object for the end time
      description: "Interactive session on basic grammar rules.",
    };


    setBookings((prevBookings) => {
      const updatedBookings = [...prevBookings, calendarEvent];
      // Now call onConfirmBooking with the updated bookings
      console.log(updatedBookings)
      if (onConfirmBooking) {
        onConfirmBooking(updatedBookings);
      }
      return updatedBookings;
    });

    setSelectedTeacher(null);
    setSelectedDate(null);
    setStartTime(dayjs().startOf('day').hour(9));
    setEndTime(dayjs().startOf('day').hour(9).add(30, 'minute'));
    setOpenConfirmModal(false);
    setOpenSelectModal(false);
  };

  const handleCloseModals = () => {
    setOpenSelectModal(false);
    setOpenConfirmModal(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar userFirstName={emailWithoutDomain} />
      <Container sx={{ marginTop: 10 }}>
        <Typography variant="h4" gutterBottom>
          Book a Teacher for a Live Session
        </Typography>

        <Typography variant="h6" gutterBottom>
          Choose a Teacher:
        </Typography>
        <Grid container spacing={3}>
          {teachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={4} key={teacher.id}>
              <Card
                sx={{
                  border: selectedTeacher?.id === teacher.id ? '2px solid blue' : '1px solid #ccc',
                }}
              >
                <CardContent>
                  <Typography variant="h6">{teacher.name}</Typography>
                  <Typography color="text.secondary">{teacher.specialty}</Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary" onClick={() => handleTeacherSelect(teacher)}>
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Select Date and Time Modal */}
        <Modal open={openSelectModal} onClose={handleCloseModals}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: 3,
              borderRadius: 2,
              boxShadow: 24,
              minWidth: 300,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Select a Date and Time for {selectedTeacher?.name}
            </Typography>

            <DemoContainer components={['DatePicker', 'TimePicker']}>
              {/* Date Picker */}
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateSelect}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              {/* Start Time Picker */}
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(newTime) => setStartTime(newTime)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              {/* End Time Picker */}
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={(newTime) => setEndTime(newTime)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                minTime={startTime}
              />
            </DemoContainer>

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleCloseModals} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={() => setOpenConfirmModal(true)}
                color="primary"
                disabled={!selectedDate || !startTime || !endTime}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Confirm Booking Modal */}
        <Modal open={openConfirmModal} onClose={handleCloseModals}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: 3,
              borderRadius: 2,
              boxShadow: 24,
              minWidth: 300,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Confirm Your Booking
            </Typography>
            <Typography variant="body1">Teacher: {selectedTeacher?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Specialty: {selectedTeacher?.specialty}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Date: {selectedDate?.format('MMMM D, YYYY')}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 1 }}>
              Time: {startTime.format('h:mm A')} - {endTime.format('h:mm A')}
            </Typography>

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleCloseModals} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleConfirmBooking} color="primary">
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </LocalizationProvider>
  );
};

export default Booking;
