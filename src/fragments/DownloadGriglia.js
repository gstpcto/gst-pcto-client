import React, { useState } from 'react';
import { Grid, Box, Button, Paper, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import { green } from '@material-ui/core/colors';
import axios from 'axios';
import { baseRoute, useAuth } from 'ProvideAuth';
import download from 'downloadjs';
import { SuccessAlert, ErrorAlert, InfoAlert } from 'components/snackbars';
import { Form, Field } from 'react-final-form';
import { Select, TextField } from 'final-form-material-ui';
import genYears from 'fragments/genYears';

const useStyles = makeStyles((theme) => ({
    downloadButton: {
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
}));

export default function DownloadGriglia() {
    const classes = useStyles();
    const auth = useAuth();
    const [toast, setToast] = useState(null);

    const getGriglia = async (data) => {
        const resetter = async () => {
            setToast(null);
        };
        resetter().then(() => {
            setToast(<InfoAlert message={'Download in corso...'} />);
        });
        await axios({
            method: 'GET',
            responseType: 'blob',
            url: `${baseRoute}/docenti/griglia`,
            params: { token: auth.token, peso: data.peso, discipline: data.discipline, as: data.annoScolastico, indirizzo: data.indirizzo || '' },
        })
            .then((res) => {
                console.log(res);
                const content = res.headers['content-type'];
                download(res.data, `griglia_${auth.user.nome}_${auth.user.cognome}`, content);
                const resetter = async () => {
                    setToast(null);
                };
                resetter().then(() => {
                    setToast(<SuccessAlert message={'Download completato.'} />);
                });
            })
            .catch(function (error) {
                console.log(error);
                const resetter = async () => {
                    setToast(null);
                };
                resetter().then(() => {
                    setToast(<ErrorAlert message={error.response.data.cause} />);
                });
            });
    };

    const required = (value) => (value ? undefined : 'Richiesto');

    return (
        <>
            <Grid item container xs={12} md={6} spacing={1}>
                <Box>
                    <Form
                        onSubmit={getGriglia}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit} noValidate>
                                <Paper className={classes.paperContainer}>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="peso" component={TextField} type="text" label="Peso in percentuale" validate={required} />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="discipline" component={TextField} type="text" label="Discipline" validate={required} />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth name="annoScolastico" component={Select} type="text" label="Anno Scolastico" validate={required}>
                                            {genYears().map((o) => (
                                                <MenuItem value={o}>{o}</MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                    {auth.user.livello === 4 ? (
                                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                            <Field fullWidth name="indirizzo" component={Select} type="text" label="Indirizzo" validate={required}>
                                                <MenuItem value={'SA'}>Scienze Applicate</MenuItem>
                                                <MenuItem value={'INF'}>Informatico</MenuItem>
                                                <MenuItem value={'REL'}>Relazioni Internazionali</MenuItem>
                                                <MenuItem value={'GR'}>Grafico</MenuItem>
                                            </Field>
                                        </FormControl>
                                    ) : (
                                        <></>
                                    )}
                                    <Button variant="contained" color="primary" type="submit" className={classes.downloadButton} startIcon={<GetAppIcon />} disabled={submitting}>
                                        Scarica Griglia
                                    </Button>
                                </Paper>
                            </form>
                        )}
                    />
                </Box>
            </Grid>
            {toast}
        </>
    );
}
