import * as types from '../actions/actionTypes'
import initialState from './initialState'
export default function passengerReducer(
    state = initialState.passengers,
    action
) {
    switch (action.type) {
        case types.CREATE_PASSENGER_SUCCESS:
            return [...state, { ...action.passenger }]
        case types.UPDATE_PASSENGER_SUCCESS:
            return state.map((passenger) =>
                passenger.id === action.passenger.id
                    ? action.passenger
                    : passenger
            )
        case types.LOAD_PASSENGERS_SUCCESS:
            if (action.filter.mandarotyFileds === true) {
                return action.passengers.filter((item) => {
                    return action.filter.flight !== item.flight
                        ? false
                        : !item.passport || !item.address || !item.dob
                })
            } else {
                return action.passengers.filter((item) => {
                    return action.filter.flight != item.flight ? false : true
                })
            }

        case types.DELETE_PASSENGER_OPTIMISTIC:
            return state.filter(
                (passenger) => passenger.id !== action.passenger.id
            )
        default:
            return state
    }
}
