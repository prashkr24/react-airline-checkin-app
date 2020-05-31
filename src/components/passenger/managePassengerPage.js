import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import {
    loadPassengers,
    savePassenger,
    deletePassenger,
} from '../../redux/actions/passengerAction'
import propTypes from 'prop-types'

function ManagePassengerPage({
    passengers,
    loadPassengers,
    savePassenger,
    deletePassenger,
}) {
    const [state] = useState({
        columns: [
            {
                title: 'Name',
                field: 'name',
            },
            { title: 'Passport No', field: 'passport' },
            { title: 'Address', field: 'address' },
            { title: 'DOB', field: 'dob', type: 'date' },
            {
                title: 'Weelchair',
                field: 'weelchair',
                type: 'boolean',
            },
            { title: 'Infant', field: 'infant', type: 'boolean' },
            {
                title: 'Spl Meals',
                field: 'specialMeals',
                type: 'boolean',
            },
            {
                title: 'Flight',
                field: 'flight',
                lookup: { 1: 'Flight 1', 2: 'Flight 2', 3: 'Flight 3' },
            },
            {
                title: 'Sean No',
                field: 'seatno',
                lookup: {
                    A1: 'A1',
                    B1: 'B1',
                    C1: 'C1',
                    A2: 'A2',
                    B2: 'B2',
                    C2: 'C2',
                },
            },
        ],
    })

    const [mandatoryFilter, setMandatoryfilter] = useState(true)

    useEffect(() => {
        if (passengers.length === 0) {
            loadPassengers({ mandarotyFileds: false }).catch(() => {})
        }
    }, [passengers])

    function handleSave(passenger) {
        savePassenger(passenger)
    }

    async function handleDeletePassenger(passenger) {
        await deletePassenger(passenger)
    }

    return (
        <MaterialTable
            title="Manage Passenger"
            columns={state.columns}
            data={passengers}
            actions={[
                {
                    icon: 'filter_list',
                    tooltip:
                        'Filter passengers by missing mandatory requirements (Passport,Address & DOB)',
                    isFreeAction: true,
                    onClick: (event) => {
                        setMandatoryfilter(!mandatoryFilter)
                        loadPassengers({ mandarotyFileds: mandatoryFilter })
                    },
                },
            ]}
            options={{
                actionsColumnIndex: -1,
                filtering: true,
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        handleSave({ ...newData, id: null })
                        resolve()
                    }),
                onRowUpdate: (newData) =>
                    new Promise((resolve) => {
                        resolve()
                        handleSave(newData)
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        resolve()
                        handleDeletePassenger(oldData)
                    }),
            }}
        />
    )
}

ManagePassengerPage.propTypes = {
    passengers: propTypes.array.isRequired,
    loadPassengers: propTypes.func.isRequired,
    savePassenger: propTypes.func.isRequired,
    deletePassenger: propTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        passengers: state.passengers,
    }
}

const mapDispatchToProps = {
    loadPassengers,
    savePassenger,
    deletePassenger,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePassengerPage)
