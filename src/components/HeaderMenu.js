import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';

import Menu from '../containers/Menu';
import AppContext from '../context/AppContext';

const useStyles = makeStyles((theme) => ({
    menu: {
        maxHeight: '100%',
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
        marginBottom: '5%',
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
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      margin: '5%',
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
              <Avatar alt="IYouD" src="https://iyoud.org/wp-content/uploads/2020/10/cropped-logo-color.png" className={classes.large} />
            </Grid>
            <Menu />
        </Grid>
    );
}

export default HeaderMenu
