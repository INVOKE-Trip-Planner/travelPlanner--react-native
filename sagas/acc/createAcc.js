import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import {getStore} from "../../store/configureStore";
// import {store} from "store/index";

function* createAcc( {data} ) {
    console.log("CREATE ACC SAGA", data);

    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;

    console.log("createAcc saga DATA: ", data);
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append('destination_id', data.destination_id);
    formData.append('accommodation_name', data.accommodation_name);
    formData.append('checkin_date', data.checkin_date);
    formData.append('checkin_hour', data.checkin_hour);
    formData.append('checkin_minute', data.checkin_minute);
    formData.append('checkout_date', data.checkout_date);
    formData.append('checkout_hour', data.checkout_hour);
    formData.append('checkout_minute', data.checkout_minute);
    formData.append('cost', data.cost);
    formData.append('booking_id', data.booking_id);

    console.log(formData);

    // pass to the api
    const { response, error } = yield call(api.createAcc, formData, headers);

    console.log("RESPONSE", response, error);
    // // yield put();

    if (response) {
        yield put(Actions.createAccSuccess(response.data));
        yield put(Actions.getAll());
    }

    if (error) {
        yield put(Actions.createAccFail(error));
    }
}

// this code runs first and call above
function* watchCreateAcc() {
    yield takeLatest(Actions.CREATE_ACC, createAcc)
}

export default function* submit() {
    yield all([fork(watchCreateAcc)]);
}