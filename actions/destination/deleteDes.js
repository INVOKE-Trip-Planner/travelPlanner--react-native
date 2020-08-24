export const NAME = "DESTINATION"; // folder name

export const DELETE_DESTINATION = `${NAME}/DELETE_DESTINATION`; // AUTH/DELETE_DESTINATION
export const DELETE_DESTINATION_SUCCESS = `${NAME}/DELETE_DESTINATION_SUCCESS`; // AUTH/DELETE_DESTINATION_SUCCESS
export const DELETE_DESTINATION_FAIL = `${NAME}/DELETE_DESTINATION_FAIL`; // AUTH/DELETE_DESTINATION_FAIL

export const getDeleteDesData = store => store[NAME].deleteDes;

// create action function
export const deleteDes = (data) => ({
    type: DELETE_DESTINATION,
    data: data,
});

export const deleteDesSuccess = (data) => ({
    type: DELETE_DESTINATION_SUCCESS,
    data,
});

export const deleteDesFail = (error) => ({
    type: DELETE_DESTINATION_FAIL,
    error: error,
});