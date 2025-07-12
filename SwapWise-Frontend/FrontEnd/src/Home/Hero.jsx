import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from "../shared-theme/AppTheme";
// import { MainContent } from "../Hero/HeroComponent/MainContent";
import { Latest } from "./HomeComponent/Latest"; // Fixed relative path
import { Footer } from "./HomeComponent/Footer";
import { Navbar } from "../Layout/Navbar";
// import { TeamIntro } from "./HomeComponent/TeamIntro"; // Fixed relative path
export const Hero = (props) => {
    return (
        <>
            <AppTheme {...props}>
                <CssBaseline />
                <Navbar />
                <Container
                    maxWidth="lg"
                    component="main"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8, // Consistent spacing between sections
                        backgroundColor: '#f9f9f9', // Unified background color
                        padding: { xs: 2, md: 4 }, // Responsive padding
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow
                        width: '100%',
                        maxWidth: '1200px', // Centered content
                        margin: '0 auto', // Center alignment
                    }}
                >
                    {/* Main Content Section */}
                    {/* <TeamIntro /> */}

                    {/* Latest Section */}
                    {/* <Latest /> */}

                    {/* Footer Section */}
                    <Footer />
                </Container>
            </AppTheme>
        </>
    );
};

export default Hero;