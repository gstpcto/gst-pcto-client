import React from 'react';
import { Grid, Box } from '@material-ui/core';
import ComponentChangeClass from '../components/ComponentChangeClass';
import ComponentChangePassword from '../components/ComponentChangePassword';

export default function SettingsLevelZero() {
    return (
        <>
            <Grid item xs={12} lg={6}>
                <Box>
                    <ComponentChangeClass />
                </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Box>
                    <ComponentChangePassword />
                </Box>
            </Grid>
        </>
    );
}
