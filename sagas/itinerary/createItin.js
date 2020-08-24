import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import {getStore} from "../../store/configureStore";
// import {store} from "store/index";

function* createItin( {data} ) {
    console.log("CREATE ITIN SAGA");

    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;

    console.log("createItin saga DATA: ", data);
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append('destination_id', data.destination_id);
    formData.append('day', data.day);
    

    console.log(formData);

    // pass to the api
    const { response, error } = yield call(api.createItin, formData, headers);

    console.log("RESPONSE", response, error);
    // // yield put();

    if (response) {
        yield put(Actions.createItinSuccess(response.data));
        yield put(Actions.getAll());
    }

    if (error) {
        yield put(Actions.createItinFail(error));
    }
}

// this code runs first and call above
function* watchCreateItin() {
    yield takeLatest(Actions.CREATE_ITIN, createItin)
}

export default function* submit() {
    yield all([fork(watchCreateItin)]);
}