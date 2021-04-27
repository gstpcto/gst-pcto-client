import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';
import { red, yellow, green } from '@material-ui/core/colors';
import { FormControl } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { Select, Input } from 'final-form-material-ui';
import { baseRoute, useAuth } from 'ProvideAuth';
import { SuccessAlert, ErrorAlert } from 'components/snackbars';
import axios from 'axios';
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
    input: {
        padding: 0,
        width: "80%",
        outline: "none",
        border: "none",
        borderBottom: "1px solid black",
        transition: "border 1s, height 1s",
        "&:focus": {
            borderBottom: "2px solid #1976d2"
        }
    },
    inputError: {
        borderBottom: `2xp solid ${red[500]}`
    }

});

export default function ComponentVoti({ dati: { id, nome, valutazione, descrizione, data, oreEffettive, oreTotali } }) {
    const auth = useAuth();
    const classes = useStyles();
    const [ore, setOre] = useState(oreEffettive);
    const [toast, toaster] = useState(null);
    const [error, setError] = useState(false);
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


    const changeOre = (data) => {
        console.log("ASDASDASD", data.target.value);
        setOre(data.target.value);
    }

    const onUpdateOre = async () => {
        console.log("ODDIOOOOOOOOOOOOOOOOOO");
        if (ore === undefined || ore == null || !parseInt(ore) || oreTotali < ore) {
            const resetter = async () => {//TODO: SOLUZIONE MAXIMA
                toaster(null);
            }
            resetter().then(() => {
                toaster(<ErrorAlert message={"Troppe ore"} />)
            })
            console.log("ERRORE PRESO DAL CLIENT");
            return;
        }
        await axios.put(`${baseRoute}/voti/updateOreEffettive/${id}`, { token: auth.token, data: { oreEffettive: ore } }).then(r => {
            console.log(r);
            const resetter = async () => {//TODO: SOLUZIONE MAXIMA
                toaster(null);
            }
            resetter().then(() => {
                toaster(<SuccessAlert message={r.data.message} />)
            })
        })
            .catch(e => {
                console.log(e);
                const resetter = async () => {//TODO: SOLUZIONE MAXIMA
                    toaster(null);
                }
                resetter().then(() => {
                    toaster(<ErrorAlert message={e.response.data.cause} />)
                })

            })
    }

    return (<>
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
                            <Box style={{ paddingRight: 5 }}>Ore fatte:</Box>
                            <input name="oreEffettive" value={ore} onChange={changeOre} className={`${classes.input} `} onKeyPress={(o) => {
                                if (o.key === "Enter") onUpdateOre();
                            }} />
                            <Box> / {oreTotali}</Box>
                        </Box>
                    </CardContent>
                </div>
            </Card>
        </Box>
        {toast}
    </>
    );
}

ComponentVoti.propTypes = {
    post: PropTypes.object,
};
