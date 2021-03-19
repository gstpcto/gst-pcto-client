import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import { baseRoute } from '../ProvideAuth';
import { CircularProgress, Typography, FormControl, MenuItem } from '@material-ui/core';
import { Select } from 'final-form-material-ui';
import axios from 'axios';
import { useAuth } from '../ProvideAuth';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';

const useStyles = makeStyles((theme) => ({
    modal: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
    },
    paperContainer: {
        padding: theme.spacing(2),
    },
}));

export default function TabellaVotiDocenteClasse() {
    const auth = useAuth();
    const classes = useStyles();

    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [nomiProgetti, setNomiProgetti] = useState([]);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    const [infoVoto, setInfoVoto] = useState({
        iduser: '',
        nome: '',
        cognome: '',
        data: '',
    });

    const handleOpen = ({ iduser, nome, cognome, idprogetto, data }) => {
        setInfoVoto({ iduser, nome, cognome, idprogetto, data });
        setOpen(true);
    };

    const handleClose = () => {
        setInfoVoto({
            iduser: '',
            nome: '',
            cognome: '',
            idprogetto: '',
            data: '',
        });
        setOpen(false);
    };

    useEffect(() => {
        setError(false);
        setLoading(true);
        axios
            .get(`${baseRoute}/progetti/classiAlunni`, { params: { token: auth.token } })
            .then(function (response) {
                console.log(response);
                setNomiProgetti(response.data['progetti']);
            })
            .catch(function (error) {
                console.log(error);
                setError(true);
            })
            .finally(function () {
                setLoading(false);
            });

        axios
            .get(`${baseRoute}/progetti/progetti`, { params: { token: auth.token } })
            .then(function (response) {
                console.log(response);
                setData(response.data['progetti']);
            })
            .catch(function (error) {
                console.log(error);
                setError(true);
            })
            .finally(function () {
                setLoading(false);
            });
        // eslint-disable-next-line
    }, []);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <>
            <Modal open={open} onClose={handleClose} className={classes.modal}>
                <EditValutation infoVoto={infoVoto} />
            </Modal>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell scope="col" component="th"></TableCell>
                            {nomiProgetti.map(({ infoProgetto, ...rest }, index) => (
                                <TableCell key={index} scope="col" component="th">
                                    {infoProgetto.nome}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(({ user, progetti }, index) => (
                            <TableRow key={index}>
                                <TableCell scope="row">{`${user.nome} ${user.cognome}`}</TableCell>
                                {progetti.map(({ infoProgetto, voto }, indice) => (
                                    <TableCell key={indice} scope="row">
                                        {voto ? (
                                            <>{voto}</>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                onClick={() => {
                                                    handleOpen({ iduser: user.iduser, nome: user.nome, cognome: user.cognome, idprogetto: infoProgetto.id });
                                                    console.log({ iduser: user.iduser, nome: user.nome, cognome: user.cognome, idprogetto: infoProgetto.id });
                                                }}
                                            >
                                                Aggiungi voto
                                            </Button>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

const EditValutation = ({ infoVoto }) => {
    const classes = useStyles();
    const auth = useAuth();
    const onSubmit = async (data) => {
        axios
            .post(`${baseRoute}/voti/voto`, {
                token: auth.token,
                data: {
                    idstudente: infoVoto.iduser,
                    idprogetto: infoVoto.idprogetto,
                    valutazione: data.voto,
                    date: data.dataV,
                },
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Box>
            <Form
                onSubmit={onSubmit}
                initialValues={{ voto: 6, dataV: new Date(Date.now()).toISOString().split('T')[0] }}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper className={classes.paperContainer}>
                            <Typography variant="h6" component="h1" color="initial">
                                Aggiungi un voto allo studente
                                {infoVoto.nome} {infoVoto.cognome}
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="voto" component={Select} label="Voto" formControlProps={{ fullWidth: true }}>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={3.5}>3.5</MenuItem>
                                    <MenuItem value={4}>3</MenuItem>
                                    <MenuItem value={4.5}>3</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={5.5}>5.5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={6.5}>6.5</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={7.5}>7.5</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={8.5}>8.5</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={9.5}>9.5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Field>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="dataV" component={TextField} type="date" label="Data Voto" />
                            </FormControl>
                            <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                Modifica Valutazione
                            </Button>
                        </Paper>
                    </form>
                )}
            />
        </Box>
    );
};
