export const NAME = "SCHEDULE"; // folder name

export const DELETE_SCHEDULE = `${NAME}/DELETE_SCHEDULE`; // AUTH/DELETE_SCHEDULE
export const DELETE_SCHEDULE_SUCCESS = `${NAME}/DELETE_SCHEDULE_SUCCESS`; // AUTH/DELETE_SCHEDULE_SUCCESS
export const DELETE_SCHEDULE_FAIL = `${NAME}/DELETE_SCHEDULE_FAIL`; // AUTH/DELETE_SCHEDULE_FAIL

export const getDeleteScheduleData = store => store[NAME].deleteSchedule;

// create action function
export const deleteSchedule = (data) => ({
    type: DELETE_SCHEDULE,
    data: data,
});

export const deleteScheduleSuccess = (data) => ({
    type: DELETE_SCHEDULE_SUCCESS,
    data,
});

export const deleteScheduleFail = (error) => ({
    type: DELETE_SCHEDULE_FAIL,
    error: error,
});