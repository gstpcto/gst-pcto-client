import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { baseRoute, useAuth } from 'ProvideAuth';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Slide from '@material-ui/core/Slide';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { Form, Field } from 'react-final-form';
import { Select, TextField } from 'final-form-material-ui';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import ConfirmButton from 'components/confirmDeleteButton';
import { OnChange } from 'react-final-form-listeners';
import PWResetForm from 'components/admin/PWResetForm';
import CSVDropzone from 'components/CSVDropzone';
import { theme } from 'theme';
import genYears from 'fragments/genYears';
import { SuccessAlert } from 'components/snackbars';
import { ErrorAlert } from 'components/snackbars';

const useStyles = makeStyles((theme) => ({
    modifyButton: {
        backgroundColor: green[500],
        color: 'white',
        '&:hover': {
            backgroundColor: green[600],
            color: 'white',
        },
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
    },
    paperContainer: {
        padding: theme.spacing(2),
    },
    heroContent: {
        padding: theme.spacing(4, 0, 6),
    },
    boxContainer: {
        width: '100%',
    },
    modal: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Studenti() {
    const auth = useAuth();
    const classes = useStyles();
    const [reloader, setReloader] = useState(null);
    const [uid, setUid] = useState(null);
    const [filter, setFilter] = useState('');
    const [filterClasse, setFilterClasse] = useState('');
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [toast, toaster] = useState(null);

    const resetter = async () => {
        toaster(null);
    }

    const cancellaStudente = async (id) => {
        await axios.delete(`${baseRoute}/studenti/delete/${id}`, { data: { token: auth.token } })
            .then((r) => {
                resetter().then(() => {
                    toaster(<SuccessAlert message={r.data.message} />)
                })
            })
            .catch(err => {
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
            })
        setReloader(Math.random());
    };

    const onSubmit = async ({ filtro, filtro2 }) => {
        console.log('form submitted');
        console.log(filtro);
        setFilter(filtro);
        setFilterClasse(filtro2);
    };


    const [openCaricaCSV, setOpenCaricaCSV] = useState(false);

    const handleOpenCaricaCSV = () => {
        setOpenCaricaCSV(true);
    };
    const handleCloseCaricaCSV = () => {
        setOpenCaricaCSV(false);
    };

    //modal aggiungi studente
    const [openNuovoStudente, setOpenNuovoStudente] = useState(false);

    const handleOpenNuovoStudente = () => {
        setOpenNuovoStudente(true);
    };
    const handleCloseNuovoStudente = () => {
        setOpenNuovoStudente(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpenNuovoStudente(false);
        const fetchData = async () => {
            axios
                .get(`${baseRoute}/studenti/all`, { params: { token: auth.token } })
                .then((res) => {
                    console.log(res.data.data);
                    if (res.data.data === undefined) {
                        console.error(res.data);
                    } else {
                        const temp = [
                            ...res.data.data.map((obj) => {
                                return {
                                    id: obj.id,
                                    email: obj.email,
                                    nome: `${obj.nome} ${obj.cognome}`,
                                    classe: obj.classe,
                                    modifica: (
                                        <Button
                                            variant="contained"
                                            className={`${classes.modifyButton}`}
                                            onClick={() => {
                                                console.log(obj.id);
                                                setUid(obj.id);
                                                handleClickOpen();
                                            }}
                                        >
                                            MODIFICA
                                        </Button>
                                    ),
                                    cancella: (
                                        <ConfirmButton
                                            onClick={() => {
                                                cancellaStudente(obj.id);
                                            }}
                                        />
                                    ),
                                };
                            }),
                        ];
                        console.log('temp', temp);
                        setData(temp);
                    }
                })
                .then(() => {
                    setLoading(false);
                });
        };
        fetchData();
        // eslint-disable-next-line
    }, [reloader, filter, filterClasse]);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <>
            <CSVDropzone isopen={openCaricaCSV} opener={handleOpenCaricaCSV} closer={handleCloseCaricaCSV} reloader={setReloader} route={`${baseRoute}/studenti/createMore`} />

            <Modal //add classe modal
                open={openNuovoStudente}
                onClose={handleCloseNuovoStudente}
                aria-labelledby="nuova studente"
                aria-describedby="puoi aggiungere un nuovo studente"
                className={classes.modal}
            >
                <NewStudente updater={setReloader} toaster={toaster} />
            </Modal>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <StudenteDialogContent uid={uid} updater={setReloader} closer={handleClose} reloader={reloader} toaster={toaster} />
            </Dialog>

            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
                    Studenti
                </Typography>

                <Box display="flex" justifyContent="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Button variant="contained" color="primary" style={{ margin: theme.spacing(1) }} onClick={handleOpenNuovoStudente}>
                        Nuovo Studente
                    </Button>

                    <Button variant="contained" color="primary" style={{ margin: theme.spacing(1) }} onClick={handleOpenCaricaCSV}>
                        Importa Studenti
                    </Button>
                </Box>

                <Form
                    md={12}
                    xs={12}
                    onSubmit={onSubmit}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} noValidate className={classes.form} onChange={handleSubmit}>
                            <FormControl className={classes.formControl} xs={9}>
                                <Field fullWidth name="filtro" component={TextField} type="text" label="Filtra studenti" />
                                <Field fullWidth name="filtro2" component={TextField} type="text" label="Filtra classi" />
                            </FormControl>
                        </form>
                    )}
                />
            </Container>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell scope="col" component="th">
                                ID
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Nome
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Classe
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Email
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Modifica
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Cancella
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .filter((item) => {
                                if (filter === null || filter === '' || filter === undefined) return true;
                                if (item.nome.trim().toLowerCase().includes(filter.trim().toLowerCase())) return true;
                                else return false;
                            })
                            .filter((item) => {
                                if (filterClasse === null || filterClasse === '' || filterClasse === undefined) return true;
                                if (item.classe.trim().toLowerCase().includes(filterClasse.trim().toLowerCase())) return true;
                                else return false;
                            })
                            .map(({ id, nome, email, modifica, cancella, classe }) => (
                                <TableRow key={id}>
                                    <TableCell scope="row">{id}</TableCell>
                                    <TableCell scope="row">{nome}</TableCell>
                                    <TableCell scope="row">{classe}</TableCell>
                                    <TableCell scope="row">{email}</TableCell>
                                    <TableCell scope="row">{modifica}</TableCell>
                                    <TableCell scope="row">{cancella}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {toast}
        </>
    );
}

const NewStudente = ({ updater, toaster }) => {
    const classes = useStyles();
    const auth = useAuth();
    const [classi, setClassi] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const resetter = async () => {
        toaster(null);
    }


    const onSubmit = async ({ mail, pass, name, surname, codiceF, date, annoScolastico: as, idclasse }) => {
        const req = { mail, pass, name, surname, codiceF, date, as, idclasse };
        axios
            .post(`${baseRoute}/studenti/create`, { token: auth.token, data: req })
            .then((res) => {
                console.log(res);
                resetter().then(() => {
                    toaster(<SuccessAlert message={res.data.message} />)
                })
            })
            .then(() => {
                updater(Math.random());
            })
            .catch(err => {
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
            })
    };
    const required = (value) => (value ? undefined : 'Richiesto');
    useEffect(() => {
        const fetchData = async () => {
            return await axios.get(`${baseRoute}/classi/allconcat`);
        };
        fetchData()
            .then((res) => {
                setClassi([...res.data.data.map((item) => <MenuItem value={item.id}>{item.classe} </MenuItem>)]);
            })
            .then(() => {
                setLoading(false);
            });
    }, []);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <Box>
            <Form
                onSubmit={onSubmit}
                initialValues={{ date: new Date(Date.now()).toISOString().split('T')[0] }}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper className={classes.paperContainer}>
                            <Typography variant="h6" component="h1">
                                Aggiungi studente
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="mail" component={TextField} type="email" label="Email" validate={required} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="pass" component={TextField} type="text" label="Password" validate={required} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="name" component={TextField} type="text" label="Nome" validate={required} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="surname" component={TextField} type="text" label="Cognome" validate={required} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="codiceF" component={TextField} type="text" label="Codice Fiscale" validate={required} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="date" component={TextField} type="date" label="Data di Nascita" validate={required} />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="annoScolastico" component={Select} type="text" label="Anno Scolastico" validate={required} >
                                    {genYears().map(o => <MenuItem value={o}>{o}</MenuItem>)}
                                </Field>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="idclasse" component={Select} label="Classe" formControlProps={{ fullWidth: true }} validate={required}>
                                    {classi}
                                </Field>
                            </FormControl>

                            <Button variant="contained" color="primary" type="submit">
                                FATTO
                            </Button>
                        </Paper>
                    </form>
                )}
            />
        </Box>
    );
};

