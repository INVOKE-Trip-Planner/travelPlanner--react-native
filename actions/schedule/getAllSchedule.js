export const NAME = "SCHEDULE"; // folder name

export const GET_ALL_SCHEDULE = `${NAME}/GET_ALL_SCHEDULE`; // AUTH/GET_ALL_SCHEDULE
export const GET_ALL_SCHEDULE_SUCCESS = `${NAME}/GET_ALL_SCHEDULE_SUCCESS`; // AUTH/GET_ALL_SCHEDULE_SUCCESS
export const GET_ALL_SCHEDULE_FAIL = `${NAME}/GET_ALL_SCHEDULE_FAIL`; // AUTH/GET_ALL_SCHEDULE_FAIL

export const getGetAllScheduleData = store => store[NAME].getAllSchedule;

// create action function
export const getAllSchedule = (data) => ({
    type: GET_ALL_SCHEDULE,
    data: data,
});

export const getAllScheduleSuccess = (data) => ({
    type: GET_ALL_SCHEDULE_SUCCESS,
    data,
});

export const getAllScheduleFail = (error) => ({
    type: GET_ALL_SCHEDULE_FAIL,
    error: error,
});