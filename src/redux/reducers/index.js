import { combineReducers } from 'redux'
import apiCallsInProgress from './apiStatusReducer'
import passengers from './passengerReducer'
import ancillaryServices from './ancillaryServiceReducer'
import checkInPassengers from './checkInPassengerReducer'

const rootReducer = combineReducers({
    apiCallsInProgress,
    passengers,
    ancillaryServices,
    checkInPassengers,
})

export default rootReducer
