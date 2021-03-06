import React, { useContext }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import themeColors from '../containers/ThemeColors';

import AppContext from '../context/AppContext';
import Icons from '../components/Icons';

const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(16),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    summary: {
    },
    summaryExpand: {
        borderRight: `2px solid ${themeColors.palette.secondary.main}`,
        backgroundColor: themeColors.palette.secondary.light,
    },
    links: {
        display: 'block',
    },
    accordion: {
        border: 'none',
        borderRadius: 0,
        boxShadow: 'none'
    },
    to: {
      textDecoration: 'none',
      color: themeColors.palette.secondary.contrastText,
      fontWeight: 'bold',
      fontFamily: '',
      textTransform: 'capitalize',
    },
    icon: {
        marginRight: '-20px',
    },
    active: { 
        color: themeColors.palette.secondary.main,
        textDecoration: 'none',
        fontWeight: 'bold',
        fontFamily: '',
        textTransform: 'capitalize',   
    },
    white: {
        color: themeColors.palette.secondary.main,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    black: {
        color: themeColors.palette.secondary.contrastText,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    }
  }));

const MenuAccordion = ({item, handleChange, expanded, handleClickLink, selected}) => {
    const classes = useStyles();
    const {state: {menu}} = useContext(AppContext);

    return (
            <div key={Math.random()}>
                <Accordion 
                    className={classes.accordion}
                    expanded={expanded === `panel${item}`}
                    onChange={handleChange(`panel${item}`)}>
                    <AccordionSummary
                    className={expanded === `panel${item}`? classes.summaryExpand: classes.summary}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${item}-content`}
                    id={`panel${item}-header`}
                    >
                    <Typography className={classes.heading, expanded === `panel${item}`?classes.white : classes.black}>{item}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.links}>
                        {
                            Object.entries(menu[item]).map((el, index) => {
                                return(
                                    <Link 
                                        to={el[1]}
                                        className={selected===el[1]?classes.active: classes.to}
                                        onClick={handleClickLink(el[1])}
                                        key={index}>
                                        <ListItem button>       
                                            <ListItemIcon className={selected===el[1]?classes.active: classes.icon}>
                                            <Icons element={el[1]} />
                                            </ListItemIcon>
                                                <p>{el[0]}</p>
                                        </ListItem>
                                    </Link>
                            )})
                        }
                    </AccordionDetails>
                </Accordion>
            </div>
    )
}

export default MenuAccordion
