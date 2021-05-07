import React from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import { green } from '@material-ui/core/colors';

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

    return (
        <>
            <Grid item container xs={12} spacing={1}>
                <Box>
                    <Button variant="contained" color="primary" size="large" className={classes.downloadButton} startIcon={<GetAppIcon />}>
                        Scarica Dossier
                    </Button>
                </Box>
            </Grid>
        </>
    );
}
