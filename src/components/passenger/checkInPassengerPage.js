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
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

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

    const [selectedPassenger, setSelectedPassenger] = React.useState({
        name: '',
        passport: '',
        address: '',
        dob: '',
        infant: false,
        weelchair: false,
        specialMeals: false,
        flight: '',
        seatno: '',
        id: '',
        createdAt: '',
        checkedIn: false,
    })

    const [filter, setFilter] = React.useState({
        weelchair: false,
        infant: false,
        specialMeals: false,
        checkedIn: false,
    })

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

    // useEffect(() => {
    //     console.log('rendering')
    //     //loadAsyncData()
    // }, [selectedPassenger])

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

    const handleCheckedIn = (event) => {
        setSelectedPassenger({
            ...selectedPassenger,
            checkedIn: event.target.checked,
        })
    }

    const handleWeelchair = (event) => {
        setSelectedPassenger({
            ...selectedPassenger,
            weelchair: event.target.checked,
        })
    }

    const handleInfant = (event) => {
        setSelectedPassenger({
            ...selectedPassenger,
            infant: event.target.checked,
        })
    }

    const handleSpecialMeals = (event) => {
        setSelectedPassenger({
            ...selectedPassenger,
            specialMeals: event.target.checked,
        })
    }

    const handleSeatNo = (event) => {
        setSelectedPassenger({
            ...selectedPassenger,
            seatno: event.target.value,
        })
    }

    const handleWeelChairFilter = (event) => {
        setFilter({
            ...filter,
            weelchair: event.target.checked,
        })
    }

    const handleInfantFilter = (event) => {
        setFilter({
            ...filter,
            infant: event.target.checked,
        })
    }

    const handleSpecialMealsFilter = (event) => {
        setFilter({
            ...filter,
            specialMeals: event.target.checked,
        })
    }

    const handleCheckedInFilter = (event) => {
        setFilter({
            ...filter,
            checkedIn: event.target.checked,
        })
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
    }

    function handleSave(passenger) {
        console.log('passenger', passenger)

        savePassenger(passenger)
        loadSeatNo()
    }

    function loadSeatNo() {
        const seatNumbers = [
            'A1',
            'B1',
            'C1',
            'A2',
            'B2',
            'C2',
            'A3',
            'B3',
            'C3',
        ]

        let optionItems = seatNumbers.map((item) =>
            passengers.find((o) => o.seatno === item) === undefined ? (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
            ) : (
                <MenuItem disabled key={item} value={item}>
                    {item}
                </MenuItem>
            )
        )
        return optionItems
    }

    function isPassengerCheckedIn(seatno) {
        let checkedIn = false
        let passenger = {}
        passengers.map((item) => {
            if (item.seatno === seatno) {
                checkedIn = true
                passenger = item
            }
        })

        console.log('passenger', passenger)
        console.log('filter', filter)

        if (
            (filter.checkedIn === true && passenger.checkedIn !== true) ||
            (filter.weelchair === true && passenger.weelchair !== true) ||
            (filter.infant === true && passenger.infant !== true) ||
            (filter.specialMeals === true && passenger.specialMeals !== true)
        ) {
            return false
        }

        if (checkedIn) {
            return (
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                        //console.log(passenger)
                        setPassengerCheckIn(passenger)
                    }}
                >
                    {seatno}
                    <AccessibleIcon
                        color={passenger.weelchair ? 'default' : 'primary'}
                    />
                    <ChildFriendlyIcon
                        color={passenger.infant ? 'default' : 'primary'}
                    />
                    <RestaurantMenuIcon
                        color={passenger.specialMeals ? 'default' : 'primary'}
                    />

                    <CheckCircleIcon
                        color={passenger.checkedIn ? 'default' : 'primary'}
                    ></CheckCircleIcon>
                </Button>
            )
        } else {
            return (
                <Button
                    disabled
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
                    {/* <ShoppingCartIcon /> */}
                    <CheckCircleIcon />
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            Filter:
                            <Checkbox
                                checked={filter.weelchair}
                                onChange={(event) => {
                                    handleWeelChairFilter(event)
                                }}
                                inputProps={{
                                    'aria-label': 'primary checkbox',
                                }}
                            />
                            <AccessibleIcon /> Passenger required weelchair
                            <Checkbox
                                checked={filter.infant}
                                onChange={(event) => {
                                    handleInfantFilter(event)
                                }}
                                inputProps={{
                                    'aria-label': 'primary checkbox',
                                }}
                            />
                            <ChildFriendlyIcon /> Passenger with infant
                            <Checkbox
                                checked={filter.specialMeals}
                                onChange={(event) => {
                                    handleSpecialMealsFilter(event)
                                }}
                                inputProps={{
                                    'aria-label': 'primary checkbox',
                                }}
                            />
                            <RestaurantMenuIcon /> Passenger requested special
                            meal
                            <Checkbox
                                checked={filter.checkedIn}
                                onChange={(event) => {
                                    handleCheckedInFilter(event)
                                }}
                                inputProps={{
                                    'aria-label': 'primary checkbox',
                                }}
                            />
                            <CheckCircleIcon /> Passenger checked in
                        </Paper>
                    </Grid>
                    <Grid item justify="space-between">
                        {seatColumns.map((seatColumn) => (
                            // eslint-disable-next-line react/jsx-key
                            <Paper className={classes.paper}>
                                {seatRows.map((seatRow) =>
                                    isPassengerCheckedIn(seatColumn + seatRow)
                                )}
                            </Paper>
                        ))}
                    </Grid>

                    <Grid item>
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
                                        checked={selectedPassenger.checkedIn}
                                        onChange={handleCheckedIn}
                                        inputProps={{
                                            'aria-label': 'primary checkbox',
                                        }}
                                    />
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="Seat No" />
                                    <Select
                                        value={selectedPassenger.seatno}
                                        onChange={handleSeatNo}
                                    >
                                        {loadSeatNo()}
                                        {/* <MenuItem value="A1">A1</MenuItem>
                                        <MenuItem value="B1">B1</MenuItem>
                                        <MenuItem value="C1">C1</MenuItem>
                                        <MenuItem value="A2">A2</MenuItem>
                                        <MenuItem value="B2">B2</MenuItem>
                                        <MenuItem value="C2">C2</MenuItem> */}
                                    </Select>
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
                                <Checkbox
                                    checked={selectedPassenger.weelchair}
                                    onChange={handleWeelchair}
                                    inputProps={{
                                        'aria-label': 'primary checkbox',
                                    }}
                                />
                                <AccessibleIcon
                                    color={
                                        !selectedPassenger.weelchair
                                            ? 'default'
                                            : 'primary'
                                    }
                                />
                                <Checkbox
                                    checked={selectedPassenger.infant}
                                    onChange={handleInfant}
                                    inputProps={{
                                        'aria-label': 'primary checkbox',
                                    }}
                                />
                                <ChildFriendlyIcon
                                    color={
                                        !selectedPassenger.infant
                                            ? 'default'
                                            : 'primary'
                                    }
                                />
                                <Checkbox
                                    checked={selectedPassenger.specialMeals}
                                    onChange={handleSpecialMeals}
                                    inputProps={{
                                        'aria-label': 'primary checkbox',
                                    }}
                                />
                                <RestaurantMenuIcon
                                    color={
                                        !selectedPassenger.specialMeals
                                            ? 'default'
                                            : 'primary'
                                    }
                                />
                                {/* <ListItem divider>
                                    <ListItemText primary="Ancillary Services" />
                                    <ListItemText primary="Checked In" />

                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                    >
                                        <AccessibleIcon
                                            color={
                                                selectedPassenger.weelchair
                                                    ? 'default'
                                                    : 'primary'
                                            }
                                        />
                                        <ChildFriendlyIcon
                                            color={
                                                selectedPassenger.infant
                                                    ? 'default'
                                                    : 'primary'
                                            }
                                        />
                                        <RestaurantMenuIcon
                                            color={
                                                selectedPassenger.specialMeals
                                                    ? 'default'
                                                    : 'primary'
                                            }
                                        />
                                    </Button>
                                </ListItem> */}
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
