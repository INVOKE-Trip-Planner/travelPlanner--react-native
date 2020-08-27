import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import {getStore} from "../../store/configureStore";
// import {store} from "store/index";

function* getAllSchedule() {
    console.log("GETALL Schedule SAGA");

    // // let store = getStore().getState();

    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;

    // console.log("token: ", token);

    const headers = { Authorization: `Bearer ${token}` };

    // pass to the api
    const { response, error } = yield call(api.getAllSchedule, headers);

    console.log("get all RESPONSE: ", response, error);
    // yield put();

    if (response) {
        yield put(Actions.getAllScheduleSuccess(response.data));
        // yield put(Actions.getAllSchedule(response.data));
    }

    if (error) {
        yield put(Actions.getAllScheduleFail(error));
    }
}

// this code runs first and call above
function* watchGetAllSchedule() {
    yield takeLatest(Actions.GET_ALL_SCHEDULE, getAllSchedule)
}

export default function* submit() {
    yield all([fork(watchGetAllSchedule)]);
}