import React, { useContext, useEffect }  from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import AppContext from '../context/AppContext';
import MenuAccordion from '../components/MenuAccordion';
import Icons from '../components/Icons';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    height: {
        padding: '5% 0%',
    },
    p: {
        marginBottom: '10%',
    },
    to: {
        textDecoration: 'none',
        color: '#8A838D',
        fontWeight: 'bold',
        fontFamily: '',
        textTransform: 'capitalize',
      },
      icon: {
          marginRight: '-20px',
          color: '#8A838D',
      },
      active: { 
          color: '#D460BE',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontFamily: '',
          textTransform: 'capitalize',   
      }
  }));

const Menu = () => {

    const {state: {permission}} = useContext(AppContext);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('ustk'));

    const theme = useTheme();
    const flag = useMediaQuery(theme.breakpoints.up('md'));

    const [expanded, setExpanded] = React.useState(false);

    const [values, setValues] = React.useState({
        menu: [],
        selected: '',
    });

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    let location = useLocation();

    useEffect(()=> {
        let menuData = [];
        user.roles.forEach(rol => { 
            if (rol in permission) {
                menuData = permission[rol]
            }  
        })
        const sel = location.pathname.replace('/', '')
        setValues({...values, menu: menuData, iconBtn: document.getElementById('colseMenu'), selected: sel})
      },[]);

    const handleClickLink = (el) => () => {
        if(flag === false)
            values.iconBtn.click();

        if(el === 'home')
            setExpanded(false);

        setValues({...values, selected: el});
    }

    return (
        <div className={classes.root}>
            <Link to="home" className={values.selected==="home"?classes.active: classes.to } onClick={handleClickLink('home')}>
                <ListItem button>        
                    <ListItemIcon className={values.selected==="home"?classes.active: classes.icon}>
                    <Icons element='home' />
                    </ListItemIcon>
                        <p >Home</p>
                </ListItem>
            </Link>
            {values.menu.map((item) => (
                <MenuAccordion 
                    item={item}
                    handleChange={handleChange}
                    handleClickLink={handleClickLink}
                    expanded={expanded}
                    selected={values.selected}
                    key={item}/>
            ))}
            <div className={classes.height}>
                <a href="http://iyoud.org/" target="_blank">
                    <p onClick={handleClickLink} className={classes.p}>IYouD</p>
                </a>
            </div>
        </div>
    )
}

export default Menu
