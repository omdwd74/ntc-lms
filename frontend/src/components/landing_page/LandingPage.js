import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper } from '@material-ui/core';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">NITRA TECHNICAL CAMPUS</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Navbar />
        <Header />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              {/* Content for your landing page goes here */}
              <Typography variant="h4" align="center">Welcome to our Library Management System</Typography>
              <Typography variant="body1" align="center">Explore our collection of books and manage your library efficiently.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default LandingPage;
