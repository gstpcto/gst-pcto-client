import React from 'react';
import { Grid} from '@material-ui/core';
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
