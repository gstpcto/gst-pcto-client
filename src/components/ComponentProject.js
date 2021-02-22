import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles({
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
});

export default function ComponentProject({ Nome, Descrizione, ID, LinkValutazioni, Periodo }) {
    const classes = useStyles();
    
    const fixedSizeCardDetails = clsx(classes.card, classes.maxWidth);
    const cardRoot = clsx(classes.card, classes.chevronAligner);
    
    return (
        <Box mx={1}>
            <CardActionArea>
                <Card className={cardRoot}>
                    <div className={fixedSizeCardDetails}>
                        <CardContent className={classes.textWrap}>
                                <Typography variant="h6">{Nome}</Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {Descrizione}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {Periodo}
                                </Typography>
                        </CardContent>
                    </div>
                    <Box className={classes.chevron} display="flex" justifyContent="center" alignItems="center">
                        <ChevronRightIcon />
                    </Box>
                </Card>
            </CardActionArea>
        </Box>
    );
}
