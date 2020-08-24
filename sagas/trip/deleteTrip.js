import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { getStore} from "../../store/configureStore";

// import { encode } from "../../services/encryption";


function* deleteTrip({ data}) {
    console.log("deleteTrip saga");


    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;
    console.log("Token is :", token);
    const headers = {Authorization : `Bearer ${token}` };

    console.log(data)


    const formData = new FormData();
    formData.append("id", data)

    

  


    const { response, error} = yield call (api.deleteTrip, formData, headers);
    console.log(response, error);

    if(response && response.data.status === "success"){

      yield put(Actions.deleteTrip_success(response.data))
      yield put(Actions.getAll())
    }
    
    if(error){
    
      yield put(Actions.deleteTrip_fail(error))
    }
    
    
};





function* watchDeleteTrip() {
  yield takeLatest(Actions.DELETE_TRIP, deleteTrip);
}

export default function* submit() {
  yield all([fork(watchDeleteTrip)]);
}
