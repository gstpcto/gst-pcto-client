import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { baseRoute, useAuth } from 'ProvideAuth';
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
import Container from '@material-ui/core/Container';
import { theme } from 'theme';
import Error from 'components/ErrorHandler';
import ConfirmButton from 'components/confirmDeleteButton';
import { SuccessAlert, ErrorAlert } from 'components/snackbars';

const useStyles = makeStyles((theme) => ({
    modifyButton: {
        backgroundColor: green[500],
        color: 'white',
    },
    modifyButtonHover: {
        '&:hover': {
            backgroundColor: green[800],
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
    heroContent: {
        padding: theme.spacing(4, 0, 6),
    },
}));

export default function Classi() {
    return (
        <>
            <TableBella />
        </>
    );
}

function TableBella() {
    const auth = useAuth();
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [cid, setCid] = useState(null);
    const [toast, setToast] = useState(null);
    const [data, setData] = useState([]);
    const [reloader, setReloader] = useState(null);
    const [open, setOpen] = useState(false);
    const [openM, setOpenM] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenM = () => {
        setOpenM(true);
    };

    const handleCloseM = () => {
        setOpenM(false);
    };



    const cancellaClasse = async (id) => {
        await axios
            .delete(`${baseRoute}/classi/delete`, {
                data: {
                    token: auth.token,
                    idclasse: id,
                },
            })
            .then((res) => {
                console.log(res);
                const resetter = async () => {
                    setToast(null);
                }
                resetter().then(() => {
                    setToast(<SuccessAlert message={res.data.message} />)
                })
                setReloader(Math.random());
            }).catch(err => {
                const resetter = async () => {
                    setToast(null);
                }
                resetter().then(() => {

                    setToast(<SuccessAlert message={err.response.data.cause} />)
                })
            })
    }

    const fetchData = async () => {
        axios
            .get(`${baseRoute}/classi/all`)
            .then(function (response) {
                console.log(response);
                const temp = [
                    ...response.data['data'].map((d) => {
                        return {
                            id: d.id,
                            classe: d.classe,
                            sezione: d.sezione,
                            indirizzo: d.indirizzo,
                            modifica: (
                                <Button
                                    variant="contained"
                                    className={`${classes.modifyButton} ${classes.modifyButtonHover}`}
                                    onClick={() => {
                                        console.log(d.id);
                                        setCid(d.id);
                                        handleOpenM();
                                    }}
                                >
                                    MODIFICA
                                </Button>
                            ),
                            cancella: (
                                <ConfirmButton
                                    onClick={() => {
                                        cancellaClasse(d.id);
                                    }}
                                />

                            ),
                        };
                    }),
                ];
                console.log('temp', temp);
                setData(temp);
            })
            .catch(function (error) {
                console.log(error);
                setError(true);
            })
            .finally(function () {
                setLoading(false);
            });
    };

    useEffect(() => {
        setOpen(false);
        setOpenM(false);
        setError(false);
        setLoading(true);

        fetchData();
        // eslint-disable-next-line
    }, [reloader]);



    return isLoading ? (
        <CircularProgress />
    ) : (
        <>
            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
                    Classi
                </Typography>
                <Box display="flex" justifyContent="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Button variant="contained" color="primary" style={{ margin: theme.spacing(1) }} onClick={handleOpen}>
                        Nuova Classe
                    </Button>
                </Box>
            </Container>
            <Modal //add classe modal
                open={open}
                onClose={handleClose}
                aria-labelledby="nuova classe"
                aria-describedby="puoi aggiungere una nuova classe"
                className={classes.modal}
            >
                <AddClassForm updater={setReloader} toaster={setToast} />
            </Modal>

            <Modal open={openM} onClose={handleCloseM} aria-labelledby="nuova classe" aria-describedby="puoi aggiungere una nuova classe" className={classes.modal}>
                <ModifyClassForm cid={cid} updater={setReloader} toaster={setToast} />
            </Modal>


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
                        {data.map(({ id, classe, sezione, indirizzo, modifica, cancella }) => (
                            <TableRow key={id}>
                                <TableCell scope="row">{id}</TableCell>
                                <TableCell scope="row">{classe}</TableCell>
                                <TableCell scope="row">{sezione}</TableCell>
                                <TableCell scope="row">{indirizzo}</TableCell>
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

export const AddClassForm = ({ updater, toaster }) => {
    const auth = useAuth();
    const classes = useStyles();
    const [error, setError] = useState("");
    //controlli form
    const controlloClasse = (value) => (parseInt(value) < 1 || parseInt(value) > 5 ? 'la classe deve essere compresa tra 1 e 5' : undefined)
    const controlloSezione = (value) => (value === undefined || value.length > 1 ? "La sezione deve essere una singola lettera maiuscola" : undefined)

    const onSubmit = async (data) => {
        console.log('form submitted');
        console.log(data);
        await axios.post(`${baseRoute}/classi/create`, { token: auth.token, data }).then((res) => {
            console.log(res);
            updater(Math.random());
            const resetter = async () => {//TODO: SOLUZIONE MAXIMA
                toaster(null);
            }
            resetter().then(() => {
                toaster(<SuccessAlert message="classe aggiunta con successo" />)
            })
        }).catch(err => {
            console.log(err.response.data.cause);
            setError(err.response.data.cause);
            const resetter = async () => {//TODO: SOLUZIONE MAXIMA
                toaster(null);
            }
            resetter().then(() => {
                toaster(<ErrorAlert message={err.response.data.cause} />)
            })
        })
    };

    return (
        <Box>
            <Form
                onSubmit={onSubmit}
                initialValues={{ classe: 3, indirizzo: 'SA', sezione: 'A' }}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} >
                        <Paper className={classes.paperContainer}>
                            <Typography variant="h6" component="h1">
                                Crea Nuova Classe
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth required name="classe" component={TextField} type="text" label="Classe" validate={controlloClasse} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth required name="sezione" component={TextField} type="text" label="Sezione" validate={controlloSezione} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="indirizzo" component={Select} label="Indirizzo" formControlProps={{ fullWidth: true }}>
                                    <MenuItem value={'SA'}>Scienze Applicate</MenuItem>
                                    <MenuItem value={'INF'}>Informatico</MenuItem>
                                    <MenuItem value={'REL'}>Relazioni Internazionali</MenuItem>
                                    <MenuItem value={'GR'}>Grafico</MenuItem>
                                </Field>
                            </FormControl>
                            <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                Submit
                            </Button>
                            <Error error={error} />
                        </Paper>
                    </form>
                )}
            />
        </Box>
    );
};

export const ModifyClassForm = ({ cid, updater, toaster }) => {
    console.log(cid);
    const auth = useAuth();
    const classes = useStyles();
    const [classe, setClasse] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(true);


    //controlli form
    const controlloClasse = (value) => (parseInt(value) < 1 || parseInt(value) > 5 ? 'la classe deve essere compresa tra 1 e 5' : undefined)
    const controlloSezione = (value) => (value === undefined || value.length > 1 ? "La sezione deve essere una singola lettera maiuscola" : undefined)

    const onSubmit = async (data) => {
        console.log('form submitted');
        console.log(data);
        const pipo = { classe: parseInt(data.classe), sezione: data.sezione, indirizzo: data.indirizzo, id: classe.id };
        axios.put(`${baseRoute}/classi/classe`, { token: auth.token, data: pipo }).then((res) => {
            console.log('update', res);
            updater(Math.random());
            const resetter = async () => {//TODO: SOLUZIONE MAXIMA
                toaster(null);
            }
            resetter().then(() => {
                toaster(<SuccessAlert message={res.data.message} />)
            })
        }).catch(err => {
            setError(err.response.data.cause);
            const resetter = async () => {//TODO: SOLUZIONE MAXIMA
                toaster(null);
            }
            resetter().then(() => {
                toaster(<ErrorAlert message={err.response.data.cause} />)
            })
        })
    };

    useEffect(() => {
        const fetchData = async () => {
            return await axios
                .get(`${baseRoute}/classi/${cid}`)
        }
        fetchData()
            .then((res) => {
                console.log(res);
                setClasse(res.data.data);
            })
            .then(() => setLoading(false));
    }, [cid]);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <Box>
            <Form
                onSubmit={onSubmit}
                initialValues={{ classe: classe.classe, indirizzo: classe.indirizzo, sezione: classe.sezione }}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} >
                        <Paper className={classes.paperContainer}>
                            <Typography variant="h6" component="h1">
                                Modifica classe
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth required name="classe" component={TextField} type="text" label="Classe" validate={controlloClasse} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth required name="sezione" component={TextField} type="text" label="Sezione" validate={controlloSezione} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="indirizzo" component={Select} label="Indirizzo" formControlProps={{ fullWidth: true }}>
                                    <MenuItem value={'SA'}>Scienze Applicate</MenuItem>
                                    <MenuItem value={'INF'}>Informatico</MenuItem>
                                    <MenuItem value={'REL'}>Relazioni Internazionali</MenuItem>
                                    <MenuItem value={'GR'}>Grafico</MenuItem>
                                </Field>
                            </FormControl>

                            <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                Submit
                            </Button>
                            <Error error={error} />
                        </Paper>
                    </form>
                )}
            />
        </Box>
    );
};


