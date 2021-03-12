import React from 'react';
import Voti from '../components/Voti';
import { Grid, Box, Typography } from '@material-ui/core';
import ComponentProjectsTable from '../components/ComponentProjectsTable';
import { useAuth } from '../ProvideAuth';

export default function DashboardLevelZero() {
    const auth = useAuth();
    return (
        <>
            <Grid item xs={12}>
                Livello 2 mi sparo in testa
            </Grid>
        </>
    );
}
