import React from 'react';
import { Grid } from '@material-ui/core';
import TabellaVotiDocenteClasse from 'components/TabellaVotiDocenteClasse';

export default function TabellaLevelOne() {
    return (
        <>
            <Grid item xs={12}>
                <TabellaVotiDocenteClasse />
            </Grid>
        </>
    );
}
