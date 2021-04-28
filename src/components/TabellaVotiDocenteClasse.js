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
import { baseRoute } from 'ProvideAuth';
import { CircularProgress, Typography, FormControl, MenuItem } from '@material-ui/core';
import { Select } from 'final-form-material-ui';
import axios from 'axios';
import { useAuth } from 'ProvideAuth';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { AddValutation, EditValutation } from './ComponentProject';

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
    const [toast, toaster] = useState(null);
    const [openAddValutation, setOpenAddValutation] = useState(false);
    const [openEditValutation, setOpenEditValutation] = useState(false);
    const [reloader, setReloader] = useState(null);

    const [infoVoto, setInfoVoto] = useState({
        iduser: '',
        nome: '',
        cognome: '',
        data: '',
    });

    const [votoEdit, setVotoEdit] = useState(null);

    const handleOpenAddValutation = ({ iduser, nome, cognome, idprogetto, data }) => {
        setInfoVoto({ iduser, nome, cognome, idprogetto, data });
        setOpenAddValutation(true);
    };

    const handleCloseAddValutation = () => {
        setInfoVoto({
            iduser: '',
            nome: '',
            cognome: '',
            idprogetto: '',
            data: '',
        });
        setOpenAddValutation(false);
    };

    const handleOpenEditValutation = ({ idvoto, nome, cognome }) => {
        setVotoEdit({ idvoto: idvoto, nome: nome, cognome: cognome });
        setOpenEditValutation(true);
    };

    const handleCloseEditValutation = () => {
        setVotoEdit({ idvoto: '', nome: '', cognome: '' });
        setOpenEditValutation(false);
    };

    useEffect(() => {
        setError(false);
        setOpenAddValutation(false);
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
    }, [reloader]);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <>
            <Modal open={openEditValutation} onClose={handleCloseEditValutation} className={classes.modal}>
                <EditValutation vid={votoEdit} updater={setReloader} toaster={toaster} />
            </Modal>
            <Modal open={openAddValutation} onClose={handleCloseAddValutation} className={classes.modal}>
                <AddValutation infoVoto={infoVoto} updater={setReloader} toaster={toaster} />
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
                                        {voto.voto ? (
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                onClick={() => {
                                                    console.log('QUESTO è IL VOTOOOOOOOOO', voto);
                                                    handleOpenEditValutation({ idvoto: voto.idvalutazione, nome: user.nome, cognome: user.cognome });
                                                }}
                                            >
                                                {voto.voto}
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                onClick={() => {
                                                    handleOpenAddValutation({ iduser: user.iduser, nome: user.nome, cognome: user.cognome, idprogetto: infoProgetto.id });
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
            {toast}
        </>
    );
}
/*
const EditValutation = ({ vid, updater }) => {
    const classes = useStyles();
    const auth = useAuth();
    const [infoTutto, SetInfoTutto] = useState();
    const [loading, setLoading] = useState(true);
    const { idvoto, nome, cognome } = vid;

    useEffect(() => {
        axios
            .get(`${baseRoute}/voti/voti/${idvoto}`, { params: { token: auth.token } })
            .then((res) => {
                console.log('EDIT VOTOOOOOOOOOOO> ', res.data.data);
                SetInfoTutto(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
        // eslint-disable-next-line
    }, []);

    const onSubmit = async (data) => {
        console.log(data);
        const req = {
            voto: data.voto,
            descrizione: data.descV,
            data: data.dataV,
        };

        await axios
            .put(`${baseRoute}/voti/voti/${idvoto}`, { token: auth.token, data: req })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
        updater(Math.random());
    };

    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ voto: infoTutto.valutazione, descV: infoTutto.descrizione, dataV: infoTutto.data.split('T')[0] }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <Paper className={classes.paperContainer}>
                                <Typography variant="h6" component="h1" color="initial">
                                    Modifica il voto allo studente
                                    {nome} {cognome}
                                </Typography>
                                <FormControl className={classes.formControl}>
                                    <Field fullWidth name="voto" component={Select} label="Voto" formControlProps={{ fullWidth: true }}>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={3.5}>3.5</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={4.5}>4.5</MenuItem>
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
                                    <Field fullWidth name="descV" component={TextField} type="text" label="Descrizione Voto" />
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
            )}
        </Box>
    );
};

const AddValutation = ({ infoVoto, updater }) => {
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
                    descrizione: data.descV,
                    date: data.dataV,
                },
            })
            .then(function (response) {
                console.log(response);
                updater(Math.random());
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Box>
            <Form
                onSubmit={onSubmit}
                initialValues={{ voto: 6, descV: '', dataV: new Date(Date.now()).toISOString().split('T')[0] }}
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
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={4.5}>4.5</MenuItem>
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
                                <Field fullWidth name="descV" component={TextField} type="text" label="Descrizione Voto" />
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
*/