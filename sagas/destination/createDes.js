import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";


import { getStore} from "../../store/configureStore";

function* createDes( {data} ) {
    console.log("CREATE DESTINATION SAGA");

    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;

    console.log("createDes saga DATA: ", data);
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append('trip_id', data.trip_id);
    formData.append('location', data.location);
    formData.append('start_date', data.start_date);
    formData.append('end_date', data.end_date);
    


    console.log(formData);

    // pass to the api
    const { response, error } = yield call(api.createDes, formData, headers);

    console.log("RESPONSE", response, error);
    // // yield put();

    if (response) {
        yield put(Actions.createDesSuccess(response.data));
        yield put(Actions.getAll());
    }

    if (error) {
        yield put(Actions.createDesFail(error));
    }
}

// this code runs first and call above
function* watchCreateDes() {
    yield takeLatest(Actions.CREATE_DESTINATION, createDes)
}

export default function* submit() {
    yield all([fork(watchCreateDes)]);
}