const StudenteDialogContent = ({ uid, updater, closer, reloader, toaster }) => {
    const required = (value) => (value ? undefined : 'Richiesto');
    const [studente, setStudente] = useState(null);
    const [isLoading, setLoading] = useState(true);
    //frequentare
    const [storico, setStorico] = useState([]);
    // const [rid, setRid] = useState(null);
    const [openAggiungiAnnoModal, setOpenAggiungiAnnoModal] = useState(false);
    // eslint-disable-next-line
    const [openModificaAnnoModal, setOpenModificaAnnoModal] = useState(false);
    //voti
    const [voti, setVoti] = useState([]);
    const [vid, setVid] = useState(null); //contains the id of the mark to modify
    const [openModificaVoto, setOpenModficaVoto] = useState(false);
    const [openAggiungiVoto, setOpenAggiungiVoto] = useState(false);

    const auth = useAuth();
    const classes = useStyles();
    //frequentare
    const handleOpenAggiungiModal = () => {
        setOpenAggiungiAnnoModal(true);
    };

    const handleCloseAggiungiModal = () => {
        setOpenAggiungiAnnoModal(false);
    };
    //voti
    const handleCloseModificaVoto = () => {
        setOpenModficaVoto(false);
    };
    const handleOpenModificaVoto = () => {
        setOpenModficaVoto(true);
    };
    const handleOpenAggiungiVoto = () => {
        setOpenAggiungiVoto(true);
    };
    const handleCloseAggiungiVoto = () => {
        setOpenAggiungiVoto(false);
    };

    const resetter = async () => {
        toaster(null);
    }

    const onSubmit = async (data) => {
        console.log('form submitted');
        console.log(data);
        axios
            .put(`${baseRoute}/studenti/updateAdmin`, { token: auth.token, idstudente: studente.id, data })
            .then((r) => {
                console.log(r);
                resetter().then(() => {
                    toaster(<SuccessAlert message={r.data.message} />)
                })
            })
            .then(() => updater(Math.random()))
            .catch(err => {
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
            })
    };

    const cancella = async (id) => {
        console.log(auth.token, id);
        await axios
            .delete(`${baseRoute}/studenti/frequentare/${id}`, {
                data: { token: auth.token },
            })
            .then((res) => {
                console.log(res);
                resetter().then(() => {
                    toaster(<SuccessAlert message={res.data.message} />)
                })
                updater(Math.random())
            })
            .catch(err => {
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
            })
    };

    useEffect(() => {
        setLoading(true);
        console.log(`${baseRoute}/studenti/${uid}`);
        axios
            .get(`${baseRoute}/studenti/${uid}`, { params: { token: auth.token } })
            .then((res) => {
                setStudente(res.data.data);
                console.log(res.data.data);
            })
            .then(() => {
                axios
                    .get(`${baseRoute}/studenti/${uid}/storico`, { params: { token: auth.token } })
                    .then((res) => {
                        const temp = res.data.data;
                        console.log(temp);
                        const tabella = temp.map(({ annoScolastico, id, classe, sezione, indirizzo, idrelazione }) => {
                            const elimina = (
                                <ConfirmButton
                                    onClick={() => {
                                        cancella(idrelazione);
                                    }}
                                />
                            );

                            return {
                                annoScolastico,
                                id,
                                classe,
                                sezione,
                                indirizzo,
                                idrelazione,
                                elimina,
                            };
                        });

                        setStorico(tabella);
                        console.log(tabella);
                    })
                    .then(() => {
                        axios.get(`${baseRoute}/voti/voti`, { params: { token: auth.token, idstudente: uid } }).then((res) => {
                            const temp = res.data.data;

                            const votiFiniti = temp.map(({ data, descrizione, idProgetto, nome, valutazione, id }) => {
                                const modifica = (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setVid(id);
                                            handleOpenModificaVoto();
                                        }}
                                    >
                                        MODIFICA
                                    </Button>
                                );

                                return {
                                    data,
                                    descrizione,
                                    idProgetto,
                                    nome,
                                    valutazione,
                                    id,
                                    modifica,
                                };
                            });
                            console.log('VOTI', res.data.data);
                            setVoti(votiFiniti);
                        });
                    })
                    .then(() => {
                        setLoading(false);
                    });
            });

        //updater(Math.random())
        setOpenAggiungiAnnoModal(false);
        setOpenModificaAnnoModal(false);
        setOpenModficaVoto(false);
        setOpenAggiungiVoto(false);
        // eslint-disable-next-line
    }, [uid, auth, reloader]);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <Grid spacing={2}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={closer} aria-label="close">
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Info Studente
                    </Typography>

                    <Button autoFocus color="inherit" onClick={closer}>
                        OK
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container style={{ display: 'flex' }}>
                {/* update student data component */}
                <Grid item md={6} xs={12}>
                    <Typography variant="h6" component="h1">
                        Informazioni utente
                    </Typography>
                    <Paper className={classes.paperContainer}>
                        <Form
                            onSubmit={onSubmit}
                            initialValues={{ nome: studente.nome, cognome: studente.cognome, email: studente.email, codiceF: studente.codiceF, dataN: studente.dataN.split('T')[0] }}
                            render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit} noValidate>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="nome" component={TextField} type="text" label="Nome" validate={required} />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="cognome" component={TextField} type="text" label="Cognome" validate={required} />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="email" component={TextField} type="text" label="Email" validate={required} />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="codiceF" component={TextField} type="text" label="Codice Fiscale" validate={required} />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="dataN" component={TextField} type="date" label="Data di Nascita" validate={required} />
                                    </FormControl>

                                    <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                        Aggiorna Dati
                                    </Button>
                                </form>
                            )}
                        />
                    </Paper>
                </Grid>
                {/* password admin reset component */}
                <PWResetForm id={uid} toaster={toaster} />
                {/**storico delle classi frequentate */}
                <Grid item md={12} xs={12}>
                    <Typography variant="h6" className={classes.title}>
                        Storico dello Studente
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleOpenAggiungiModal}>
                        Aggiungi Anno
                    </Button>
                    <Modal //add classe modal
                        open={openAggiungiAnnoModal}
                        onClose={handleCloseAggiungiModal}
                        aria-labelledby="nuova classe"
                        aria-describedby="puoi aggiungere una nuova classe"
                        className={classes.modal}
                    >
                        <AggiungiAnnoModal updater={updater} studenteid={studente.id} toaster={toaster} />
                    </Modal>
                    {/* tabella con le relazioni */}
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell scope="col" component="th">
                                        Anno Scolastico
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        ID Classe
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        Classe
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        Sezione
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        Indirizzo
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        Elimina
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {storico.map(({ annoScolastico, id, classe, sezione, indirizzo, elimina }) => (
                                    <TableRow key={id}>
                                        <TableCell scope="row">{annoScolastico}</TableCell>
                                        <TableCell scope="row">{id}</TableCell>
                                        <TableCell scope="row">{classe}</TableCell>
                                        <TableCell scope="row">{sezione}</TableCell>
                                        <TableCell scope="row">{indirizzo}</TableCell>
                                        <TableCell scope="row">{elimina}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                {/* voti dello studente */}
                <Grid item md={12} xs={12}>
                    <Typography variant="h6" className={classes.title}>
                        Voti dello studente
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleOpenAggiungiVoto}>
                        Aggiungi Voto
                    </Button>

                    <Modal //modifica un voto
                        open={openModificaVoto}
                        onClose={handleCloseModificaVoto}
                        aria-labelledby="nuova classe"
                        aria-describedby="puoi aggiungere una nuova classe"
                        className={classes.modal}
                    >
                        <ModificaVoto updater={updater} vid={vid} toaster={toaster} />
                    </Modal>

                    <Modal open={openAggiungiVoto} onClose={handleCloseAggiungiVoto} aria-labelledby="nuova classe" aria-describedby="puoi aggiungere una nuova classe" className={classes.modal}>
                        <AggiungiVoto updater={updater} uid={uid} toaster={toaster} />
                    </Modal>

                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell scope="col" component="th">
                                        ID
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        ID Progetto
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        Nome Progetto
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        Data
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        valutazione
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        Modifica
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {voti.map(({ id, idProgetto, nome, data, valutazione, modifica }) => (
                                    <TableRow key={id}>
                                        <TableCell scope="row">{id}</TableCell>
                                        <TableCell scope="row">{idProgetto}</TableCell>
                                        <TableCell scope="row">{nome}</TableCell>
                                        <TableCell scope="row">{data.split('T')[0]}</TableCell>
                                        <TableCell scope="row">{valutazione}</TableCell>
                                        <TableCell scope="row">{modifica}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    );
};

//questo aggiunge una relazione
const AggiungiAnnoModal = ({ updater, studenteid, toaster }) => {
    const required = (value) => (value ? undefined : 'Richiesto');
    console.log(studenteid);
    const auth = useAuth();
    const classes = useStyles();
    const [classi, setClassi] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const resetter = async () => {
        toaster(null);
    }

    const onSubmit = async (data) => {
        console.log('form submitted');
        console.log(data);
        const { annoScolastico, idclasse } = data;
        const req = {
            as: annoScolastico,
            idclasse,
            idstudente: studenteid,
        };
        await axios.put(`${baseRoute}/studenti/cambiaClasse`, { token: auth.token, data: req })
            .then((res) => {
                console.log(res);
                resetter().then(() => {
                    toaster(<SuccessAlert message={res.data.message} />)
                })
                updater(Math.random());
            })
            .catch(err => {
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
            })

    };

    const fetchData = async () => {
        await axios.get(`${baseRoute}/classi/all`).then((res) => {
            setClassi([...res.data.data.map((item) => <MenuItem value={item.id}>{`${item.classe}${item.sezione} ${item.indirizzo}`}</MenuItem>)]);
        });
    };

    useEffect(() => {
        fetchData().then(() => {
            setLoading(false);
        });
    }, [studenteid, updater]);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <Box>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper className={classes.paperContainer}>
                            <Typography variant="h6" component="h1">
                                Aggiungi allo storico
                            </Typography>

                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="annoScolastico" component={Select} type="text" label="Anno Scolastico" validate={required}>
                                    {genYears().map((o) => (
                                        <MenuItem value={o}>{o}</MenuItem>
                                    ))}
                                </Field>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="idclasse" component={Select} label="Classe" formControlProps={{ fullWidth: true }} validate={required}>
                                    {classi}
                                </Field>
                            </FormControl>

                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Paper>
                    </form>
                )}
            />
        </Box>
    );
};


