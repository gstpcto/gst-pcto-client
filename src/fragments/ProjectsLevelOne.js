import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Progetti from '../components/Progetti';

export default function ProjectsLevelOne() {
    return (
        <>
            <Grid item xs={12} md={6}>
                <Box>
                    <Progetti />
                </Box>
            </Grid>
        </>
    );
}
