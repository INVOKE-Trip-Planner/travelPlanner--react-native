import { all, fork } from "redux-saga/effects";

import auth from "./auth";
import trip from "./trip";


export default function* submit() {
  yield all([fork(auth), fork(trip)]);
}
