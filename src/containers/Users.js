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
import Typography from '@material-ui/core/Typography';

import { getUsers } from '../actions/UserActions';
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
  },
  modal: {
    border: 'none',
  },
}));


function Users() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    load: true,
    data: [],
    errorMessage: '',
  });

  const handleBusinessString = (index) => {
    if (values.data[index].business != 'all') {
      let business = '';
      values.data[index].business.map(el =>(
        business += `${el.name} ` 
      ))
      return business
    }
    return values.data[index].business
  }

  useEffect(()=> {
    getUsers()
    .then(res => {
        setValues({...values, data: res.data.data, load: false});
      })
    .catch(err => {
      setValues({...values, errorMessage: err, load: false});
      })
  },[]);

  return (
    <div className={classes.root}>
      <Grid container >
        {values.load ?
          <Grid className={classes.color} >
            <img className={classes.colorContent} src='https://uaq-capp-academico.com/public/img/loader2.gif' />
            <Chip className={classes.colorContent}
              label="Cargando ....."
              color="primary"
            />
          </Grid>:
          <Grid item xs={12}>
            <TableContainer >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Rol</TableCell>
                    <TableCell align="left">Business</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                     { values.data.map((row, index) => 
                     <TableRow className={classes.row} key={row.email}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.rol}</TableCell>
                        <TableCell align="left">{handleBusinessString(index)}</TableCell>
                      </TableRow>)
                     }                 
                </TableBody>
              </Table>
            </TableContainer>
            <SimpleModal className={classes.modal}>
            <Card className={classes.card}>
              <CardContent>
                
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
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
