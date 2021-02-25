import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { baseRoute, useAuth } from '../../ProvideAuth'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import { MuiPickersUtilsProvider} from '@material-ui/pickers'
import {Form, Field} from 'react-final-form'
import {Select} from 'final-form-material-ui'


const useStyles = makeStyles((theme) => ({
    modifyButton:{
        backgroundColor: "#00e676"
    },
    modifyButtonHover:{
        '&:hover':{
            backgroundColor: "#00c853"
        }
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "100%"
    },
    paperContainer: {
        padding: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    boxContainer: {
        width: '100%',
    },
}));


export default function Classi() {
    return (
        <>
            <Grid item xs={12}>
                <TableBella />
            </Grid>
        </>
    );
}

function TableBella() {
    const auth = useAuth();
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);
    const [reloader, setReloader] = useState(null);

    


    const fetchData = async () =>{
        axios
            .get(`${baseRoute}/classi/all`)
            .then(function (response) {
                console.log(response);
                const temp = [...response.data['data'].map(d => {
                    return {
                        id: d.id,
                        classe: d.classe,
                        sezione: d.sezione,
                        indirizzo: d.indirizzo,
                        modifica: <Button variant="contained" className={`${classes.modifyButton} ${classes.modifyButtonHover}`} onClick={() => { deleteFromTable(d.id) }}>
                            MODIFICA
                                    </Button>,
                        cancella: <Button variant="contained" color="secondary" onClick={() => { deleteFromTable(d.id) }}>
                            CANCELLA
                                    </Button>
                    }
                })]
                console.log("temp", temp);
                setData(temp);
            })
            .catch(function (error) {
                console.log(error);
                setError(true);
            })
            .finally(function () {
                setLoading(false);
            });
    }


    const onSubmit = async data => {
        console.log("form submitted");
        console.log(data);
    }


    useEffect(() => {
        setError(false);
        setLoading(true);
        fetchData()
        // eslint-disable-next-line
    }, [reloader]);

    const deleteFromTable = (id) =>{
        console.log(auth.token, id);
        axios.delete(`${baseRoute}/classi/delete`, {
            data: {
                token: auth.token,
                idclasse: id
            }
        }).then(res =>{
            console.log(res);
            if(res.data.status==="rejected"){
                setError(res.data.cause);
            }
            else setReloader(Math.random());
        })
    }


    return isLoading ? (
        <CircularProgress />
    ) : (
            <>
                <Grid item xs={12} md={6}>
                    <Box>
                        <Form 
                            onSubmit={onSubmit}
                            initialValues={{classe: 3}}
                            render={({handleSubmit, reset, submitting, pristine, values}) => (
                                <form onSubmit={handleSubmit} noValidate>
                                    <Paper className={classes.paperContainer}>
                                        <Grid container alignItems="flex-start" spacing={2}>
                                            <Typography variant="h6" component="h1">
                                                Crea Nuova Classe
                                            </Typography>
                                            <Grid item xs={12}>
                                                <FormControl className={classes.formControl}>
                                                    <Field
                                                        fullWidth
                                                        name="classe"
                                                        component={Select}
                                                        label="Classe"
                                                        formControlProps={{ fullWidth: true }}
                                                    >
                                                        <MenuItem value={3}>3ª</MenuItem>
                                                        <MenuItem value={4}>4ª</MenuItem>
                                                        <MenuItem value={5}>5ª</MenuItem>
                                                    </Field>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                            
                                        

                                        <Box className={classes.boxContainer}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={submitting}
                                            >
                                                Submit
                                        </Button>
                                        </Box>
                                        
                                    </Paper>
                                </form>
                            )
                            }
                        />
                    </Box>
                </Grid>
            {isError}
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell scope="col" component="th">
                                ID
                            </TableCell>
                            <TableCell scope="col" component="th">
                                classe
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Sezione
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Indirizzo
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Modifica Classe
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Cancella Classe
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(({ id, classe, sezione, indirizzo, modifica, cancella }) =>
                            <TableRow key={id}>
                                <TableCell scope="row"  >{id}</TableCell>
                                <TableCell scope="row"  >{classe}</TableCell>
                                <TableCell scope="row"  >{sezione}</TableCell>
                                <TableCell scope="row"  >{indirizzo}</TableCell>
                                <TableCell scope="row"  >{modifica}</TableCell>
                                <TableCell scope="row"  >{cancella}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            </>
        );
}


/*
<Paper className={classes.paperContainer}>
                            <Box className={classes.boxContainer}>
                                <Typography variant="h6" component="h1">
                                    Crea Nuova Classe
                                </Typography>

                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel>Classe</InputLabel>
                                        <Select label="Classe" defaultValue={3}
                                            id="classe-select"


                                        >
                                            <MenuItem value={3}>3ª</MenuItem>
                                            <MenuItem value={4}>4ª</MenuItem>
                                            <MenuItem value={5}>5ª</MenuItem>
                                        </Select>

                                </FormControl>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel>Sezione</InputLabel>
                                    <Select label="Sezione" name="sezione" defaultValue={'A'} >
                                        <MenuItem value={'A'}>A</MenuItem>
                                        <MenuItem value={'B'}>B</MenuItem>
                                        <MenuItem value={'C'}>C</MenuItem>
                                        <MenuItem value={'D'}>D</MenuItem>
                                        <MenuItem value={'E'}>E</MenuItem>
                                        <MenuItem value={'F'}>F</MenuItem>
                                        <MenuItem value={'G'}>G</MenuItem>
                                        <MenuItem value={'H'}>H</MenuItem>
                                        <MenuItem value={'I'}>I</MenuItem>
                                        <MenuItem value={'L'}>L</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel>Indirizzo</InputLabel>
                                    <Select label="Indirizzo" defaultValue={'SA'}>
                                        <MenuItem value={'SA'}>Scienze Applicate</MenuItem>
                                        <MenuItem value={'INF'}>Informatico</MenuItem>
                                        <MenuItem value={'REL'}>Relazioni Internazionali</MenuItem>
                                        <MenuItem value={'GR'}>Grafico</MenuItem>
                                    </Select>
                                </FormControl>

                            </Box>

                            <Box className={classes.boxContainer}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"

                                    fullWidth
                                >
                                    Cambia Classe
                                </Button>
                            </Box>
                        </Paper>
                        */