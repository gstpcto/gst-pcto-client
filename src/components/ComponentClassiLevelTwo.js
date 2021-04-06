import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { baseRoute, useAuth } from '../ProvideAuth';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    modal: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
    },
    appBar: {
        position: 'relative',
    },
    paperContainer: {
        padding: theme.spacing(2),
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        height: 150,
        overflow: 'auto',
    },
    cardMedia: {
        width: 150,
        color: 'white',
    },
    maxWidth: {
        width: 300,
        overflow: 'auto',
    },
    chevronAligner: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'space-between',
    },
    chevron: {
        width: '10%',
    },
    textWrap: {
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        overflowWrap: 'normal',
        wordWrap: 'normal',
        wordBreak: 'normal',
        hyphens: 'auto',
        width: '90%',
    },
}));

export default function ComponentClassiLevelTwo(props) {
    const classes = useStyles();
    const auth = useAuth();
    const fixedSizeCardDetails = clsx(classes.card, classes.maxWidth);
    const cardRoot = clsx(classes.card, classes.chevronAligner);

    const [openClasse, setOpenClasse] = useState(false);
    const [cid, setCid] = useState(null); // id Class3

    const handleOpenClasse = () => {
        setOpenClasse(true);
        // setCid(); imposta il cid
    };
    const handleCloseClasse = () => {
        setOpenClasse(false);
        setCid(null);
    };
    

    return (
        <>
            <Grid item xs={12} md={6}>
                <Box>
                    <CardActionArea onClick={handleOpenClasse}>
                        <Card className={cardRoot}>
                            <div className={fixedSizeCardDetails}>
                                <CardContent className={classes.textWrap}>
                                    <Typography variant="h6">{}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {}
                                    </Typography>
                                </CardContent>
                            </div>
                            <Box className={classes.chevron} display="flex" justifyContent="center" alignItems="center">
                                <ChevronRightIcon />
                            </Box>
                        </Card>
                    </CardActionArea>
                </Box>
            </Grid>
        </>
    );
}
