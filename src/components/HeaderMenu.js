import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


import AppContext from '../context/AppContext';

const useStyles = makeStyles((theme) => ({
    menu: {
        maxHeight: '100%',
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
    },
  }));

const HeaderMenu = () => {
    const classes = useStyles();

    const {state: {lateralMenu}, menuStatus} = useContext(AppContext);

    return (
        <Grid item className={classes.menu}>
                <Link to="home">
                    <p >home</p>
                </Link>
                <Link to="locations">
                    <p >locations</p>
                </Link>
        </Grid>
    );
}

export default HeaderMenu
