import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    menu: {
        borderRight: "1px solid grey",
        height: "100vh",
      },
  }));

function HeaderMenu() {
    const classes = useStyles();
    return (
        <Grid item className={classes.menu} />
    );
}

export default HeaderMenu
