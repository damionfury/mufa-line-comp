import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    fmp: {
        justifyContent: "center",
        alignItems: "stretch",
    },
    mmp: {
        justifyContent: "center",
        alignItems: "stretch",
    },
    fmp_title: {
        background: "purple",
        color: "white",
        textAlign: "center",
    },
    mmp_title: {
        background: "teal",
        color: "white",
        textAlign: "center",
    },
    fmp_comp: {
        color: "purple",
        background: "white",
        textAlign: "center",
        border: "1",
        borderColor: "purple"
    },
    mmp_comp: {
        color: "teal",
        background: "white",
        textAlign: "center",
        border: 1,
        borderColor: "teal",
    }
  }));

export default function LineComp(props) {
    const classes = useStyles();
    
    return (
        <Grid container item xs={12} spacing = {0} className={classes.root}>
            <Grid container item xs={5} sm={3} spacing={0} className={classes.fmp} direction="column">
                <Grid item className={classes.fmp_title}>FMP</Grid>
                <Grid item className={classes.fmp_comp}>{props.fmp}</Grid>
            </Grid>
            <Grid container item xs={5} sm={3} spacing={0} className={classes.mmp} direction="column">
                <Grid item className={classes.mmp_title}>MMP</Grid>
                <Grid item className={classes.mmp_comp}>{props.mmp}</Grid>
            </Grid>
        </Grid>
    );
  }