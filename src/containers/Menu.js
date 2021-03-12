import React, { useContext, useEffect }  from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';


import AppContext from '../context/AppContext';
import MenuAccordion from '../components/MenuAccordion';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    height: {
        padding: '5% 0%',
    },
    p: {
        marginBottom: '10%',
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
    });

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(()=> {
        let menuData = [];
        user.roles.forEach(rol => { 
            if (rol in permission) {
                menuData = permission[rol]
            }  
        })
        setValues({...values, menu: menuData, iconBtn: document.getElementById('colseMenu')})
      },[]);

    const handleClickLink = () => {
        if(flag === false)
        values.iconBtn.click();
    }

    return (
        <div className={classes.root}>
            <Link to="home">
                <p onClick={handleClickLink}>home</p>
            </Link>
            {values.menu.map((item) => (
                <MenuAccordion item={item} handleChange={handleChange} expanded={expanded} key={item}/>
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
