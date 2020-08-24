import { combineReducers } from "redux";

import createDes from "./createDes";
import editDes from "./editDes";
import deleteDes from "./deleteDes";
import getAllDes from "./getAllDes";

export default combineReducers({
    getAllDes,
    createDes,
    editDes,
    deleteDes,
});