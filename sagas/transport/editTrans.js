import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { getStore} from "../../store/configureStore";

function* editTrans( {data} ) {
    console.log("EDIT TRANS SAGA");

    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;

    // console.log("editTrans saga DATA: ", data);
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('mode', data.mode);
    formData.append('origin', data.origin);
    formData.append('destination', data.destination);
    formData.append('departure_date', data.departure_date);
    formData.append('departure_hour', data.departure_hour);
    formData.append('departure_minute', data.departure_minute);
    formData.append('arrival_date', data.arrival_date);
    formData.append('arrival_hour', data.arrival_hour);
    formData.append('arrival_minute', data.arrival_minute);
    formData.append('cost', data.cost);
    formData.append('booking_id', data.booking_id);
    formData.append('operator', data.operator);

    // pass to the api
    const { response, error } = yield call(api.editTrans, formData, headers);

    console.log("RESPONSE", response, error);
    // // yield put();

    if (response) {
        yield put(Actions.editTransSuccess(response.data));
        yield put(Actions.getAll(response.data));
    }

    if (error) {
        yield put(Actions.editTransFail(error));
    }
}

// this code runs first and call above
function* watchEditTrans() {
    yield takeLatest(Actions.EDIT_TRANS, editTrans)
}

export default function* submit() {
    yield all([fork(watchEditTrans)]);
}