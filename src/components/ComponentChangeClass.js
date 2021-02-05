import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { baseRoute } from '../ProvideAuth';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function ComponentChangeClass() {
    const classes = useStyles();

    const [classe, setClasse] = useState(4);

    const handleClasseChange = (e) => {
        setClasse(e.target.value);
    };

    const [sezione, setSezione] = useState('D');

    const handleSezioneChange = (e) => {
        setSezione(e.target.value);
    };

    const [indirizzo, setIndirizzo] = useState('INF');

    const handleIndirizzoChange = (e) => {
        setIndirizzo(e.target.value);
    };

    const handleChange = async ({classe, sezione, indirizzo}) => {
        axios
            .put(`${baseRoute}/studenti/cambiaClasse`, {
                token: localStorage.getItem('token'),
                data: {
                    classe: classe,
                    sezione: sezione,
                    indirizzo: indirizzo,
                    as: '2019/20',
                }
            }
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    return (
        <Box component="div" display="flex" alignItems="center">
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Classe</InputLabel>
                <Select label="Classe" onChange={handleClasseChange} value={classe}>
                    <MenuItem value={3}>3ª</MenuItem>
                    <MenuItem value={4}>4ª</MenuItem>
                    <MenuItem value={5}>5ª</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Sezione</InputLabel>
                <Select label="Sezione" onChange={handleSezioneChange} value={sezione}>
                    <MenuItem value={'A'}>A</MenuItem>
                    <MenuItem value={'B'}>B</MenuItem>
                    <MenuItem value={'C'}>C</MenuItem>
                    <MenuItem value={'D'}>D</MenuItem>
                    <MenuItem value={'E'}>E</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Indirizzo</InputLabel>
                <Select label="Sezione" onChange={handleIndirizzoChange} value={indirizzo}>
                    <MenuItem value={'SA'}>Scienze Applicate</MenuItem>
                    <MenuItem value={'INF'}>Informatico</MenuItem>
                    <MenuItem value={'REL'}>Relazioni Internazionali</MenuItem>
                    <MenuItem value={'GR'}>Grafico</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={() => {handleChange({classe, sezione, indirizzo})}}>
                Cambia Classe
            </Button>
        </Box>
    );
}
