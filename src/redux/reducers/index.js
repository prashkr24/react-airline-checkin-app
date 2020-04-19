import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";
import passengers from "./passengerReducer";
import ancillaryServices from "./ancillaryServiceReducer";
import checkInPassengers from "./checkInPassengerReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
  passengers,
  ancillaryServices,
  checkInPassengers,
});

export default rootReducer;
