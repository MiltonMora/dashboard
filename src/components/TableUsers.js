import React from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Edit from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { changueStatus } from '../actions/UserActions';
import AlertBar from './AlertBar';

const useStyles = makeStyles((theme) => ({
    table: {
      border: '1px solid RGBA(0,0,0,0.1)',
    },
    row: {
      '&:hover': {
        background: "RGBA(0,0,0,0.1)",
     },
    },
    cancel: {
      color: 'rgba(255, 0, 0, 0.7)',
      '&:hover': {
        color: "red",
     },
    },
    active: {
      color: 'rgba(0, 255, 0, 0.7)',
      '&:hover': {
        color: "green",
     },
    },
    linear: {
        height: '10px',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    button: {
        margin: theme.spacing(2),
    },
    card: {
        padding: theme.spacing(2),
    },
    input: {
        width: '100%',
        marginTop: '15px',
    },
  }));
  

const TableUsers = ({data, handleUsers, roles}) => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        open: false,
        error: false,
        loading: false,
        message: '',
        form: false,
        perfil: '',
        roles: [],
        name: '',
        email: '',
        id: '',
      });

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
        }
    setValues({...values, open: false});
    };

    const handleForm = data => {
        let rol = '';
        roles.forEach(element => {
            if(element.name === data.rol[0]) {
                rol = element
            }
        });
        setValues({...values, name: data.name, email: data.email, perfil: rol, id: data.id, form: true})
    }
    
    const handleChangePerfil = (event) => {
        setValues({...values, perfil: event.target.value});
      }

    const handleStatus = email => {
        const data = new FormData();
        data.append("email", email);
        setValues({...values, loading: true});
        changueStatus(data)
        .then(res => {
            if(res.data.status === 404) {
              setValues({...values, error: true, open: true, message: 'error', loading: false});
            }
            else {
              setValues({...values, error: false, open: true, message: res.data.message, loading: false});
              handleUsers()
            }
        })
        .catch(err => {
          setValues({...values, error: true, open: true, message: 'error', loading: false});
        })
      }

      const handleChange = event => {
        setValues({...values, [event.target.name]: event.target.value});
      }

      const table = () => (
        <TableContainer >
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Rol</TableCell>
                    <TableCell align="left">Settings</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    { data.map((row) => 
                    <TableRow className={classes.row} key={row.id}>
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.rol}</TableCell>
                        <TableCell align="left">
                        {row.status ?
                            <Tooltip title="deactivate" arrow>
                                <IconButton aria-label="settings" onClick={() => handleStatus(row.email)}>
                                    <CheckCircle fontSize="small" className={classes.active} />
                                </IconButton>
                            </Tooltip>:
                            <Tooltip title="activate" arrow>
                                <IconButton aria-label="settings" onClick={() => handleStatus(row.email)}>
                                    <Cancel fontSize="small" className={classes.cancel} />
                                </IconButton>
                            </Tooltip>
                        }
                        <Tooltip title="edit" arrow>
                                <IconButton aria-label="settings" onClick={() => handleForm(row)}>
                                    <Edit fontSize="small" />
                                </IconButton>
                        </Tooltip>
                        </TableCell>
                    </TableRow>)
                    }                 
                </TableBody>
            </Table>
        </TableContainer>
      );

      const form = () => (
        <Grid item xs={12} md={6}>
        <Card className={classes.card}>
        <form noValidate autoComplete="on">
            {console.log(values.perfil)}
            <Typography variant="h4" component="h4">
                Edit User
            </Typography>
            <CardContent >
            <TextField 
                id="name"
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                className={classes.input}/>
            <TextField 
                id="email"
                name="email"
                label="email"
                value={values.email}
                onChange={handleChange}
                className={classes.input}/>
            <InputLabel  shrink id="rolLabel">
                Rol
            </InputLabel>
            <Select
                  className={classes.input}
                  labelId="rolLabel"
                  id="rol"
                  value={values.perfil}
                  onChange={handleChangePerfil}
                >
                  { roles.map((rol)=>
                    <MenuItem key={rol.id} value={rol.id} selected={values.perfil.id == rol.id }>
                    <em>{rol.name}</em>
                  </MenuItem>
                  )}
                </Select>
            <Button
                disabled={values.loading}
                variant="contained"
                color={values.loading ? "inherit" :"secondary"}
                size="large"
                startIcon={<SaveIcon />}
                className={classes.button}>
                Save
            </Button>
            <Button
                variant="contained"
                size="large"
                onClick={()=> setValues({...values, name: '', email: '', perfil: '', id: '', form: false})}
                startIcon={<ArrowLeft />}
                className={classes.button}>
                Cancel
            </Button>
            {values.loading ? <CircularProgress size={24} />: ''}
            </CardContent>
        </form>
      </Card>
      </Grid>
      );

    return (
        <div>
            <Backdrop className={classes.backdrop} open={values.loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
                {values.form ? form() : table()}
            <AlertBar
                message={values.message}
                error={values.error}
                open={values.open}
                handleClose={handleClose}
            />
        </div>
    )
}

export default TableUsers
