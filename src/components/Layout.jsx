import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuOpen from '@material-ui/icons/MenuOpen';
import Menu from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';
import Badge from '@material-ui/core/Badge';
import theme from '../containers/theme';


import HeaderMenu from './HeaderMenu';
import Footer from './Footer';
import AppContext from '../context/AppContext';

import '../styles/components/Layout.css';
import { ContactSupportOutlined } from '@material-ui/icons';


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
    position: "fixed",
    zIndex: 999,
    backgroundColor: 'RGBA(255,255,255,0.83)',
  },
  topMenu: {
    height: "70px",
    borderBottom: "1px solid #e5e5e5",
    position: "sticky",
    top: "0",
    backgroundColor: "RGBA(255,255,255,0.7)",
  },
  margin: {
    margin: theme.spacing(0),
  },
  me: {
    float: 'right',
    margin: theme.spacing(1),
  },
  color: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: theme.palette.secondary.main,
  }
}));


const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const Layout = ({ children }) => {
  
  const them = useTheme();
  const flag = useMediaQuery(them.breakpoints.up('md'));
  
  const histrory = useHistory();

  const [layoutValues, setLayoutValues] = React.useState({
    md: 10,
    open: '',
    menuZise: 2,
  });

  const {state: {lateralMenu, thema}, menuStatus, setThema} = useContext(AppContext);
  
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


  const classes = useStyles();

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
          <IconButton onClick={handleClose} id='colseMenu' className={classes.menuSticky}>
              {lateralMenu ? <MenuOpen fontSize="inherit" /> : <Menu fontSize="inherit" />}
          </IconButton>
          <Grid item className={classes.topMenu}>
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              className={classes.me}
              badgeContent={<SmallAvatar ><SettingsApplications /></SmallAvatar>}
            >
              <Avatar className={classes.color}>MM</Avatar>
            </Badge>
          </Grid>
          <Grid item className={classes.content}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
