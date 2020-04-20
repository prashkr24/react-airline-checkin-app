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
            { title: 'Name', field: 'name' },
            { title: 'Passport Details', field: 'passport' },
            { title: 'Address', field: 'address' },
        ],
    })

    useEffect(() => {
        if (passengers.length === 0) {
            loadPassengers().catch(() => {})
        }
    }, [])

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
