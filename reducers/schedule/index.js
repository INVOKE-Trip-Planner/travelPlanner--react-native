import { combineReducers } from "redux";

import createSchedule from "./createSchedule";
import editSchedule from "./editSchedule";
import deleteSchedule from "./deleteSchedule";
import getAllSchedule from "./getAllSchedule";

export default combineReducers({
    getAllSchedule,
    createSchedule,
    editSchedule,
    deleteSchedule,
});