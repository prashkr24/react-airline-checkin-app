import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";
import passengers from "./passengerReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
  passengers,
});

export default rootReducer;
