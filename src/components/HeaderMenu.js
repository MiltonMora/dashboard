import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Menu from '../containers/Menu';
import AppContext from '../context/AppContext';

const useStyles = makeStyles((theme) => ({
    menu: {
        maxHeight: '100%',
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
    },
    menuSticky: {
        height: "70px",
        width: 'calc(100%/6)',
        borderRight: "1px solid #e5e5e5",
        position: "fixed",
        top: "0",
        zIndex: 999,
        float: 'right',
        backgroundColor: 'RGBA(255,255,255,0.83)',
    },
    displayNone: {
        display: 'none',
    },
    displayShowMenu: {
    },
  }));

const HeaderMenu = () => {
    const classes = useStyles();

    const theme = useTheme();
    const flag = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(()=> {
        if( flag===false ) {
          classes.displayShowMenu = classes.displayNone
        }
        else {
          classes.displayShowMenu = classes.menuSticky
        }
      },[flag]);

    return (
        <Grid item className={classes.menu}>
            <Grid item md={false} className={classes.displayShowMenu}>
                gato
            </Grid>
            <Link to="home">
                <p >home</p>
            </Link>
            <Menu />
        </Grid>
    );
}

export default HeaderMenu
