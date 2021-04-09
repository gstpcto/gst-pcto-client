import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { baseRoute, useAuth } from '../../ProvideAuth';
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
}));

export default function Classi() {
    return (
        <>
            <TableBella />
        </>
    );
}

function TableBella() {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [cid, setCid] = useState(null);

    const [data, setData] = useState([]);
    const [reloader, setReloader] = useState(null);
    const [open, setOpen] = useState(false);
    const [openM, setOpenM] = useState(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

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

    const handleOpenConfirm = () => {
        setOpenModalConfirm(true)
    }
    const handleCloseConfirm = () => {
        setOpenModalConfirm(false)
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
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        console.log(d.id);
                                        setCid(d.id);
                                        handleOpenConfirm();

                                    }}
                                >
                                    CANCELLA
                                </Button>
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
        setOpenModalConfirm(false)
        setError(false);
        setLoading(true);
        fetchData();
        // eslint-disable-next-line
    }, [reloader]);



    return isLoading ? (
        <CircularProgress />
    ) : (
            <>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Nuova Classe
            </Button>
                <Modal //add classe modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="nuova classe"
                    aria-describedby="puoi aggiungere una nuova classe"
                    className={classes.modal}
                >
                    <AddClassForm updater={setReloader} />
                </Modal>

                <Modal open={openM} onClose={handleCloseM} aria-labelledby="nuova classe" aria-describedby="puoi aggiungere una nuova classe" className={classes.modal}>
                    <ModifyClassForm cid={cid} updater={setReloader} />
                </Modal>

                <Modal open={openModalConfirm} onClose={handleCloseConfirm} aria-labelledby="cancella classe" aria-describedby="conferma cancella classe" className={classes.modal}>

                    <ConfirmDeleteForm cid={cid} updater={setReloader} />
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
            </>
        );
}

export const AddClassForm = ({ updater }) => {
    const auth = useAuth();
    const classes = useStyles();
    const onSubmit = async (data) => {
        console.log('form submitted');
        console.log(data);
        await axios.post(`${baseRoute}/classi/create`, { token: auth.token, data }).then((res) => {
            console.log(res);
            updater(Math.random());
        });
    };

    return (
        <Box>
            <Form
                onSubmit={onSubmit}
                initialValues={{ classe: 3, indirizzo: 'SA', sezione: 'A' }}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper className={classes.paperContainer}>
                            <Typography variant="h6" component="h1">
                                Crea Nuova Classe
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth required name="classe" component={TextField} type="text" label="Classe" />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth required name="sezione" component={TextField} type="text" label="Sezione" />
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
                        </Paper>
                    </form>
                )}
            />
        </Box>
    );
};

export const ModifyClassForm = ({ cid, updater }) => {
    console.log(cid);
    const auth = useAuth();
    const classes = useStyles();
    const [classe, setClasse] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const onSubmit = async (data) => {
        console.log('form submitted');
        console.log(data);
        const pipo = { classe: parseInt(data.classe), sezione: data.sezione, indirizzo: data.indirizzo, id: classe.id };
        axios.put(`${baseRoute}/classi/classe`, { token: auth.token, data: pipo }).then((res) => {
            console.log('update', res);
            updater(Math.random());
        });
    };

    useEffect(() => {
        const fetchData = async () =>{
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
                        <form onSubmit={handleSubmit} noValidate>
                            <Paper className={classes.paperContainer}>
                                <Typography variant="h6" component="h1">
                                    Modifica classe
                            </Typography>
                                <FormControl className={classes.formControl}>
                                    <Field fullWidth required name="classe" component={TextField} type="text" label="Classe" />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <Field fullWidth required name="sezione" component={TextField} type="text" label="Sezione" />
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
                            </Paper>
                        </form>
                    )}
                />
            </Box>
        );
};



const ConfirmDeleteForm = ({ cid, updater }) => {
    console.log(cid);
    const auth = useAuth();
    const classes = useStyles();

    const deleteFromTable = (id) => {
        console.log(auth.token, id);
        axios
            .delete(`${baseRoute}/classi/delete`, {
                data: {
                    token: auth.token,
                    idclasse: id,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.status === 'rejected') {
                    //setError(res.data.cause);
                    console.error(res.data.cause);
                } else updater(Math.random());
            });
    };



    return (
        <Box>
            <Paper className={classes.paperContainer}>
                <Typography variant="h6" component="h1">
                    Sei sicuro di voler cancellare questa classe?
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        deleteFromTable(cid)
                    }}
                >
                    CANCELLA
                </Button>
            </Paper>
        </Box>
    );
}