import { all, fork } from "redux-saga/effects";
import getAll from "./getAll";


export default function* home() {
  yield all([
    fork(getAll), 
    ]);
}
