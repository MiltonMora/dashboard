import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import HeaderMenu from './HeaderMenu';
import Footer from './Footer';

import '../styles/components/Layout.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    flexGrow: 1,
  },
  content: {
      padding: '30px 40px',
      maxHeight: '100%',
  },
  menuContainer: {
    borderRight: "1px solid #e5e5e5",
    height: '100vh',
  },
  menu: {
    width: 'calc(100%/6)',
    height: '100%',
    maxHeight: '100%',
    position: "fixed",
    zIndex: '999',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <CssBaseline />
        <Grid item xs={2} className={classes.menuContainer}>
          <Grid item className={classes.menu}>
            <HeaderMenu />
          </Grid>
        </Grid>
        <Grid item xs={10}>
            <Header />
          <Grid item xs={12} className={classes.content}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
