import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { getStore} from "../../store/configureStore";

function* deleteDes( {data} ) {
    console.log("DELETE Destination SAGA");


    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;

    // console.log("token: ", token);
    // console.log("data: ", data);

    const formData = new FormData();
    formData.append('id', data);

    const headers = { Authorization: `Bearer ${token}` };

    // pass to the api
    const { response, error } = yield call(api.deleteDes, formData, headers);

    console.log("Delete response: ", response, error);
    // yield put();

    if (response) {
        yield put(Actions.deleteDesSuccess(response.data));
        yield put(Actions.getAll(response.data));
    }

    if (error) {
        yield put(Actions.deleteDesFail(error));
    }
}

// this code runs first and call above
function* watchDeleteDes() {
    yield takeLatest(Actions.DELETE_DESTINATION, deleteDes)
}

export default function* submit() {
    yield all([fork(watchDeleteDes)]);
}