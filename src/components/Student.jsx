import Navbar from "./Navbar";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";


export default function Student() {
  const lessons = [
    { id: 1, title: "Lesson 1: Basic Greetings", status: "Completed" },
    { id: 2, title: "Lesson 2: Common Phrases", status: "In Progress" },
    { id: 3, title: "Lesson 3: Grammar Basics", status: "Not Started" },
  ];
  const user = JSON.parse(sessionStorage.getItem('user'));
  const emailWithoutDomain = user?.email?.split("@")[0];
  return (
    <>
      <div>
        <Navbar userFirstName={emailWithoutDomain} />

        {/* Main Content */}
        <Container
          maxWidth="lg" // Limits the container width
          sx={{
            marginTop: 10,
            padding: 2,
          }}
        >
          {/* Welcome Section */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              marginBottom: 2,
            }}
          >
            Welcome, {emailWithoutDomain}!
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              fontStyle: 'italic',
              color: 'text.secondary',
              marginBottom: 4,
            }}
          >
            "The journey of a thousand miles begins with a single step."
          </Typography>

          {/* Learning Modules */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              marginBottom: 2,
            }}
          >
            Your Lessons
          </Typography>
          <Grid container spacing={3}>
            {lessons.map((lesson) => (
              <Grid item xs={12} sm={6} md={4} key={lesson.id}>
                <Card
                  sx={{
                    backgroundColor: '#f5f5f5',
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {lesson.title}
                    </Typography>
                    <Typography color="text.secondary">{lesson.status}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="primary">
                      {lesson.status === 'Not Started' ? 'Start' : 'Resume'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Progress Tracker */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              marginTop: 6,
              textAlign: 'center',
            }}
          >
            Learning Progress
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              margin: '20px 0',
            }}
          >
            <CircularProgress variant="determinate" value={50} size={100} />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              50% Completed
            </Typography>
          </div>
        </Container>
      </div>

    </>
  )
}