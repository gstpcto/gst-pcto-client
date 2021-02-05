import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';
import { red, yellow, green } from '@material-ui/core/colors';

const useStyles = makeStyles({
    bgRed: {
        backgroundColor: red[500],
    },
    bgYellow: {
        backgroundColor: yellow[800],
    },
    bgGreen: {
        backgroundColor: green[500],
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        height: 150,
        overflow: 'auto',
    },
    cardMedia: {
        width: 150,
        color: "white",
    },
    maxWidth: {
        width: 300,
        overflow: 'auto',
    },
    textWrap: {
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        overflowWrap: 'normal',
        wordWrap: 'normal',
        wordBreak: 'normal',
        hyphens: 'auto',
    },
});

export default function ComponentVoti({ Nome, Data, Descrizione, Valutazione }) {
    const classes = useStyles();

    const getCurrentColor = () => {
        if (Valutazione >= 6) {
            return classes.bgGreen;
        } else if (Valutazione >= 5) {
            return classes.bgYellow;
        } else if (Valutazione < 5){
            return classes.bgRed;
        }
    }


    const fixedSizeCardMedia = clsx(classes.card, classes.cardMedia, getCurrentColor());
    const fixedSizeCardDetails = clsx(classes.card, classes.maxWidth);

    return (
        <Grid item xs={12}>
            <Card className={classes.card}>
                <Box className={fixedSizeCardMedia} display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h1">{Valutazione}</Typography>
                </Box>
                <div className={fixedSizeCardDetails}>
                    <CardContent className={classes.textWrap}>
                        <Typography variant="h6">{Nome}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {Descrizione}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {Data}
                        </Typography>
                        <Typography variant="subtitle1" paragraph></Typography>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
}

ComponentVoti.propTypes = {
    post: PropTypes.object,
};
