import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import theme from '../theme';

const drawerWidth = 180;

export default function Sidebar({ children }) {
  const navigate = useNavigate();

  // Safe user retrieval from localStorage
  const storedUser = localStorage.getItem("user");

  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    user = null;
  }

  const menuItems = [
    { text: 'Book Copies', path: '/book-copies' },
    { text: 'Books', path: '/books' },
    { text: 'Patrons', path: '/patrons' },
  ];

  if (user?.role === 'Admin') {
    menuItems.push({ text: 'Users', path: '/users' });
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navigateToRegister = () => { 
    navigate("/register");
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.secondary,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', width: '100%' }}>
            {user ? `Welcome, ${user.firstname}!` : 'Welcome!'}
          </Typography>
        </Toolbar>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemText primary={item.text} sx={{ textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Logout Button */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: 20, 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 1
        }}>
          {user?.role === "Admin" && (
            <Button
              variant="contained"
              onClick={navigateToRegister}
              sx={{ mx: 0.5, width: 120, backgroundColor: 'success.light', color: '#fff' }}
            >
              Register
            </Button>
          )}

          <Button 
            variant="contained" 
            color="error"
            onClick={handleLogout} 
            sx={{ mx:0.5, width: 120 }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
