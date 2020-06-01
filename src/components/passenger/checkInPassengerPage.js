import React, { useEffect } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import {
    loadCheckInPassengers,
    saveCheckInPassenger,
    deleteCheckInPassenger,
} from '../../redux/actions/checkInPassengerAction'
import {
    loadPassengers,
    savePassenger,
} from '../../redux/actions/passengerAction'
import { loadAncillaryServices } from '../../redux/actions/ancillarySeriveAction'
import propTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import AccessibleIcon from '@material-ui/icons/Accessible'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Checkbox from '@material-ui/core/Checkbox'
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly'
import SaveIcon from '@material-ui/icons/Save'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
        textAlign: 'center',
    },
    corridor: {
        margin: theme.spacing(2),
    },
}))

function CheckInPassengerPage({
    checkInPassengers,
    loadCheckInPassengers,
    saveCheckInPassenger,
    deleteCheckInPassenger,
    loadAncillaryServices,
    loadPassengers,
    passengers,
    savePassenger,
    ancillaryServices,
}) {
    let ancillaryServiceLookUp = {}
    let passengersLookUp = {}
    //let selectedPassenger = {}
    let [selectedPassenger, setSelectedPassenger] = React.useState({})

    let seatColumns = ['A', 'B', 'C']
    let seatRows = ['1', '2', '3']

    if (passengers.length > 0) {
        passengers.map((passengers) => {
            passengersLookUp[passengers.id] = passengers.name
        })
    }
    if (ancillaryServices.length > 0) {
        ancillaryServices.map((ancillaryService) => {
            ancillaryServiceLookUp[ancillaryService.id] =
                ancillaryService.service
        })
    }
    let columns = [
        {
            title: 'Flight',
            field: 'flight',
            lookup: { 1: 'Flight 1', 2: 'Flight 2', 3: 'Flight 3' },
        },
        {
            title: 'Passenger',
            field: 'passenger',
            lookup: passengersLookUp,
        },
        {
            title: 'Checked In',
            field: 'checkedIn',
            lookup: { 1: 'Yes', 2: 'No' },
        },
        {
            title: 'Ancillary',
            field: 'service',
            lookup: ancillaryServiceLookUp,
        },
        {
            title: 'Seat No',
            field: 'seatno',
        },
    ]

    useEffect(() => {
        loadAsyncData()
    }, [])

    async function loadAsyncData() {
        try {
            await loadPassengers({ mandarotyFileds: false })
            //await loadAncillaryServices()
            //await loadCheckInPassengers()
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setChecked(event.target.checked)
        selectedPassenger.checkedIn = event.target.checked
    }

    // function handleSave(checkInPassenger) {
    //     saveCheckInPassenger(checkInPassenger)
    // }

    async function handleDeleteCheckInPassenger(checkInPassenger) {
        await deleteCheckInPassenger(checkInPassenger)
    }

    const classes = useStyles()

    const noOfRows = 10
    const [checked, setChecked] = React.useState(false)

    function setPassengerCheckIn(passenger) {
        console.log('passenger', passenger)
        setSelectedPassenger(passenger)
        setChecked(passenger.checkedIn)
    }

    function handleSave(passenger) {
        console.log('passenger', passenger)

        savePassenger(passenger)
    }

    function isPassengerCheckedIn(seatno) {
        let checkedIn = false
        let passenger = false
        passengers.map((item) => {
            if (item.seatno === seatno) {
                checkedIn = true
                passenger = item
            }
        })
        if (checkedIn) {
            return (
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                        console.log(passenger)
                        setPassengerCheckIn(passenger)
                    }}
                >
                    {seatno}
                    <AccessibleIcon
                        color={passenger.specialMeals ? 'default' : 'primary'}
                    />
                    <ChildFriendlyIcon
                        color={passenger.weelchair ? 'default' : 'primary'}
                    />
                    <RestaurantMenuIcon
                        color={passenger.infant ? 'default' : 'primary'}
                    />
                    <ShoppingCartIcon
                        color={passenger.infant ? 'default' : 'primary'}
                    />
                </Button>
            )
        } else {
            return (
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={(event) => {
                        setPassengerCheckIn({})
                    }}
                >
                    {seatno}
                    <AccessibleIcon />
                    <ChildFriendlyIcon />
                    <RestaurantMenuIcon />
                    <ShoppingCartIcon />
                </Button>
            )
        }
    }

    return (
        <React.Fragment>
            {
                // <MaterialTable
                //     title="Check-In Passenger"
                //     columns={columns}
                //     data={checkInPassengers}
                //     editable={{
                //         onRowAdd: (newData) =>
                //             new Promise((resolve) => {
                //                 handleSave({ ...newData, id: null })
                //                 resolve()
                //             }),
                //         onRowUpdate: (newData) =>
                //             new Promise((resolve) => {
                //                 resolve()
                //                 handleSave(newData)
                //             }),
                //         onRowDelete: (oldData) =>
                //             new Promise((resolve) => {
                //                 resolve()
                //                 handleDeleteCheckInPassenger(oldData)
                //             }),
                //     }}
                // />
            }
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs justify="space-between">
                        {seatColumns.map((seatColumn) => (
                            // eslint-disable-next-line react/jsx-key
                            <Paper className={classes.paper}>
                                {seatRows.map((seatRow) =>
                                    isPassengerCheckedIn(seatColumn + seatRow)
                                )}
                            </Paper>
                        ))}
                    </Grid>

                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <List component="nav" className={classes.root}>
                                <ListItem divider>
                                    <ListItemText primary="Passenger Details" />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={<SaveIcon />}
                                        onClick={(event) => {
                                            handleSave(selectedPassenger)
                                        }}
                                    >
                                        SAVE
                                    </Button>
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="Checked In" />
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{
                                            'aria-label': 'primary checkbox',
                                        }}
                                    />
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="Seat No" />
                                    {selectedPassenger.seatno}
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="Name" />
                                    {selectedPassenger.name}
                                </ListItem>
                                <Divider />
                                <ListItem divider>
                                    <ListItemText primary="Passport" />
                                    {selectedPassenger.passport}
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="Address" />
                                    {selectedPassenger.address}
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="DOB" />
                                    {selectedPassenger.dob}
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="Ancillary Services" />
                                    <AccessibleIcon
                                        color={
                                            selectedPassenger.specialMeals
                                                ? 'default'
                                                : 'primary'
                                        }
                                    />
                                    <ChildFriendlyIcon
                                        color={
                                            selectedPassenger.weelchair
                                                ? 'default'
                                                : 'primary'
                                        }
                                    />
                                    <RestaurantMenuIcon
                                        color={
                                            selectedPassenger.infant
                                                ? 'default'
                                                : 'primary'
                                        }
                                    />
                                    <ShoppingCartIcon
                                        color={
                                            selectedPassenger.infant
                                                ? 'default'
                                                : 'primary'
                                        }
                                    />
                                </ListItem>
                                <Divider light />
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}

CheckInPassengerPage.propTypes = {
    checkInPassengers: propTypes.array.isRequired,
    passengers: propTypes.array.isRequired,
    ancillaryServices: propTypes.array.isRequired,
    loadCheckInPassengers: propTypes.func.isRequired,
    saveCheckInPassenger: propTypes.func.isRequired,
    deleteCheckInPassenger: propTypes.func.isRequired,
    loadAncillaryServices: propTypes.func.isRequired,
    loadPassengers: propTypes.func.isRequired,
    savePassenger: propTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        checkInPassengers: state.checkInPassengers,
        passengers: state.passengers,
        ancillaryServices: state.ancillaryServices,
    }
}

const mapDispatchToProps = {
    loadCheckInPassengers,
    saveCheckInPassenger,
    deleteCheckInPassenger,
    loadAncillaryServices,
    loadPassengers,
    savePassenger,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckInPassengerPage)
