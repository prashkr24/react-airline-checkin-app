import * as types from "../actions/actionTypes";
import initialState from "./initialState";
export default function checkInPassengersReducer(
  state = initialState.checkInPassengers,
  action
) {
  switch (action.type) {
    case types.CREATE_CHECKIN_PASSENGER_SUCCESS:
      return [...state, { ...action.checkInPassenger }];
    case types.UPDATE_CHECKIN_PASSENGER_SUCCESS:
      return state.map((checkInPassenger) =>
        checkInPassenger.id === action.checkInPassenger.id
          ? action.checkInPassenger
          : checkInPassenger
      );
    case types.LOAD_CHECKIN_PASSENGERS_SUCCESS:
      return action.checkInPassengers;
    case types.DELETE_CHECKIN_PASSENGER_OPTIMISTIC:
      return state.filter(
        (checkInPassenger) => checkInPassenger.id !== action.checkInPassenger.id
      );
    default:
      return state;
  }
}
