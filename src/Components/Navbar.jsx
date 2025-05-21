import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';


export default function ButtonAppBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path) => {
    setAnchorEl(null);
    if (path) {
      navigate(path);
    }
  };

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Goals', path: '/goals' },
    { label: 'Tasks', path: '/tasks' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#66bb6a' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>

          {isSmallScreen ? (
            <React.Fragment>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleMenuClose()}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {links.map(({ label, path }) => (
                  <MenuItem key={path} onClick={() => handleMenuClose(path)}>
                    {label}
                  </MenuItem>
                ))}
              </Menu>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {links.map(({ label, path }) => (
                <Button
                  key={path}
                  color="inherit"
                  onClick={() => navigate(path)}
                  sx={{ ml: 2 }}
                >
                  {label}
                </Button>
              ))}
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar /> 
    </Box>
  );
}
