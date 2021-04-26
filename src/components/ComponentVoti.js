import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';
import { red, yellow, green } from '@material-ui/core/colors';
import { FormControl } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { Select, Input } from 'final-form-material-ui';
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
    formControl: {
        display: 'inline-flex',
        flex: 1,
        verticalAlign: "top",

        width: 50
    },
    form: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))"
    },

});

export default function ComponentVoti({ dati: { nome, valutazione, descrizione, data, oreEffettive, oreTotali } }) {

    const classes = useStyles();

    const getCurrentColor = () => {
        if (valutazione >= 6) {
            return classes.bgGreen;
        } else if (valutazione >= 5) {
            return classes.bgYellow;
        } else if (valutazione < 5) {
            return classes.bgRed;
        }
    }


    const fixedSizeCardMedia = clsx(classes.card, classes.cardMedia, getCurrentColor());
    const fixedSizeCardDetails = clsx(classes.card, classes.maxWidth);
    const validateOre = (value) => (value !== undefined && !parseInt(value) || value >= oreTotali);
    return (
        <Box mx={1}>
            <Card className={classes.card}>
                <Box className={fixedSizeCardMedia} display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h1">{valutazione}</Typography>
                </Box>
                <div className={fixedSizeCardDetails}>
                    <CardContent className={classes.textWrap}>
                        <Typography variant="h6">{nome}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {descrizione}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {data.split('T')[0]}
                        </Typography>
                        {/* TODO: ANDRE AGGIUSTA STO LAYOUT */}
                        <Box variant="subtitle1" color="textSecondary" className={classes.form}>
                            <Box style={{ paddingRight: 5 }}>Ore fatte:</Box> <Form
                                onSubmit={() => { }}
                                initialValues={{ oreEffettive }}
                                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                    <form onSubmit={() => { }} >

                                        <FormControl className={classes.formControl}>
                                            <Field required name="oreEffettive" component={Input} type="text" label="oreEffettive" placeholder="Ore" validate={validateOre} />
                                        </FormControl>
                                    </form>
                                )}
                            /> /{oreTotali}
                        </Box>
                    </CardContent>
                </div>
            </Card>
        </Box>
    );
}

ComponentVoti.propTypes = {
    post: PropTypes.object,
};
