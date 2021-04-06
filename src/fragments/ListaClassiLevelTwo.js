import React from 'react';
import { Grid } from '@material-ui/core';
import Classi from '../components/Classi';

export default function ListaClassiLevelTwo() {
    return (
        <>
            <Grid item container xs={12} spacing={1}>
                <Classi />
            </Grid>
        </>
    );
}
