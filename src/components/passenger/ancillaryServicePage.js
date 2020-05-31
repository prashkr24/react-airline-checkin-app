import React, { useEffect } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import {
    loadAncillaryServices,
    saveAncillaryService,
    deleteAncillaryService,
} from '../../redux/actions/ancillarySeriveAction'
import propTypes from 'prop-types'

function ManageAncillaryServicePage({
    ancillaryServices,
    loadAncillaryServices,
    saveAncillaryService,
    deleteAncillaryService,
}) {
    const columns = [
        {
            title: 'Flight',
            field: 'flight',
            lookup: { 1: 'Flight 1', 2: 'Flight 2', 3: 'Flight 3' },
        },
        {
            title: 'Service Type',
            field: 'type',
            lookup: { 1: 'Sepcial Meals', 2: 'Shopping Items' },
        },
        {
            title: 'Service',
            field: 'service',
        },
    ]

    useEffect(() => {
        if (ancillaryServices.length === 0) {
            loadAncillaryServices()
        }
    }, [])

    function handleSave(ancillaryService) {
        saveAncillaryService(ancillaryService)
    }

    async function handleDeleteAncillaryService(ancillaryService) {
        await deleteAncillaryService(ancillaryService)
    }

    return (
        <MaterialTable
            title="Manage AncillaryService"
            columns={columns}
            data={ancillaryServices}
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
                        handleDeleteAncillaryService(oldData)
                    }),
            }}
        />
    )
}

ManageAncillaryServicePage.propTypes = {
    ancillaryServices: propTypes.array.isRequired,
    loadAncillaryServices: propTypes.func.isRequired,
    saveAncillaryService: propTypes.func.isRequired,
    deleteAncillaryService: propTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        ancillaryServices: state.ancillaryServices,
    }
}

const mapDispatchToProps = {
    loadAncillaryServices,
    saveAncillaryService,
    deleteAncillaryService,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageAncillaryServicePage)
