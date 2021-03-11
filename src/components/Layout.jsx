import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuOpen from '@material-ui/icons/MenuOpen';
import Menu from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';

import Header from './Header';
import HeaderMenu from './HeaderMenu';
import Footer from './Footer';
import AppContext from '../context/AppContext';

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
  menuContainerDisplay: {
    display: 'none',
  },
  menuContainerDisplayb: {
    display: 'none',
  },
  menu: {

  },
  menuNormal: {
    width: 'calc(100%/6)',
    height: '100%',
    maxHeight: '100%',
    position: "fixed",
    zIndex: '999',
    borderRight: "1px solid #e5e5e5",
    marginTop: "70px", 
    backgroundColor: 'RGBA(255,255,255,0.83)',
  },
  menuFull: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    position: "fixed",
    zIndex: '999',
    borderRight: "1px solid #e5e5e5",
    marginTop: "70px",
    backgroundColor: 'RGBA(255,255,255,0.83)',
  },
  menuSticky: {
    height: "70px",
    width: 'calc(100%/6)',
    borderBottom: "1px solid #e5e5e5",
    position: "fixed",
    top: "0",
    zIndex: 999,
    float: 'right',
    backgroundColor: 'RGBA(255,255,255,0.83)',
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  
  const histrory = useHistory();

  const [layoutValues, setLayoutValues] = React.useState({
    md: 10,
    open: '',
    menuZise: 2,
  });

  const {state: {lateralMenu}, menuStatus} = useContext(AppContext);

  const theme = useTheme();
  const flag = useMediaQuery(theme.breakpoints.up('md'));
  
    const token = JSON.parse(localStorage.getItem('ustk'));
    const now = Date.now();

    if (
      !token ||
      token.status === false ||
      token.exp >= now
    ){
      histrory.push('/');
    }


  useEffect(()=> {
    
    if( flag===false ) {
      menuStatus(false)
      classes.menu = classes.menuFull;
      setLayoutValues({ ...layoutValues, md: 12, open: classes.menuContainerDisplay });
    }
    else {
      menuStatus(true)
      classes.menu = classes.menuNormal;
      setLayoutValues({ ...layoutValues, md: 10, open: '' });
    }
  },[flag]);


  const handleClose = () => {
    menuStatus(!lateralMenu);
    let menuZise = 2;
    let size = 12;
    if( flag=== false & lateralMenu === false ) {
        classes.menu = classes.menuFull;
        menuZise = 2;
    }else {
      classes.menu = classes.menuNormal;
      size = lateralMenu === true ? 12 : 10;  
    }
    const opened = lateralMenu === true ? classes.menuContainerDisplay : '';
    setLayoutValues({ ...layoutValues, md: size, open: opened, menuZise: menuZise });
  }

  const handleCloseItem = () => {
    flag === false && handleClose();
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <CssBaseline />
        <Grid item xs={layoutValues.menuZise} className={ layoutValues.open }>
          <Grid item className={classes.menu}>
            <HeaderMenu />
          </Grid>
        </Grid>
        <Grid item sm={layoutValues.md}>
          <Grid item className={classes.menuSticky}>
              <IconButton onClick={handleClose} className={classes.margin}>
                  {lateralMenu ? <MenuOpen fontSize="inherit" /> : <Menu fontSize="inherit" />}
              </IconButton>
          </Grid>
            <Header />
          <Grid item className={classes.content}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
