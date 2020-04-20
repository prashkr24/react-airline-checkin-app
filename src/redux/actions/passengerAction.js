import * as types from '../actions/actionTypes'
import * as passengerApi from '../../api/passengerApi'
import { apiCallError } from './apiStatusActions'

export function loadPassengersSuccess(passengers) {
    return { type: types.LOAD_PASSENGERS_SUCCESS, passengers }
}

export function createPassengerSuccess(passenger) {
    return { type: types.CREATE_PASSENGER_SUCCESS, passenger }
}

export function updatePassengerSuccess(passenger) {
    return { type: types.UPDATE_PASSENGER_SUCCESS, passenger }
}

export function deletePassengerOptimistic(passenger) {
    return { type: types.DELETE_PASSENGER_OPTIMISTIC, passenger }
}
export function loadPassengers() {
    return function (dispatch) {
        return passengerApi
            .getPassengers()
            .then((passengers) => {
                dispatch(loadPassengersSuccess(passengers))
            })
            .catch((error) => {
                dispatch(apiCallError(error))
                throw error
            })
    }
}

export function savePassenger(passenger) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        // dispatch(beginApiCall());
        return passengerApi
            .savePassenger(passenger)
            .then((savedPassenger) => {
                passenger.id
                    ? dispatch(updatePassengerSuccess(savedPassenger))
                    : dispatch(createPassengerSuccess(savedPassenger))
            })
            .catch((error) => {
                dispatch(apiCallError(error))
                throw error
            })
    }
}

export function deletePassenger(passenger) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this.
        // dispatch(deletePassengerOptimistic(passenger));
        return passengerApi.deletePassenger(passenger.id).then(() => {
            dispatch(deletePassengerOptimistic(passenger))
        })
    }
}
