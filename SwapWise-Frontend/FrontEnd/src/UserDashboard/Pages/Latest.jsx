import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';

export const Latest = () => {
    const updates = [
        'New feature: Advanced analytics dashboard.',
        'Bug fixes and performance improvements.',
        'Upcoming webinar on platform updates.',
    ];

    const announcements = [
        'Service downtime scheduled for maintenance on April 15th.',
        'New provider onboarding process introduced.',
        'Admin training session available on April 20th.',
    ];

    const upcomingEvents = [
        'April 18th: Webinar on improving service quality.',
        'April 25th: Workshop on advanced analytics usage.',
        'May 1st: Annual platform review meeting.',
    ];

    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
            }}
        >
            {/* Styled Heading */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    textAlign: 'center',
                    color: '#1976d2', // Primary color
                    textTransform: 'uppercase', // Make text uppercase
                    letterSpacing: '2px', // Add letter spacing
                    borderBottom: '2px solid #1976d2', // Add a bottom border
                    paddingBottom: '10px', // Add padding below the text
                }}
            >
                Latest Updates and Announcements
            </Typography>
            <Grid container spacing={3}>
                {/* Latest Updates Section */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                        Latest Updates
                    </Typography>
                    <List>
                        {updates.map((update, index) => (
                            <ListItem key={index} sx={{ padding: '5px 0' }}>
                                <ListItemText primary={update} sx={{ color: '#555' }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                {/* Announcements Section */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                        Announcements
                    </Typography>
                    <List>
                        {announcements.map((announcement, index) => (
                            <ListItem key={index} sx={{ padding: '5px 0' }}>
                                <ListItemText primary={announcement} sx={{ color: '#555' }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                {/* Upcoming Events Section */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                        Upcoming Events
                    </Typography>
                    <List>
                        {upcomingEvents.map((event, index) => (
                            <ListItem key={index} sx={{ padding: '5px 0' }}>
                                <ListItemText primary={event} sx={{ color: '#555' }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Latest;