import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

//import AppContext from '../context/AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "70px",
    borderBottom: "1px solid #e5e5e5",
    position: "sticky",
    top: "0",
    backgroundColor: "RGBA(255,255,255,0.7)",
    filter: 'blur(5px)',
    WebkitFilter: 'blur(5px)',
  },
}));

const Header = () => {
  const classes = useStyles();
    return (
        <Grid item className={classes.root} />
    );
};

export default Header;
