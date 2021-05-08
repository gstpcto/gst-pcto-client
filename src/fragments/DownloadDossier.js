import React, { useState } from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import { green } from '@material-ui/core/colors';
import axios from 'axios';
import { baseRoute, useAuth } from 'ProvideAuth';
import download from 'downloadjs';
import { SuccessAlert, ErrorAlert } from 'components/snackbars';

const useStyles = makeStyles((theme) => ({
    downloadButton: {
        backgroundColor: green[500],
        color: 'white',
        '&:hover': {
            backgroundColor: green[600],
            color: 'white',
        },
    },
}));

export default function DownloadDossier() {
    const classes = useStyles();
    const auth = useAuth();
    const [toast, setToast] = useState(null);

    const getDossier = async (id) => {
        const resetter = async () => {
            setToast(null);
        };
        resetter().then(() => {
            setToast(<SuccessAlert message={'Download avviato.'} />);
        });
        await axios({
            method: 'GET',
            responseType: 'blob',
            url: `${baseRoute}/studenti/dossier`,
            params: { token: auth.token, obbligoFormativo: 100}
        })
            .then((res) => {
                console.log(res);
                const content = res.headers['content-type'];
                download(res.data, `dossier_${auth.user.nome}_${auth.user.cognome}`, content);
                const resetter = async () => {
                    setToast(null);
                };
                resetter().then(() => {
                    setToast(<SuccessAlert message={"Download completato."} />);
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

    return (
        <>
            <Grid item container xs={12} spacing={1}>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.downloadButton}
                        startIcon={<GetAppIcon />}
                        onClick={() => {
                            getDossier();
                        }}
                    >
                        Scarica Dossier
                    </Button>
                    {toast}
                </Box>
            </Grid>
        </>
    );
}
