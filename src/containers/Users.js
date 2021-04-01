import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
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
import CircularProgress from '@material-ui/core/CircularProgress';


import { getUsers, getRoles, setNewUser } from '../actions/UserActions';
import SimpleModal from './Modal';
import themeColors from '../containers/ThemeColors';
import TableUsers from '../components/TableUsers';
import AlertBar from '../components/AlertBar';

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
    perfil: '',
    roles: [],
    name: '',
    email: '',
    open: false,
    error: false,
    loading: false,
    message: '',
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
        setValues({...values, load: false});
      })
      })
    .catch(err => {
      setValues({...values, load: false});
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
        setValues({...values, open: true, loading: false, error: true});
      }
      else {
        setValues({...values, load: true, loading: false, error: false});
        handleUsers()
      }
    })
    .catch(err => {
      console.log(err)
      setValues({...values, open: true, loading: false, error: true});
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
            <TableUsers data={values.data} handleUsers={handleUsers}/>
            <AlertBar
                message={values.message}
                error={values.error}
                open={values.open}
                handleClose={handleClose}
            />
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
