import React, { useContext, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import AppContext from '../context/AppContext';
import MenuAccordion from '../components/MenuAccordion';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
  }));

const Menu = () => {

    const {state: {permission}} = useContext(AppContext);
    const classes = useStyles();

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
        setValues({...values, menu: menuData})
      },[]);

    const user = JSON.parse(localStorage.getItem('ustk'));

    return (
        <div className={classes.root}>
        {values.menu.map((item) => (
            <MenuAccordion item={item} handleChange={handleChange} expanded={expanded} key={item}/>
        ))}
        </div>
    )
}

export default Menu
