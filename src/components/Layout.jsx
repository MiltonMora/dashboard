import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import HeaderMenu from './HeaderMenu';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={3}>
        <HeaderMenu />
      </Grid>
      <Grid item xs={9}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
