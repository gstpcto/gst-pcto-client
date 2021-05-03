import React from 'react';
import { Grid, Box } from '@material-ui/core';
import ComponentChangePassword from 'components/ComponentChangePassword';

export default function SettingsLevelOne() {
    return (
        <>
            <Grid item xs={12} md={6}>
                <Box>
                    <ComponentChangePassword />
                </Box>
            </Grid>
        </>
    );
}
