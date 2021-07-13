import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    minusBtn: {
        // Styles for minus button
    },
    plusBtn: {
        // Styles for plus button
    },
    buttons: {
        alignItems: "center",
        padding: 20
    },
    teamName: {
        // Styles for team name
        fontSize: "10px",
        color: theme.palette.text.secondary,
    },
    score: {
        // Styles for score
        direction: "row",
    },
    usGrid: {
        // Styles specifically for the Us score section
        alignItems: "center"
    },
    themGrid: {
        // Styles specifically for the Them score section where the order is reversed.
        //flexGrow: 4,
        alignItems: "center"
    }
  }));

export default function Score(props) {
    const classes = useStyles(),
        teamNum = (props.team === "Us") ? 0 : 1;
    
    return (
        <Grid container item xs={12} sm={6} spacing={1} className={classes.score}
            direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={2} className={classes.buttons}>
                <Button
                variant="contained" 
                color="primary" 
                className={classes.minusBtn} 
                onClick={ () => props.onClick(teamNum,-1) }
                >
                    -
                </Button>
            </Grid>
            <Grid item container xs={8}
              spacing={0} 
              className={ props.team === "Us" ? classes.usGrid : classes.themGrid } 
              direction={ props.team === "Us" ? "column" : "column-reverse"}
            >
                <Grid item className={classes.teamName}>{props.team}</Grid>
                <Grid item className={classes.teamNum}>{props.value}</Grid>
            </Grid>
            <Grid item xs={2}>
                <Button
                variant="contained" 
                color="primary" 
                className={classes.plusBtn} 
                onClick={ () => props.onClick(teamNum,1) }
                >
                +
                </Button>
            </Grid>
        </Grid>
    );
  }