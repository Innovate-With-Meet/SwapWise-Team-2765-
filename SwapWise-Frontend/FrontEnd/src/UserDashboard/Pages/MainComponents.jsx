import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
// import { AllUsers } from "../ManageUsers/AllUsers";
export const MainComponents = () => {
    const adminFeatures = [
        {
            title: 'Skill Management',
            description: 'Add The Skills Here, Post The Request Here, Delete the Request Here.',
            action: 'Manage Skills',
            path: '/userdashboard_route/ManageSkills',
        },
        {
            title: 'Category Management',
            description: 'Organize, modify, or delete categories of services available on the platform.',
            action: 'Manage Categorys',
            path: '/admin/categorymanage',
        },
        {
            title: 'Analytics Dashboard',
            description: 'View platform analytics, user activity, and performance metrics.',
            action: 'View Analytics',
            path: '/admin/Analytics',
        },
    ];
    //MeetRana162@gmail.com, Meet111, "email": "SamirVithalanni@gmail.com","password": "SamirGrow",
    //KhushiSahay@gmail.com, Khushi123


    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                marginBottom: '20px',
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                User Dashboard Overview
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '20px', color: '#555', textAlign: 'center' }}>
                Welcome to the User panel! Manage Skills, services, and view analytics to keep the platform running smoothly.
            </Typography>
            <Grid container spacing={3} sx={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
                {adminFeatures.map((feature, index) => (
                    <Grid item key={index} sx={{ flex: '0 0 auto', width: '300px' }}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#555' }}>
                                    {feature.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => (window.location.href = feature.path)}
                                >
                                    {feature.action}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default MainComponents;