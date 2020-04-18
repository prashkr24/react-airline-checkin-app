import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import FlightIcon from "@material-ui/icons/Flight";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function DashboardPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Button
              startIcon={<PersonIcon />}
              variant="contained"
              color="primary"
            >
              Manage Passenger
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Button
              startIcon={<FlightIcon />}
              variant="contained"
              color="primary"
            >
              Manage ancillary services per flight
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
