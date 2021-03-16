import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import themeColors from '../containers/ThemeColors';
import Chip from '@material-ui/core/Chip';
import { DataGrid } from '@material-ui/data-grid';

import { getUsers } from '../actions/UserActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  color: {
    backgroundColor: "RGBA(255,255,255,0.5)",
    textAlign: 'center',
  },
  colorContent: {
  },
  data: {
    
  }
}));


function Users() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    load: true,
    data: {},
    errorMessage: '',
  });

  useEffect(()=> {
    getUsers()
    .then(res => {
        setValues({...values, data: res, load: false});
      })
    .catch(err => {
      setValues({...values, errorMessage: err, load: false});
      })
  },[]);

  const columns = [
    { field: 'id', headerName: 'ID'},
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  return (
    <div className={classes.root}>
      <Grid container >
        <Grid className={classes.color} >
          <img className={classes.colorContent} src='https://uaq-capp-academico.com/public/img/loader2.gif' />
          <Chip className={classes.colorContent}
            label="Cargando ....."
            color="primary"
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Users
