import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import {getStore} from "../../store/configureStore";
// import {store} from "store/index";

function* editSchedule( {data} ) {
    console.log("EDIT Schedule SAGA");

    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;

    // console.log("editSchedule saga DATA: ", data);
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('hour', data.hour);
    formData.append('minute', data.minute);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('cost', data.cost);
    formData.append('id', data.id);
    

    // pass to the api
    const { response, error } = yield call(api.editSchedule, formData, headers);

    console.log("RESPONSE", response, error);
    // // yield put();

    if (response) {
        yield put(Actions.editScheduleSuccess(response.data));
        yield put(Actions.getAll(response.data));
    }

    if (error) {
        yield put(Actions.editScheduleFail(error));
    }
}

// this code runs first and call above
function* watchEditSchedule() {
    yield takeLatest(Actions.EDIT_SCHEDULE, editSchedule)
}

export default function* submit() {
    yield all([fork(watchEditSchedule)]);
}