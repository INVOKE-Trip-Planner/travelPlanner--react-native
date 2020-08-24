import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { getStore} from "../../store/configureStore";

function* getAllDes() {
    console.log("GETALL DESTINATION SAGA");


    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;

    // console.log("token: ", token);

    const headers = { Authorization: `Bearer ${token}` };

    // pass to the api
    const { response, error } = yield call(api.getAllDes, headers);

    console.log("get all RESPONSE: ", response, error);
    // yield put();

    if (response) {
        yield put(Actions.getAllDesSuccess(response.data));
        // yield put(Actions.getAllDes(response.data));
    }

    if (error) {
        yield put(Actions.getAllDesFail(error));
    }
}

// this code runs first and call above
function* watchGetAllDes() {
    yield takeLatest(Actions.GET_ALL_DESTINATION, getAllDes)
}

export default function* submit() {
    yield all([fork(watchGetAllDes)]);
}