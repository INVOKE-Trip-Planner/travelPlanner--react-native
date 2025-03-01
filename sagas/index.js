import { all, fork } from "redux-saga/effects";

import auth from "./auth";
import trip from "./trip";
import acc from "./acc";
import transport from "./transport";
import itinerary from "./itinerary";
import destination from "./destination";
import profile from "./profile";
import schedule from "./schedule";



export default function* submit() {
  yield all([
    fork(auth), 
    fork(trip),
    fork(acc), 
    fork(transport), 
    fork(itinerary),
    fork(destination),
    fork(profile),
    fork(schedule),
  ]);
}
