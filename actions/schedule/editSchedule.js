export const NAME = "SCHEDULE"; // folder name

export const EDIT_SCHEDULE = `${NAME}/EDIT_SCHEDULE`; // AUTH/EDITSCHEDULE
export const EDIT_SCHEDULE_SUCCESS = `${NAME}/EDIT_SCHEDULE_SUCCESS`; // AUTH/EDITSCHEDULE_SUCCESS
export const EDIT_SCHEDULE_FAIL = `${NAME}/EDIT_SCHEDULE_FAIL`; // AUTH/EDITSCHEDULE_FAIL

export const getEditScheduleData = store => store[NAME].editSchedule;

// create action function
export const editSchedule = (data) => ({
    type: EDIT_SCHEDULE,
    data: data,
});

export const editScheduleSuccess = (data) => ({
    type: EDIT_SCHEDULE_SUCCESS,
    data,
});

export const editScheduleFail = (error) => ({
    type: EDIT_SCHEDULE_FAIL,
    error: error,
});