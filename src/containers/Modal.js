import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import themeColors from '../containers/ThemeColors';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {

  return {
    top: `20%`,
    left: `25%`,
    transform: `translate(-20%, -25%)`,
    border: 'none',
    padding: '15px'
  };
}

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
    },
    addIcon: {
        backgroundColor: themeColors.palette.secondary.main,
        position: 'absolute',
        bottom: theme.spacing(1),
        right: theme.spacing(1),
    },
    modal: {
        border: 'none',
    },
  }),
);

export default function SimpleModal({ children }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
        {children}
    </div>
  );

  return (
    <div>
      <Fab className={classes.addIcon} onClick={handleOpen}>
              <AddIcon />
            </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}>
        {body}
      </Modal>
    </div>
  );
}
