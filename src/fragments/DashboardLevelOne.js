import React from 'react';
import Voti from '../components/Voti';
import { Grid } from '@material-ui/core';
import ComponentProjectsTable from '../components/ComponentProjectsTable';

export default function DashboardLevelOne() {

    return (
        <>
            <Grid item xs={12}>
                <Voti />
            </Grid>
            <Grid item xs={12}>
                <ComponentProjectsTable />
            </Grid>
        </>
    );
}
