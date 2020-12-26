import React from 'react';
import Navbar from '../components/Navbar';
import { Grid } from '@material-ui/core';

export default function Homepage(props) {
    return (
        <>
            <Navbar {...props}/>
            <Grid container>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </>
    );
}