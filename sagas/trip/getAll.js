import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { getStore} from "../../store/configureStore";

// import { encode } from "../../services/encryption";


function* getAll({data}) {
    console.log("getAll saga");

    console.log("Data")
    let store = getStore().getState()
    let token = Actions.getUserSession(store).data;
    console.log("Token is :", token);
    const headers = {Authorization : `Bearer ${token}` };
   

    const { response, error} = yield call(api.getAll, headers);
    console.log('GET ALL SAGA',response,error);

    if(response){

      yield put(Actions.getAll_success(response.data))
    }
    
    if(error){
    
      yield put(Actions.getAll_fail(error))
    }
    
    
};





function* watchgetAll() {
  yield takeLatest(Actions.GET_ALL, getAll);
}

export default function* submit() {
  yield all([fork(watchgetAll)]);
}
