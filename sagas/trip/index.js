import { all, fork } from "redux-saga/effects";
import getAll from "./getAll";
import create from "./create";
import deleteTrip from "./deleteTrip";


export default function* home() {
  yield all([
    fork(getAll), 
    fork(create), 
    fork(deleteTrip), 
    ]);
}
