import React, { useState } from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import { green } from '@material-ui/core/colors';
import axios from 'axios';
import { baseRoute, useAuth } from 'ProvideAuth';
import download from 'downloadjs';
import { SuccessAlert, ErrorAlert, InfoAlert } from 'components/snackbars';
import { FormControl, Typography } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import Paper from '@material-ui/core/Paper';
import Error from 'components/ErrorHandler';
import { TextField } from 'final-form-material-ui';

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

export default function DownloadDossier() {
    const classes = useStyles();
    const auth = useAuth();
    const [toast, setToast] = useState(null);
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        const resetter = async () => {
            setToast(null);
        };
        resetter().then(() => {
            setToast(<InfoAlert message={'Download in corso...'} />);
        });
        await axios({
            method: 'GET',
            responseType: 'blob',
            url: `${baseRoute}/studenti/dossier`,
            params: { token: auth.token, obbligoFormativo: data.obbligoFormativo },
        })
            .then((res) => {
                console.log(res);
                const content = res.headers['content-type'];
                download(res.data, `dossier_${auth.user.nome}_${auth.user.cognome}`, content);
                const resetter = async () => {
                    setToast(null);
                };
                resetter().then(() => {
                    setToast(<SuccessAlert message={'Download completato.'} />);
                });
            })
            .catch(function (error) {
                setError(error.response.data.cause);
                console.log(error);
                const resetter = async () => {
                    setToast(null);
                };
                resetter().then(() => {
                    setToast(<ErrorAlert message={error.response.data.cause} />);
                });
            });
    };

    const controlloInput = (value) => (parseInt(value) > 0 && !isNaN(parseInt(value)) ? undefined : 'Il numero di ore inserito non è valido.');

    return (
        <>
            <Grid item container xs={12} spacing={1}>
                <Box>
                    <Form
                        onSubmit={onSubmit}
                        initialValues={{ obbligoFormativo: 100 }}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                                <Paper className={classes.paperContainer}>
                                    <Typography variant="h6" component="h1">
                                        Scarica Dossier
                                    </Typography>
                                    <FormControl className={classes.formControl}>
                                        <Field fullWidth required name="obbligoFormativo" component={TextField} type="text" label="Numero ore obbligo formativo" validate={controlloInput} />
                                    </FormControl>
                                    <Button variant="contained" color="primary" size="large" className={classes.downloadButton} startIcon={<GetAppIcon />} type="submit" disabled={submitting}>
                                        Scarica Dossier
                                    </Button>
                                    <Error error={error} />
                                </Paper>
                            </form>
                        )}
                    />
                    {toast}
                </Box>
            </Grid>
        </>
    );
}
