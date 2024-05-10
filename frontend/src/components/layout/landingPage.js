import React from 'react';
import './landingPage.css'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Slideshow } from './SlideShow';
import { AppBar, Toolbar, Typography, Container, Grid, Paper } from '@mui/material';
// import Header from './Header';
// import Navbar from './Navbar';
// import Footer from './Footer';

export const LandingPage = () => {
  return (
    <div className='pg-contn'>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">NITRA TECHNICAL CAMPUS</Typography>
        </Toolbar>
      </AppBar> */}
      <Container>
        {/* <Navbar /> */}
        {/* <Header /> */}
        <Slideshow />
        
    {/* <div className="my-thing" /> */}
  
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
            <div className='welcome'>
              {/* Content for your landing page goes here */}
              <Typography variant="h4" align="center">Welcome to our Library Management System</Typography>
              <Typography variant="body1" align="center">Explore our collection of books and manage your library efficiently.</Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
     
    </div>
  );
};

