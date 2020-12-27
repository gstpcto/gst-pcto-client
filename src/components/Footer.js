import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Copyright from './Copyright';
import { FaNodeJs, FaReact } from 'react-icons/fa';
import { GrMysql } from "react-icons/gr";

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        // marginTop: theme.spacing(8),
        padding: theme.spacing(6, 0),
    },
    iconContainer: {
        padding: "10px",
    }, 
    footerIcon: {
        margin: "10px",
        verticalAlign: 'middle',
    }
}));

export default function Footer(props) {
    const classes = useStyles();
    const { description, title } = props;

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    {description}
                </Typography>
                <Copyright />

                <Container className={classes.iconContainer} align="center">
                    <FaNodeJs size="25" className={classes.footerIcon}/>
                    <FaReact size="25" className={classes.footerIcon}/>
                    <GrMysql size="25" className={classes.footerIcon}/>
                </Container>
            </Container>
        </footer>
    );
}

Footer.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};