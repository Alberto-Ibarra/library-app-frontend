import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Box from '@mui/material/Box';

const Layout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Outlet /> {/* This renders the child pages */}
        </Box>
        </Box>
    );
};

export default Layout;
