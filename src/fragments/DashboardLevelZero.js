import React from 'react';
import Voti from 'components/Voti';
import { Grid, Box, Typography } from '@material-ui/core';
import ComponentProjectsTable from 'components/ComponentProjectsTable';
import { useAuth } from 'ProvideAuth';

export default function DashboardLevelZero() {
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
                <Voti />
            </Grid>
            
            <Grid item xs={12}>
                <ComponentProjectsTable />
            </Grid>
        </>
    );
}
