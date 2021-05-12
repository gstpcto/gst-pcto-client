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
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import { OnChange } from 'react-final-form-listeners';
import { Transition } from 'components/admin/StudentiAdminQuattro';
import PWResetForm from 'components/admin/PWResetForm';
import { theme } from 'theme';
import CSVDropzone from 'components/CSVDropzone';
import ConfirmButton from 'components/confirmDeleteButton';
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
        margin: theme.spacing(2),
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
    form: {
        display: 'inline-flex',
    },
    heroContent: {
        padding: theme.spacing(4, 0, 6),
    },
    margin: {
        margin: theme.spacing(2),
    },
    marginLeft: {
        marginLeft: theme.spacing(2),
    },
    marginBottom: {
        marginBottom: theme.spacing(4),
    },
}));

const Docenti = () => {
    const classes = useStyles();
    const auth = useAuth();
    const [reloader, setReloader] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [docenti, setDocenti] = useState([]);
    const [docente, setDocente] = useState(null);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [toast, toaster] = useState(null);

    const resetter = async () => {
        toaster(null);
    };
    //dialog handlers
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setReloader(Math.random());
    };
    //modal handlers
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    //csv upload modal
    const [openCaricaCSV, setOpenCaricaCSV] = useState(false);

    const handleOpenCaricaCSV = () => {
        setOpenCaricaCSV(true);
    };
    const handleCloseCaricaCSV = () => {
        setOpenCaricaCSV(false);
        setReloader(Math.random());
    };

    const cancellaDocente = async (id) => {
        await axios.delete(`${baseRoute}/docenti/delete/${id}`, { data: { token: auth.token } })
        .then((r) => {
            console.log(r);
            resetter().then(() => {
                toaster(<SuccessAlert message={r.data.message} />)
            })
        }).catch((err) => {
            resetter().then(() => {
                toaster(<ErrorAlert message={err.response.data.cause} />)
            })
        });
        setReloader(Math.random());
    };

    useEffect(() => {
        handleCloseModal();
        setOpenCaricaCSV(false);
        console.log('CARICANDO LA GENKIDAMA');
        const fetchData = async () => {
            return await axios.get(`${baseRoute}/docenti/all`, { params: { token: auth.token } });
        };

        fetchData()
            .then((res) => {
                console.log(res.data);
                setDocenti([
                    ...res?.data?.data?.map((d) => {
                        const modifica = (
                            <Button
                                variant="contained"
                                className={`${classes.modifyButton}`}
                                onClick={() => {
                                    console.log(d.id);
                                    setDocente(d.id);
                                    handleClickOpen();
                                }}
                            >
                                MODIFICA
                            </Button>
                        );
                        const elimina = (
                            <ConfirmButton
                                onClick={() => {
                                    cancellaDocente(d.id);
                                }}
                            />
                        );

                        return { ...d, modifica, elimina };
                    }),
                ]);
            })
            .then(() => {
                setLoading(false);
            });

        // eslint-disable-next-line
    }, [auth, reloader]);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <>
            {toast}
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <StudenteDialogContent did={docente} closer={handleClose} toaster={toaster} />
            </Dialog>

            <Modal //add classe modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="nuovo docente"
                aria-describedby="puoi aggiungere un nuovo docente"
                className={classes.modal}
            >
                <AggiungiDocente updater={setReloader} toaster={toaster}/>
            </Modal>

            <CSVDropzone isopen={openCaricaCSV} opener={handleOpenCaricaCSV} closer={handleCloseCaricaCSV} reloader={setReloader} route={`${baseRoute}/docenti/createMore`} toaster={toaster} />
            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
                    Docenti
                </Typography>
                <Box display="flex" justifyContent="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Button variant="contained" color="primary" style={{ margin: theme.spacing(1) }} onClick={handleOpenModal} width={{ xs: 'fullwidth', sm: 'auto' }}>
                        Aggiungi un Docente
                    </Button>
                    <Button variant="contained" color="primary" style={{ margin: theme.spacing(1) }} onClick={handleOpenCaricaCSV} width={{ xs: 'fullwidth', sm: 'auto' }}>
                        Importa Docenti
                    </Button>
                </Box>
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
                                Cognome
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Email
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Modifica
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Elimina
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {docenti.map(({ id, nome, cognome, email, modifica, elimina }) => (
                            <TableRow key={id}>
                                <TableCell scope="row">{id}</TableCell>
                                <TableCell scope="row">{nome}</TableCell>
                                <TableCell scope="row">{cognome}</TableCell>
                                <TableCell scope="row">{email}</TableCell>
                                <TableCell scope="row">{modifica}</TableCell>
                                <TableCell scope="row">{elimina}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

const StudenteDialogContent = ({ did, closer, toaster }) => {
    const classes = useStyles();
    const auth = useAuth();
    const [docente, setDocente] = useState(null);
    const [storico, setStorico] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [updater, setUpdater] = useState(null);
    //frequentare
    const resetter = async () => {
        toaster(null);
    };
    const [modificaStoricoModal, setModificaStoricoModal] = useState(false);
    const handleOpenModificaStorico = () => {
        setModificaStoricoModal(true);
    };
    const handleCloseModificaStorico = () => {
        setModificaStoricoModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            return await axios.get(`${baseRoute}/docenti/${did}`, { params: { token: auth.token } });
        };
        const fetchStorico = async () => {
            return await axios.get(`${baseRoute}/docenti/storico/${did}`, { params: { token: auth.token } });
        };

        fetchData()
            .then((res) => {
                console.log(res.data.data);
                setDocente(res.data.data);
            })
            .then(async () => {
                fetchStorico().then((res) => {
                    console.log('STORICO PROFESSORE', res.data.data);
                    setStorico(res.data.data);
                });
            })

            .then(() => {
                setLoading(false);
            });
        setModificaStoricoModal(false);
        // eslint-disable-next-line
    }, [updater]);

    const onSubmit = async (data) => {
        console.log('form submitted');
        console.log(data);
        axios
            .put(`${baseRoute}/docenti/updateAdmin`, { token: auth.token, idDocente: did, data })
            .then((res) => {
                resetter().then(() => {
                    toaster(<SuccessAlert message={res.data.message} />)
                })
            })
            .then(() => setUpdater(Math.random()))
            .catch((err)=>{
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
            });
    };

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
                        Info Docente
                    </Typography>

                    <Button autoFocus color="inherit" onClick={closer}>
                        OK
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container style={{ display: 'flex' }}>
                {/* modify data item */}
                <Grid item md={6} xs={12}>
                    <Typography variant="h6" component="h1" className={classes.marginLeft}>
                        Informazioni utente
                    </Typography>
                    <Paper className={classes.paperContainer}>
                        <Form
                            onSubmit={onSubmit}
                            initialValues={{ nome: docente.nome, cognome: docente.cognome, email: docente.email, codiceF: docente.codiceF, dataN: docente.dataN.split('T')[0] }}
                            render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit} noValidate>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="nome" component={TextField} type="text" label="Nome" />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="cognome" component={TextField} type="text" label="Cognome" />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="email" component={TextField} type="text" label="Email" />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="codiceF" component={TextField} type="text" label="Codice Fiscale" />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="dataN" component={TextField} type="date" label="Data di Nascita" />
                                    </FormControl>

                                    <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                        Aggiorna Dati
                                    </Button>
                                </form>
                            )}
                        />
                    </Paper>
                </Grid>
                <PWResetForm id={did} toaster={toaster}/>
                {/* tabella storico */}
                <Grid item md={12} xs={12}>
                    <Typography variant="h6" className={classes.title}>
                        Storico dello Docente
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleOpenModificaStorico} className={`${classes.marginLeft} ${classes.marginBottom}`}>
                        Aggiungi o Modifica
                    </Button>
                    <Modal //add classe modal
                        open={modificaStoricoModal}
                        onClose={handleCloseModificaStorico}
                        aria-labelledby="nuova classe"
                        aria-describedby="puoi aggiungere una nuova classe"
                        className={classes.modal}
                    >
                        <ModificaStorico updater={setUpdater} did={did} toaster={toaster} />
                    </Modal>
                    {/* tabella con le relazioni */}
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell scope="col" component="th">
                                        ID
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        Anno Scolastico
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        ID Classe
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        Indirizzo
                                    </TableCell>
                                    <TableCell scope="col" component="th">
                                        Descrizione
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {storico.map(({ relID, annoScolastico, idClasse, indirizzo, descrizione }) => (
                                    <TableRow key={relID}>
                                        <TableCell scope="row">{relID}</TableCell>
                                        <TableCell scope="row">{annoScolastico}</TableCell>
                                        <TableCell scope="row">{idClasse || 'NO'}</TableCell>
                                        <TableCell scope="row">{indirizzo || 'NO'}</TableCell>
                                        <TableCell scope="row">{!(idClasse === indirizzo && indirizzo === null) ? descrizione : descrizione.split(',')[0]}</TableCell>
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

const ModificaStorico = ({ updater, did, toaster }) => {
    console.log(did);
    const auth = useAuth();
    const classes = useStyles();
    const [classi, setClassi] = useState([]);
    const [indirizzi, setIndirizzi] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [options, setOptions] = useState(null);
    const resetter = async () => {
        toaster(null);
    };

    const onSubmit = async ({ annoScolastico, idclasse, indirizzo, ruolo }) => {
        console.log('form submitted');
        console.log(annoScolastico, idclasse, indirizzo, ruolo);

        if (ruolo === 1) {
            const req = {
                as: annoScolastico,
                idDocente: did,
                idClasse: idclasse,
            };
            await axios.put(`${baseRoute}/docenti/toReferenteClasse`, { token: auth.token, data: req }).then((res) => {
                console.log('OH MY GAH', res);
            })
            .then((res) => {
                resetter().then(() => {
                    toaster(<SuccessAlert message={res.data.message} />)
                })
            })
            .catch((err)=> {
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
            });
        }
        if (ruolo === 2) {
            const req = {
                as: annoScolastico,
                idDocente: did,
                indirizzo,
            };
            await axios
                .put(`${baseRoute}/docenti/toReferenteIndirizzo`, { token: auth.token, data: req })
                .then((res) => {
                    console.log('DOCENTE INDIRIZZO', res);
                })
                .then((res) => {
                    resetter().then(() => {
                        toaster(<SuccessAlert message={res.data.message} />);
                    });
                })
                .catch((err) => {
                    resetter().then(() => {
                        toaster(<ErrorAlert message={err.response.data.cause} />);
                    });
                });;
        }
        if (ruolo === 3) {
            await axios
                .put(`${baseRoute}/docenti/toReferenteAlternanza`, { token: auth.token, idDocente: did })
                .then((res) => {
                    resetter().then(() => {
                        toaster(<SuccessAlert message={res.data.message} />);
                    });
                })
                .catch((err) => {
                    resetter().then(() => {
                        toaster(<ErrorAlert message={err.response.data.cause} />);
                    });
                });;
        }

        updater(Math.random());
    };

    const changeOptions = async (value) => {
        console.log(value);
        switch (value) {
            case 1: {
                setOptions(
                    <FormControl key="salhd" className={classes.formControl}>
                        <Field fullWidth name="idclasse" component={Select} label="Classe" formControlProps={{ fullWidth: true }} validate={required}>
                            {classi}
                        </Field>
                    </FormControl>
                );
                break;
            }
            case 2: {
                setOptions(
                    <FormControl key="dfjsahfjlkda" className={classes.formControl}>
                        <Field fullWidth name="indirizzo" component={Select} label="Indirizzo" formControlProps={{ fullWidth: true }} validate={required}>
                            {indirizzi}
                        </Field>
                    </FormControl>
                );
                break;
            }
            case 3: {
                setOptions(<Typography color="secondary">ATTENZIONE questa funzione è molto pericolosa</Typography>);
                break;
            }
            default: {
                setOptions(null);
            }
        }
    };

    const fetchData = async () => {
        return await axios.get(`${baseRoute}/classi/all`).then((res) => {
            setClassi([...res.data.data.map((item) => <MenuItem value={item.id}>{`${item.classe}${item.sezione} ${item.indirizzo}`}</MenuItem>)]);
        });
    };
    const fetchIndirizzi = async () => {
        return await axios
            .get(`${baseRoute}/classi/getIndirizzi`)
            .then((res) => {
                console.log(res.data.data, 'SADASJDASLHD');
                setIndirizzi([...res.data.data.map(({ indirizzo }) => <MenuItem value={indirizzo}>{indirizzo}</MenuItem>)]);
            })
            .then((res) => {
                resetter().then(() => {
                    toaster(<SuccessAlert message={res.data.message} />);
                });
            })
            .catch((err) => {
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />);
                });
            });;
    };

    useEffect(() => {
        fetchData()
            .then(fetchIndirizzi)
            .then(() => {
                setLoading(false);
            });
    // eslint-disable-next-line
    }, [did, updater]);

    const required = (value) => (value ? undefined : 'Required');
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
                                <Field fullWidth required name="ruolo" component={Select} type="text" label="Ruolo" validate={required}>
                                    <MenuItem value={1}>Docente, referente di Classe</MenuItem>
                                    <MenuItem value={2}>Docente, referente di Indirizzo</MenuItem>
                                    <MenuItem value={3}>Docente, referente di Alternanza</MenuItem>
                                </Field>
                            </FormControl>
                            <OnChange name="ruolo">
                                {(value, previous) => {
                                    changeOptions(value);
                                }}
                            </OnChange>

                            {options}

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

const AggiungiDocente = ({ updater, toaster }) => {
    const classes = useStyles();
    const auth = useAuth();
    const resetter = async () => {
        toaster(null);
    };

    const onSubmit = async ({ mail, pass, name, surname, codiceF, date, annoScolastico: as, idclasse }) => {
        const req = { mail, pass, name, surname, codiceF, date, as, idclasse };
        axios
            .post(`${baseRoute}/docenti/create`, { token: auth.token, data: req })
            .then((res) => {
                console.log(res);
            })
            .then((res) => {
                resetter().then(() => {
                    toaster(<SuccessAlert message={res.data.message} />);
                });
            })
            .then(() => {
                updater(Math.random());
            })
            .catch((err) => {
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />);
                });
            });;
    };
    const required = (value) => (value ? undefined : 'Required');

    return (
        <Box>
            <Form
                onSubmit={onSubmit}
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

export default Docenti;
