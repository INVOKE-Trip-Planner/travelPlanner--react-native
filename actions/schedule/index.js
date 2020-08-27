import * as createSchedule from "./createSchedule";
import * as deleteSchedule from "./deleteSchedule";
import * as getAllSchedule from "./getAllSchedule";
import * as editSchedule from "./editSchedule";

export default {
  ...getAllSchedule,
  ...createSchedule,
  ...editSchedule,
  ...deleteSchedule,
};
