import * as types from "../actions/actionTypes";
import initialState from "./initialState";
export default function passengerReducer(
  state = initialState.passengers,
  action
) {
  console.log("state", state);
  console.log("action", action);

  switch (action.type) {
    case types.CREATE_PASSENGER_SUCCESS:
      return [...state, { ...action.passenger }];
    case types.UPDATE_PASSENGER_SUCCESS:
      return state.map((passenger) =>
        passenger.id === action.passenger.id ? action.passenger : passenger
      );
    case types.LOAD_PASSENGERS_SUCCESS:
      return action.passengers;
    case types.DELETE_PASSENGER_OPTIMISTIC:
      return state.filter((passenger) => passenger.id !== action.passenger.id);
    default:
      return state;
  }
}
