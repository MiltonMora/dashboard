import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const AlertBar = ({message, error, open, handleClose}) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            autoHideDuration={6000}
            open={open ? true : false}
            onClose={handleClose}
            action={
                <React.Fragment>
                <IconButton size="large" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="large" />
                </IconButton>
                </React.Fragment>
            }>
            <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
            <AlertTitle></AlertTitle>
            {message != '' ? message :'Error Verifique los datos'}
            </Alert>
        </Snackbar>
    )
}

export default AlertBar
