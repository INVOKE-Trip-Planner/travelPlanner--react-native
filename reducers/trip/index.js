import { combineReducers } from "redux";

import getAll from "./getAll";
import create from "./create";
import deleteTrip from "./deleteTrip";
import updateTrip from "./updateTrip";

export default combineReducers({
  getAll, 
  create, 
  deleteTrip, 
  updateTrip,
});
