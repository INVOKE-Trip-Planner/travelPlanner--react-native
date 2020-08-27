import { all, fork } from "redux-saga/effects";
import getAllSchedule from "./getAllSchedule";
import createSchedule from "./createSchedule";
import editSchedule from "./editSchedule";
import deleteSchedule from "./deleteSchedule";

export default function* home() {
  yield all(
      [
        fork(getAllSchedule),
        fork(createSchedule),
        fork(editSchedule),
        fork(deleteSchedule),
      ]
    );
}
