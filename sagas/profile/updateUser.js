import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import {getStore} from "../../store/configureStore";
// import {store} from "store/index";

function* updateUser({ data }) {
    // console.log("GETALL SAGA");
    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;

    // console.log("editDes saga DATA: ", data);
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_confirmation', data.password_confirmation);
    formData.append('phone', data.phone);
    formData.append('trip_id', data.trip_id);
    formData.append('birth_date', data.birth_date);
   


    // pass to the api
    const { response, error } = yield call(api.updateUser, formData, headers);

    console.log("RESPONSE ", response, error);
    // yield put();

    if (response) {
        // yield put(Actions.getAll());
        yield put(Actions.updateUserSuccess(response.data));
        // yield put(Actions.updateUser(response.data));
    }

    if (error) {
        yield put(Actions.updateUserFail(error));
    }
}

// this code runs first and call above
function* watchUpdateUser() {
    yield takeLatest(Actions.UPDATE_USER, updateUser)
}

export default function* submit() {
    yield all([fork(watchUpdateUser)]);
}