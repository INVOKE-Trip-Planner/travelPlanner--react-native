export const NAME = "SCHEDULE"; // folder name

export const CREATE_SCHEDULE = `${NAME}/CREATE_SCHEDULE`; // AUTH/CREATESCHEDULE
export const CREATE_SCHEDULE_SUCCESS = `${NAME}/CREATE_SCHEDULE_SUCCESS`; // AUTH/CREATESCHEDULE_SUCCESS
export const CREATE_SCHEDULE_FAIL = `${NAME}/CREATE_SCHEDULE_FAIL`; // AUTH/CREATESCHEDULE_FAIL

export const getCreateScheduleData = store => store[NAME].createSchedule;

// create action function
export const createSchedule = (data) => ({
    type: CREATE_SCHEDULE,
    data: data,
});

export const createScheduleSuccess = (data) => ({
    type: CREATE_SCHEDULE_SUCCESS,
    data,
});

export const createScheduleFail = (error) => ({
    type: CREATE_SCHEDULE_FAIL,
    error: error,
});