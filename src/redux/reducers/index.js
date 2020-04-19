import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";
import passengers from "./passengerReducer";
import ancillaryServices from "./ancillaryServiceReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
  passengers,
  ancillaryServices,
});

export default rootReducer;
