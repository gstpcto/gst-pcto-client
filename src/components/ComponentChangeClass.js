import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Paper, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { baseRoute, getCurrentYear, useAuth } from 'ProvideAuth';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
    error: {
        color: "red",
    },
    success: {
        color: "green"
    }
}));

export default function ComponentChangeClass() {
    const  classes = useStyles();
    const auth = useAuth();
    const y = getCurrentYear()
    const [classe, setClasse] = useState(4);
    const [sezione, setSezione] = useState('D');
    const [indirizzo, setIndirizzo] = useState('INF');
    const [error, setError] = useState("");
    const [response, setResponse] = useState("")
    

    useEffect(() => {
        console.log(auth.token);
        axios.get(`${baseRoute}/studenti/${auth.user['id']}`, { params: { token: auth.token} }).then(r=>{
            console.log("dati", r.data);
            const {classe: c, indirizzo: i, sezione: s} = r.data.data;
            //console.log(typeof c, typeof s, typeof i);
            setClasse(c);
            setSezione(s);
            setIndirizzo(i)
        })
    }, [auth])



    const handleClasseChange = (e) => {
        setClasse(e.target.value);
    };


    const handleSezioneChange = (e) => {
        setSezione(e.target.value);
    };


    const handleIndirizzoChange = (e) => {
        setIndirizzo(e.target.value);
    };

    const handleChange = async ({ classe, sezione, indirizzo }) => {
        console.log('button click'); //TODO: remove
        console.log(classe, sezione, indirizzo);

        axios
            .put(`${baseRoute}/studenti/cambiaClasse`, {
                token: localStorage.getItem('token'),
                data: {
                    classe: classe,
                    sezione: sezione,
                    indirizzo: indirizzo,
                    as: getCurrentYear(),
                },
            })
            .then(function (response) {
                console.log(response);
                if(response.data.status==="rejected") setError(response.data.cause)
                else setResponse("classe aggiornata con successo")
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Paper className={classes.paperContainer}>
            <Box className={classes.boxContainer}>
                <Typography variant="h6" component="h1">
                    Cambia Classe - {y}
                </Typography>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel>Classe</InputLabel>
                    <Select label="Classe" onChange={handleClasseChange} value={classe}>
                        <MenuItem value={3}>3ª</MenuItem>
                        <MenuItem value={4}>4ª</MenuItem>
                        <MenuItem value={5}>5ª</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel>Sezione</InputLabel>
                    <Select label="Sezione" onChange={handleSezioneChange} value={sezione}>
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
                    <Select label="Sezione" onChange={handleIndirizzoChange} value={indirizzo}>
                        <MenuItem value={'SA'}>Scienze Applicate</MenuItem>
                        <MenuItem value={'INF'}>Informatico</MenuItem>
                        <MenuItem value={'REL'}>Relazioni Internazionali</MenuItem>
                        <MenuItem value={'GR'}>Grafico</MenuItem>
                    </Select>
                </FormControl>
                <Typography variant="h7" component="h9" className={classes.error} >
                    {error}
                </Typography>
                <Typography variant="h7" component="h9" className={classes.success} >
                    {response}
                </Typography>
            </Box>

            <Box className={classes.boxContainer}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        handleChange({ classe, sezione, indirizzo });
                    }}
                    fullWidth
                >
                    Cambia Classe
                </Button>
            </Box>
        </Paper>
    );
}
