import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { getStore} from "../../store/configureStore";

// import { encode } from "../../services/encryption";


function* create({ data}) {
    console.log("create saga");
    console.log(data)


    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;
    console.log("Token is :", token);
    const headers = {Authorization : `Bearer ${token}` };


    const formData = new FormData();
    formData.append("trip_name", data.trip_name);
    formData.append("origin", data.origin);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("group_type", data.group_type);
    formData.append("trip_type", data.trip_type);
  


    const { response, error} = yield call (api.create, formData, headers);
    console.log(response, error);

    if(response && response.data.status === "success"){

      yield put(Actions.create_success(response.data))
      yield put(Actions.getAll())
    }
    
    if(error){
    
      yield put(Actions.create_fail(error))
    }
    
    
};





function* watchCreate() {
  yield takeLatest(Actions.CREATE, create);
}

export default function* submit() {
  yield all([fork(watchCreate)]);
}
