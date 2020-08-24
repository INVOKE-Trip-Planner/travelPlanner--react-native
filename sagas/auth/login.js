import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "actions";
import * as api from "api";


function* login({ data }) {
  console.log("LOGIN DATA");

  // get input data
  const formData = new FormData();

  formData.append("username", data.username);
  formData.append("password", data.password);

  const { response, error} = yield call ( api.login, formData);
  console.log('Login Saga', response, error)

  if (response && response.status === 200){

    console.log(response);
    yield put(Actions.loginSuccess(response.data));
    yield put(Actions.activateUserSession(response.data.token));
    yield put(Actions.updateUserSuccess(response.data.user)); // login success => user get token


    //update the usersession

  }
 
  else if (error){
    yield put(Actions.loginFail(error.response))
  }

}

function* watchLogin() {
  yield takeLatest(Actions.LOGIN, login);
}

export default function* submit() {
  yield all([fork(watchLogin)]);
}
