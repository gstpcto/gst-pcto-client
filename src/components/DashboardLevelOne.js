import React from 'react';
import Voti from '../components/Voti';
import { Grid } from '@material-ui/core';
import ComponentProjectsTable from './ComponentProjectsTable';
import ComponentChangeClass from './ComponentChangeClass';

export default function DashboardLevelOne() {

    return (
        <Grid item container xs={12}>
            <Grid item xs={12}>
                <Voti />
            </Grid>
            <Grid item xs={12}>
                <ComponentProjectsTable />
            </Grid>
            <Grid item xs={12}>
                <ComponentChangeClass />
            </Grid>
        </Grid>
    );
}
