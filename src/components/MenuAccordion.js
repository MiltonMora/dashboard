import React, { useContext, useEffect }  from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import People from '@material-ui/icons/People';

import AppContext from '../context/AppContext';

const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    links: {
        display: 'block',
    },
    accordion: {
    },
  }));

const MenuAccordion = ({item, handleChange, expanded}) => {
    const classes = useStyles();
    const {state: {menu, lateralMenu}} = useContext(AppContext);

    const [values, setValues] = React.useState({});

    useEffect(()=> {
        setValues({...values, iconBtn: document.getElementById('colseMenu')})
      },[]);
    

    const theme = useTheme();
    const flag = useMediaQuery(theme.breakpoints.up('md'));

    const handleClickLink = () => {
        if(flag === false)
        values.iconBtn.click();
    }

    return (
            <div key={Math.random()} className={classes.accordion}>
                <Accordion 
                    expanded={expanded === `panel${item}`}
                    onChange={handleChange(`panel${item}`)}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${item}-content`}
                    id={`panel${item}-header`}
                    >
                    <Typography className={classes.heading}>{item}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.links}>
                        {
                            Object.entries(menu[item]).map((el, index) => {
                                const icon = el[1]
                                return(<ListItem button key={index}>       
                                            <ListItemIcon>
                                            <People />
                                            </ListItemIcon>
                                            <Link to={el[1]}>
                                                <p onClick={handleClickLink}>{el[0]}</p>
                                            </Link>
                                       </ListItem>
                            )})
                        }
                    </AccordionDetails>
                </Accordion>
            </div>
    )
}

export default MenuAccordion
