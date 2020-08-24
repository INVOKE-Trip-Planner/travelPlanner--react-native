export const NAME = "DESTINATION"; // folder name

export const CREATE_DESTINATION = `${NAME}/CREATE_DESTINATION`; // AUTH/CREATEDESTINATION
export const CREATE_DESTINATION_SUCCESS = `${NAME}/CREATE_DESTINATION_SUCCESS`; // AUTH/CREATEDESTINATION_SUCCESS
export const CREATE_DESTINATION_FAIL = `${NAME}/CREATE_DESTINATION_FAIL`; // AUTH/CREATEDESTINATION_FAIL

export const getCreateDesData = store => store[NAME].createDes;

// create action function
export const createDes = (data) => ({
    type: CREATE_DESTINATION,
    data: data,
});

export const createDesSuccess = (data) => ({
    type: CREATE_DESTINATION_SUCCESS,
    data,
});

export const createDesFail = (error) => ({
    type: CREATE_DESTINATION_FAIL,
    error: error,
});