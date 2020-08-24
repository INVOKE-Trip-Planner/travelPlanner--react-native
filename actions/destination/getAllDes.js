export const NAME = "DESTINATION"; // folder name

export const GET_ALL_DESTINATION = `${NAME}/GET_ALL_DESTINATION`; // AUTH/GET_ALL_DESTINATION
export const GET_ALL_DESTINATION_SUCCESS = `${NAME}/GET_ALL_DESTINATION_SUCCESS`; // AUTH/GET_ALL_DESTINATION_SUCCESS
export const GET_ALL_DESTINATION_FAIL = `${NAME}/GET_ALL_DESTINATION_FAIL`; // AUTH/GET_ALL_DESTINATION_FAIL

export const getGetAllDesData = store => store[NAME].getAllDes;

// create action function
export const getAllDes = (data) => ({
    type: GET_ALL_DESTINATION,
    data: data,
});

export const getAllDesSuccess = (data) => ({
    type: GET_ALL_DESTINATION_SUCCESS,
    data,
});

export const getAllDesFail = (error) => ({
    type: GET_ALL_DESTINATION_FAIL,
    error: error,
});