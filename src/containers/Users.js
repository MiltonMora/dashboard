import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';



import { getUsers, getRoles, setNewUser } from '../actions/UserActions';
import SimpleModal from './Modal';
import themeColors from '../containers/ThemeColors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  color: {
    backgroundColor: "RGBA(255,255,255,0.5)",
    marginLeft: 'auto',
    marginRight: 'auto',
    color: themeColors.palette.primary.main,
  },
  colorContent: {
  },
  data: {
    
  },
  table: {
    border: '1px solid RGBA(0,0,0,0.1)',
  },
  row: {
    '&:hover': {
      background: "RGBA(0,0,0,0.1)",
   },
  },
  card: {
    border: 'none',
    boxShadow: 'none',
  },
  modal: {
    border: 'none',
  },
  input: {
    width: '100%',
    marginTop: '15px',
  },
  button: {
    margin: theme.spacing(1),
  },
}));


function Users() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    load: true,
    data: [],
    errorMessage: '',
    perfil: '',
    roles: [],
    name: '',
    email: '',
    open: false,
    loading: false,
  });

  useEffect(()=> {
    handleUsers()
  },[]);

  const handleUsers = () => {
    getUsers()
    .then(res => {
      getRoles()
      .then(rol => {
            setValues({...values, data: res.data.data, roles: rol.data.data, load: false});
      })
      .catch(erRol => {
        setValues({...values, errorMessage: erRol, load: false});
      })
      })
    .catch(err => {
      setValues({...values, errorMessage: err, load: false});
      })
  }
  const handleChangePerfil = (event) => {
    setValues({...values, perfil: event.target.value});
  }

  const handleSave = () => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("rol", values.perfil);
    data.append("password", '');
    setValues({...values, loading: true});
    setNewUser(data)
    .then(res => {
      if(res.data.status === undefined || res.data.status === 404) {
        setValues({...values, open: true, loading: false});
      }
      else {
        setValues({...values, load: true, loading: false});
        handleUsers()
      }
    })
    .catch(err => {
      console.log(err)
      setValues({...values, open: true, loading: false});
    })
  }

  const handleChange = event => {
    setValues({...values, [event.target.name]: event.target.value});
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
      }
    setValues({...values, open: false});
  };

  return (
    <div className={classes.root}>
      <Grid container >
        {values.load ?
          <Grid className={classes.color} >
            <img className={classes.colorContent} src='https://uaq-capp-academico.com/public/img/loader2.gif' />
            <Chip className={classes.colorContent}
              label="Cargando ....."
              color="primary"/>
          </Grid>:
          <Grid item xs={12}>
            <TableContainer >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Rol</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                     { values.data.map((row) => 
                     <TableRow className={classes.row} key={row.email}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.rol}</TableCell>
                        <TableCell align="left">{row.status ? 'active': 'no active'}</TableCell>
                      </TableRow>)
                     }                 
                </TableBody>
              </Table>
            </TableContainer>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                autoHideDuration={6000}
                open={values.open}
                onClose={handleClose}
                action={
                    <React.Fragment>
                      <IconButton size="large" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="large" />
                      </IconButton>
                    </React.Fragment>
                  }
                className={classes.alert}>
                <Alert onClose={handleClose} severity="error">
                <AlertTitle>Error</AlertTitle>
                Error Verifique los datos
                </Alert>
            </Snackbar>
            <SimpleModal className={classes.modal}>
            <Card className={classes.card}>
              <Typography variant="h4" component="h4">
                New User
              </Typography>
              <CardContent >
                <TextField 
                  className={classes.input}
                  id="name"
                  name="name"
                  label="Name"
                  onChange={handleChange}/>
                <TextField 
                  className={classes.input}
                  id="email"
                  name="email"
                  label="email"
                  onChange={handleChange}/>
                <InputLabel className={classes.input} shrink id="rolLabel">
                  Rol
                </InputLabel>
                <Select
                  className={classes.input}
                  labelId="rolLabel"
                  id="rol"
                  value={values.perfil}
                  onChange={handleChangePerfil}
                >
                  { values.roles.map((rol)=>
                    <MenuItem key={rol.id} value={rol.id}>
                    <em>{rol.name}</em>
                  </MenuItem>
                  )}
                </Select>
              </CardContent>
              <CardActions>
              <Button
                disabled={values.loading}
                variant="contained"
                color={values.loading ? "inherit" :"secondary"}
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleSave}>
                Save
              </Button>
              {values.loading ? <CircularProgress size={24} />: ''}
              </CardActions>
            </Card>
            </SimpleModal>
          </Grid>
        }
      </Grid>
    </div>
  )
}

export default Users
