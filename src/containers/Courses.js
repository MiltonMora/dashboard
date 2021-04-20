import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { DataGrid} from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Edit from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles((theme) => ({
    grid: {
        
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'name', width: 130 },
    { field: 'StartData', headerName: 'Start Data', width: 130 },
    { field: 'Teacher', headerName: 'Teacher',  width: 130},
  ];
  
  const rows = [
    { id: 1, Name: 'Snow', StartData: 'Jon', Teacher: '35' },
    { id: 2, Name: 'Lannister', StartData: 'Cersei', Teacher: '42' },
    { id: 3, Name: 'Lannister', StartData: 'Jaime', Teacher: '45' },
    { id: 4, Name: 'Stark', StartData: 'Arya', Teacher: '16' },
    { id: 5, Name: 'Targaryen', StartData: 'Daenerys', Teacher: 'null' },
    { id: 6, Name: 'Melisandre', StartData: null, Teacher: '150' },
    { id: 7, Name: 'Clifford', StartData: 'Ferrara', Teacher: '44' },
    { id: 8, Name: 'Frances', StartData: 'Rossini', Teacher: '36' },
    { id: 9, Name: 'Roxie', StartData: 'Harvey', Teacher: '65' },
  ];

const Courses = () => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        load: true,
        form: false
      });

    const table = () => (
        <div style={{ height: '90vh', minWidth: '100%' }}>
            <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={10}
                className={classes.grid}
            />
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={handleForm}
            >
                <AddIcon />
            </Fab>
        </div>
    )

    const form = () => (
        <Grid item xs={12} md={6}>
        <Card className={classes.card}>
        <form noValidate autoComplete="on">
            <Typography variant="h4" component="h4">
                Edit User
            </Typography>
            <CardContent >
            <TextField 
                id="name"
                name="name"
                label="Name"
                />
            <Button
                disabled={values.load}
                variant="contained"
                color={values.load ? "inherit" :"secondary"}
                size="large"
                startIcon={<SaveIcon />}>
                Save
            </Button>
            <Button
                variant="contained"
                size="large"
                onClick={handleForm}
                startIcon={<ArrowLeft />}>
                Cancel
            </Button>
            </CardContent>
        </form>
      </Card>
      </Grid>
      );

    const handleForm = () => {
        setValues({
            ...values,
            form: !values.form
        }); 
    }

    return (
        values.form ? form(): table()
    )
}

export default Courses
