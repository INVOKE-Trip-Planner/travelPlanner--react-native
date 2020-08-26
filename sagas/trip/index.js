import { all, fork } from "redux-saga/effects";
import getAll from "./getAll";
import create from "./create";
import deleteTrip from "./deleteTrip";
import updateTrip from "./updateTrip";

export default function* home() {
  yield all([
    fork(getAll), 
    fork(create), 
    fork(deleteTrip), 
    fork(updateTrip), 
    ]);
}
