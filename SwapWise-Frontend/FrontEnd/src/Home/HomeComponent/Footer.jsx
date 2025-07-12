import React from 'react';
import { Box, Typography } from '@mui/material';

export const Footer = (props) => {
    return (
        <Box
            sx={{
                backgroundColor: '#2e7d32', // Green background
                color: '#ffffff', // White text
                padding: '10px 20px',
                textAlign: 'center',
                ...props.sx,
            }}
        >
            <Typography variant="body2">
                &copy; 2025 The Packpal Inventory Manager. All rights reserved.
            </Typography>
            <Typography variant="body2">
                <a href="/terms" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                    Terms of Service
                </a>{' '}
                |{' '}
                <a href="/privacy" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                    Privacy Policy
                </a>
            </Typography>
        </Box>
    );
};