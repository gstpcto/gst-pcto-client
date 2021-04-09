import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useAuth } from 'ProvideAuth';

export default function DashboardLevelOne() {
    const auth = useAuth();
    return (
        <>
            <Grid item xs={12}>
                <Box fontWeight="fontWeightBold">
                    <Typography component="h1" variant="h6" color="inherit">
                        Bentornato, {auth.user['nome'] + ' ' + auth.user['cognome']}! Il capo assouluto
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12}>
                componenti dashboard non lo so
            </Grid>
        </>
    );
}
