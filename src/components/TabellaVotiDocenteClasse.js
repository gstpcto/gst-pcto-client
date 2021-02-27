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
import { CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem, IconButton } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from '../ProvideAuth';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    modalContainer: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #E0E0E0',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),
        margin: theme.spacing(1),
    },
}));

export default function TabellaVotiDocenteClasse() {
    const auth = useAuth();
    const classes = useStyles();

    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [infoVoto, setInfoVoto] = useState({
        iduser: '',
        nome: '',
        cognome: '',
        idprogetto: '',
        data: '',
    });
    const [voto, setVoto] = useState(6);

    const handleVotoChange = (e) => {
        setVoto(e.target.value);
    };

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

    /* const aggiungivoto = async () => {
        axios
            .post(`${baseRoute}/voti/voto`, { idstudente: infoVoto.iduser, idprogetto: , valutazione: voto, date: })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } */

    return isLoading ? (
        <CircularProgress />
    ) : (
        <>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell scope="col" component="th"></TableCell>
                            {data.map(({ infoProgetto, ...rest }, index) => (
                                <TableCell key={index} scope="col" component="th">
                                    {infoProgetto.Nome}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(({ alunni }) =>
                            alunni.map(({ iduser, nome, cognome, voto }, index) => (
                                <TableRow key={index}>
                                    <TableCell scope="row">{`${nome} ${cognome}`}</TableCell>
                                    <TableCell scope="row">
                                        {voto ? (
                                            <>{voto}</>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                onClick={() => {
                                                    handleOpen({ iduser, nome, cognome });
                                                }}
                                            >
                                                Aggiungi voto
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={open} onClose={handleClose}>
                <Box className={classes.modalContainer}>
                    <Box className={classes.modalPaper}>
                        <IconButton size="small" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" component="h1" color="initial">
                            Aggiungi un voto allo studente
                            {infoVoto.nome} {infoVoto.cognome}
                        </Typography>
                        <Box display="flex" justifyContent="center" flexDirection="column">
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel>Sezione</InputLabel>
                                <Select label="Sezione" onChange={handleVotoChange} value={voto}>
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
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="secondary" disableElevationcolor>
                                Aggiungi voto
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
