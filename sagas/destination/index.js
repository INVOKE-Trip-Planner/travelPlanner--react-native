import { all, fork } from "redux-saga/effects";
import getAllDes from "./getAllDes";
import createDes from "./createDes";
import editDes from "./editDes";
import deleteDes from "./deleteDes";

export default function* home() {
  yield all(
      [
        fork(getAllDes),
        fork(createDes),
        fork(editDes),
        fork(deleteDes),
      ]
    );
}
