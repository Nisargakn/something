import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Nav from './Nav'


const Home = () => {
    return (
        <>
            <Nav />
            <Grid container spacing={2} minHeight={1}>
                <Grid item xs={12} md={6}>
                    <h1 style={{ padding: '10px', marginTop: '20px', marginLeft: '10px' }}>Social Media</h1>
                    <h1 style={{ padding: '5px', marginLeft: '10px' }}>The easiest way to manage your brands on social media</h1>
                    <p style={{ padding: '10px', marginLeft: '10px' }}>Schedule unlimited posts, monitor what matters, and create custom-reports to analyze your social media performance with Social Media.</p>
                    <a href="/signUp"><button style={{ backgroundColor: '#ba343b', color: '#fff', padding: '18px 28px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: '600', margin: '20px' }}>Get Started With Free</button></a>
                </Grid>
                <Grid item xs={12} md={6}>
                    <video autoPlay loop muted style={{ width: '100%', height: '100%', padding: '10px' }}>
                        <source src="../Assets/SocialMedia.mp4" type="video/mp4" />
                    </video>
                </Grid>
            </Grid >
            <Footer />
        </>
    );
}
const Footer = () => {
    return (
        <Box p={2} textAlign="center" bgcolor="#ba343b" marginTop={12} >
            <Typography variant="body1" textAlign='center' color='#fff'>
                &copy; {new Date().getFullYear()} Your Website Name. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Home;
