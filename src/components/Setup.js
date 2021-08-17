import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    setup: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
        // Styles for header text grid item
        // TODO: Find a way to make these uniform across all of the components
    },
    startSeed: {
        // Styles for entire startSeed grid item
    },
    startSeedSwitch: {
        // Styles for the startSeed switch
    },
    reset: {
        // Styles for reset section grid item
    },
    resetButton: {
        // Styles for reset button
    },
  }));

export default function Setup(props) {
    const classes = useStyles();
    
    return (
        <Grid container item xs={6} spacing={1} className={classes.setup}
            direction="column" justifyContent="center" alignItems="center">
            <Grid item className="header">Setup</Grid>
            <Grid item className="startSeed">
                <label htmlFor="startSeed">
                    4 FMP
                    <Switch
                        name="startSeed"
                        color="primary"
                        checked={props.startMMP4}
                        onChange={ props.onChange }
                        className="startSeedSwitch"
                    />
                    4 MMP
                </label>
            </Grid>
            <Grid item className="reset">
                <Button
                    name="reset"
                    onClick={ props.resetScore }
                    variant="contained"
                    color="secondary"
                    className="resetButton"
                >
                    Reset
                </Button>
            </Grid>
        </Grid>
    );
  }