const ModificaVoto = ({ updater, vid, toaster }) => {
    const auth = useAuth();
    const classes = useStyles();
    const [voto, setVoto] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const resetter = async () => {
        toaster(null);
    }

    const required = (value) => (value ? undefined : 'Richiesto');
    const onSubmit = async ({ dataN: data, descrizione, voto }) => {
        console.log('form submitted');

        const req = {
            voto,
            descrizione,
            data,
        };

        await axios.put(`${baseRoute}/voti/voti/${vid}`, { token: auth.token, data: req })
            .then((res) => {
                console.log(res);
                resetter().then(() => {
                    toaster(<SuccessAlert message={res.data.message} />)
                })
                updater(Math.random());
            }).catch(err => {
                console.log(err);
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
            })

    };

    const deleteVoto = async () => {
        await axios.delete(`${baseRoute}/voti/voto/${vid}`, { data: { token: auth.token } })
            .then((res) => {
                console.log(res);
                resetter().then(() => {
                    toaster(<SuccessAlert message={res.data.message} />)
                })
                updater(Math.random());
            }).catch(err => {
                console.log(err);
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
            })
    };

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${baseRoute}/voti/voti/${vid}`, { params: { token: auth.token } }).then((r) => {
                console.log('ER VOTO', r.data.data);
                console.log(r);
                setVoto(r.data.data);
            });
        };
        fetchData().then(() => {
            setLoading(false);
        });
        // eslint-disable-next-line
    }, [vid, updater]);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <Box>
            <Form
                onSubmit={onSubmit}
                initialValues={{ dataN: voto.data.split('T')[0], docente: voto.docente, progetto: voto.nomeProgetto, descrizione: voto.descrizione, voto: voto.valutazione }}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper className={classes.paperContainer}>
                            <Typography variant="h6" component="h1">
                                Modifica Voto
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="dataN" component={TextField} type="date" label="Data" validate={required} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="docente" component={TextField} type="text" label="Docente" disabled />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="progetto" component={TextField} type="text" label="Progetto" disabled />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="descrizione" component={TextField} type="text" label="Descrizione voto" validate={required} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="voto" component={Select} label="Voto" formControlProps={{ fullWidth: true }} validate={required}>
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

                            <Box display="flex" justifyContent="space-between">
                                <Button variant="contained" color="primary" type="submit">
                                    FATTO
                                </Button>

                                <ConfirmButton onClick={deleteVoto} />
                            </Box>
                        </Paper>
                    </form>
                )}
            />
        </Box>
    );
};

const AggiungiVoto = ({ updater, uid, toaster }) => {
    const auth = useAuth();
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [progettiData, setProgettiData] = useState(null);
    const [progettiOptions, setProgettiOptions] = useState(null);
    const [docentiOptions, setDocentiOptions] = useState('');

    const resetter = async () => {
        toaster(null);
    }

    const onSubmit = async ({ data, descrizione, docente, progetto, voto }) => {
        const req = {
            idstudente: uid,
            idprogetto: progetto,
            valutazione: voto,
            date: data,
            descrizione,
            idDocente: docente,
        };

        await axios.post(`${baseRoute}/voti/voto`, { token: auth.token, data: req })
            .then((res) => {
                console.log(res);
                resetter().then(() => {
                    toaster(<SuccessAlert message={res.data.message} />)
                })
                updater(Math.random());
            }).catch(err => {
                console.log(err);
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
            })
    };

    const required = (value) => (value ? undefined : 'Richiesto');
    const changeOptions = (id) => {
        const docenti = progettiData.filter((item) => {
            return item.progetto.id === id;
        })[0]['docenti'];
        console.log('PIERJI', docenti);
        setDocentiOptions([
            ...docenti.map((d) => {
                return <MenuItem value={d.id}>{d.nome + ' ' + d.cognome}</MenuItem>;
            }),
        ]);
    };

    const fetchData = async () => {
        //i progetti dello studente
        // i docenti di quei progetti
        await axios.get(`${baseRoute}/progetti/myProjects/${uid}`, { params: { token: auth.token } }).then((r) => {
            const temp = r.data.data;
            setProgettiData(temp);
            console.log('PIPOPIPO', temp);
            setProgettiOptions([
                ...temp.map((p) => {
                    const { progetto } = p;
                    return <MenuItem value={progetto.id}>{progetto.nome}</MenuItem>;
                }),
            ]);
        });
    };

    useEffect(() => {
        fetchData().then(() => {
            setLoading(false);
        });
        // eslint-disable-next-line
    }, [updater]);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <Box>
            <Form
                onSubmit={onSubmit}
                initialValues={{ data: new Date(Date.now()).toISOString().split('T')[0], voto: 8 }}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Paper className={classes.paperContainer}>
                            <Typography variant="h6" component="h1">
                                Nuovo Voto
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="data" component={TextField} type="date" label="Data" validate={required} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="progetto" component={Select} label="Progetto" formControlProps={{ fullWidth: true }} validate={required}>
                                    {progettiOptions}
                                </Field>
                            </FormControl>
                            <OnChange name="progetto">
                                {(value, previous) => {
                                    changeOptions(value);
                                    console.log('IDK', value);
                                }}
                            </OnChange>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="docente" component={Select} label="Docente" validate={required}>
                                    {docentiOptions}
                                </Field>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="descrizione" component={TextField} type="text" label="Descrizione voto" validate={required} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field
                                    fullWidth
                                    name="voto"
                                    component={Select}
                                    label="Voto"
                                    formControlProps={{ fullWidth: true }}
                                    onChange={() => {
                                        console.log('SEX');
                                    }}
                                >
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

                            <Box display="flex" justifyContent="space-between">
                                <Button variant="contained" color="primary" type="submit">
                                    FATTO
                                </Button>
                            </Box>
                        </Paper>
                    </form>
                )}
            />
        </Box>
    );
};

export { Transition };
