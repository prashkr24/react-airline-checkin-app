import * as types from '../actions/actionTypes'
import * as checkInPassengerApi from '../../api/checkInPassengerApi'
import { apiCallError } from './apiStatusActions'

export function loadCheckInPassengersSuccess(checkInPassengers) {
    return { type: types.LOAD_CHECKIN_PASSENGERS_SUCCESS, checkInPassengers }
}

export function createCheckInPassengerSuccess(checkInPassenger) {
    return { type: types.CREATE_CHECKIN_PASSENGER_SUCCESS, checkInPassenger }
}

export function updateCheckInPassengerSuccess(checkInPassenger) {
    return { type: types.UPDATE_CHECKIN_PASSENGER_SUCCESS, checkInPassenger }
}

export function deleteCheckInPassengerOptimistic(checkInPassenger) {
    return { type: types.DELETE_CHECKIN_PASSENGER_OPTIMISTIC, checkInPassenger }
}
export function loadCheckInPassengers() {
    return function (dispatch) {
        return checkInPassengerApi
            .getCheckInPassengers()
            .then((checkInPassengers) => {
                dispatch(loadCheckInPassengersSuccess(checkInPassengers))
            })
            .catch((error) => {
                dispatch(apiCallError(error))
                throw error
            })
    }
}

export function saveCheckInPassenger(checkInPassenger) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        return checkInPassengerApi
            .saveCheckInPassenger(checkInPassenger)
            .then((savedCheckInPassenger) => {
                checkInPassenger.id
                    ? dispatch(
                          updateCheckInPassengerSuccess(savedCheckInPassenger)
                      )
                    : dispatch(
                          createCheckInPassengerSuccess(savedCheckInPassenger)
                      )
            })
            .catch((error) => {
                dispatch(apiCallError(error))
                throw error
            })
    }
}

export function deleteCheckInPassenger(checkInPassenger) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this.
        // dispatch(deletePassengerOptimistic(checkInPassenger));
        return checkInPassengerApi
            .deleteCheckInPassenger(checkInPassenger.id)
            .then(() => {
                dispatch(deleteCheckInPassengerOptimistic(checkInPassenger))
            })
    }
}
