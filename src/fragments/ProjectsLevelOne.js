import React from 'react';
import { Grid} from '@material-ui/core';
import Progetti from 'components/Progetti';

export default function ProjectsLevelOne() {
    return (
        <>
            <Grid item container xs={12} spacing={1}>
                <Progetti />
            </Grid>
        </>
    );
}
