import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import PersonIcon from '@material-ui/icons/Person'
import FlightIcon from '@material-ui/icons/Flight'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

export default function DashboardPage() {
    const classes = useStyles()
    // eslint-disable-next-line no-undef
    const role = localStorage.getItem('role')
    // eslint-disable-next-line no-undef

    return (
        <div className={classes.root}>
            {role === 'admin' && (
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <NavLink to="/passenger">
                                <Button
                                    startIcon={<PersonIcon />}
                                    variant="contained"
                                    color="primary"
                                >
                                    Manage Passenger
                                </Button>
                            </NavLink>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <NavLink to="/ancillary">
                                <Button
                                    startIcon={<FlightIcon />}
                                    variant="contained"
                                    color="primary"
                                >
                                    Manage ancillary services per flight
                                </Button>
                            </NavLink>
                        </Paper>
                    </Grid>
                </Grid>
            )}
            {role === 'staff' && (
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <NavLink to="/checkin">
                                <Button
                                    startIcon={<PersonIcon />}
                                    variant="contained"
                                    color="primary"
                                >
                                    Check-In
                                </Button>
                            </NavLink>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <NavLink to="/inflight">
                                <Button
                                    startIcon={<FlightIcon />}
                                    variant="contained"
                                    color="primary"
                                >
                                    In Flight
                                </Button>
                            </NavLink>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </div>
    )
}
