export const NAME = "DESTINATION"; // folder name

export const EDIT_DESTINATION = `${NAME}/EDIT_DESTINATION`; // AUTH/EDITDESTINATION
export const EDIT_DESTINATION_SUCCESS = `${NAME}/EDIT_DESTINATION_SUCCESS`; // AUTH/EDITDESTINATION_SUCCESS
export const EDIT_DESTINATION_FAIL = `${NAME}/EDIT_DESTINATION_FAIL`; // AUTH/EDITTRANS_FAIL

export const getEditDesData = store => store[NAME].editDes;

// create action function
export const editDes = (data) => ({
    type: EDIT_DESTINATION,
    data: data,
});

export const editDesSuccess = (data) => ({
    type: EDIT_DESTINATION_SUCCESS,
    data,
});

export const editDesFail = (error) => ({
    type: EDIT_DESTINATION_FAIL,
    error: error,
});