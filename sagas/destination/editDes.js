import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { getStore} from "../../store/configureStore";

function* editDes( {data} ) {
    console.log("EDIT DESTINATION SAGA");

    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;

    // console.log("editDes saga DATA: ", data);
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append('trip_id', data.trip_id);
    formData.append('location', data.location);
    formData.append('start_date', data.end_date);
    formData.append('end_date', data.end_date);

    // pass to the api
    const { response, error } = yield call(api.editDes, formData, headers);

    console.log("RESPONSE", response, error);
    // // yield put();

    if (response) {
        yield put(Actions.editDesSuccess(response.data));
        yield put(Actions.getAll(response.data));
    }

    if (error) {
        yield put(Actions.editDesFail(error));
    }
}

// this code runs first and call above
function* watchEditDes() {
    yield takeLatest(Actions.EDIT_DESTINATION, editDes)
}

export default function* submit() {
    yield all([fork(watchEditDes)]);
}