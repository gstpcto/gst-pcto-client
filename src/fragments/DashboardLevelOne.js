import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useAuth } from '../ProvideAuth';
import ClasseDocenteClasse from '../components/ClasseDocenteClasse';

export default function DashboardLevelOne() {
    const auth = useAuth();
    return (
        <>
            <Grid item xs={12}>
                <Box fontWeight="fontWeightBold">
                    <Typography component="h1" variant="h6" color="inherit">
                        Bentornato, {auth.user['nome'] + ' ' + auth.user['cognome'] + '!'}
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <ClasseDocenteClasse />
            </Grid>
        </>
    );
}
