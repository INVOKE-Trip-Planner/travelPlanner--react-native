import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import {getStore} from "../../store/configureStore";
// import {store} from "store/index";

function* createSchedule( {data} ) {
    console.log("CREATE SCHEDULE SAGA");

    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;

    console.log("createSchedule saga DATA: ", data);
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append('itinerary_id', data.itinerary_id);
    formData.append('hour', data.hour);
    formData.append('minute', data.minute);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('cost', data.cost);
    

    console.log(formData);

    // pass to the api
    const { response, error } = yield call(api.createSchedule, formData, headers);

    console.log("RESPONSE", response, error);
    // // yield put();

    if (response) {
        yield put(Actions.createScheduleSuccess(response.data));
        yield put(Actions.getAll());
    }

    if (error) {
        yield put(Actions.createScheduleFail(error));
    }
}

// this code runs first and call above
function* watchCreateSchedule() {
    yield takeLatest(Actions.CREATE_SCHEDULE, createSchedule)
}

export default function* submit() {
    yield all([fork(watchCreateSchedule)]);
}