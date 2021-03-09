import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MenuOpen from '@material-ui/icons/MenuOpen';
import IconButton from '@material-ui/core/IconButton';

import AppContext from '../context/AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "70px",
    borderBottom: "1px solid #e5e5e5",
    position: "sticky",
    top: "0",
    backgroundColor: "RGBA(255,255,255,0.7)",

  },
  margin: {
    margin: theme.spacing(0),
    float: 'left',
    border: '2px solid',
  },
  display: {
    display: 'none',
  }
}));

const Header = () => {
  const classes = useStyles();

  const {state: {lateralMenu}, menuStatus} = useContext(AppContext);

    return (
        <Grid item className={classes.root}>
        </Grid>
    );
};

export default Header;
