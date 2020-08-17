import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "actions";
import * as api from "api";

// import { encode } from "../../services/encryption";

function* register({ data }) {
    console.log("register saga");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("birth_date", data.birth_date);

    const { response, error} = yield call (api.register, formData);
    console.log(response, error);

    if(response && response.data.status === "success"){

      yield put(Actions.register_success(response.data))
    }
    
    if(error){
    
      yield put(Actions.register_fail(error))
    }
    
    
};





function* watchRegister() {
  yield takeLatest(Actions.REGISTER, register);
}

export default function* submit() {
  yield all([fork(watchRegister)]);
}
