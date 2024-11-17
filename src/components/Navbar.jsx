import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const pages = [
  { name: 'Home', link: '/student-home' },
  { name: 'Book a teacher', link: '/student-booking' },
  { name: 'My Calendar', link: '/student-calendar' },
];


function Navbar({ userFirstName }) {
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
  };


  const handleCloseModal = () => {
    setOpenLogoutModal(false); // Close the modal
  };

  const settings = {
    Profile: '/student-profile',
    Account: '/student-account',
    Logout: () => setOpenLogoutModal(true), // Custom logout function
  };

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear session, redirect, etc.)
    sessionStorage.clear();
    setOpenLogoutModal(false); // Close the modal after logout
    return navigate('/');
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ESL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={page.link}
                    sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {/* notifications */}
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            sx={{ marginRight: 1 }}
          >
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: stringToColor(userFirstName) }}>
                  {getInitial(userFirstName)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(settings).map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {typeof settings[setting] === 'string' ? (
                    // If the value is a string, render it as a link
                    <Link to={settings[setting]} style={{ textDecoration: 'none', color: 'black' }}>
                      <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </Link>
                  ) : (
                    // If the value is a function (like Logout), trigger the function
                    <button onClick={settings[setting]} style={{ textDecoration: 'none', color: 'black', border: 'none', background: 'transparent' }}>
                      <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </button>
                  )}
                </MenuItem>
              ))}
            </Menu>

            {/* Logout Confirmation Modal */}
            <Modal
              open={openLogoutModal}
              onClose={handleCloseModal}
              aria-labelledby="logout-modal-title"
              aria-describedby="logout-modal-description"
            >
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
                <Typography variant="h6" id="logout-modal-title">
                  Are you sure you want to logout?
                </Typography>

                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleCloseModal} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={handleLogout} color="primary">
                    Logout
                  </Button>
                </Box>
              </Box>
            </Modal>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
