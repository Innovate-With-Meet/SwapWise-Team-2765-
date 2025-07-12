import React from 'react';
import { Navbar } from '../Layout/Navbar';
import { Footer } from '../Layout/Footer';
import { MainComponents } from './Pages/MainComponents';
import { Latest } from './Pages/Latest';
import { Sidebar } from '../Layout/Sidebar';
import { Box } from '@mui/material';

export const UserDashboard = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#f4f6f8',
                fontFamily: 'Arial, sans-serif',
                color: '#333',
                mt: 3,
            }}
        >
            <Navbar />
            <Sidebar />
            <Box sx={{ height: '64px' }} /> {/* Adjust height based on Navbar height */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <MainComponents />
                <Latest />
            </Box>
            <Footer
                sx={{
                    backgroundColor: '#1976d2',
                    color: '#ffffff',
                    padding: '10px 20px',
                    textAlign: 'center',
                }}
            />
        </Box>
    );
};
export default UserDashboard;