export const NAME = "TRIP"; //foldername

export const CREATE = `${NAME}/CREATE`;
export const CREATE_SUCCESS = `${NAME}/CREATE_SUCCESS`;
export const CREATE_FAIL = `${NAME}/CREATE_FAIL`;

export const getCreateData = (store) =>  store[NAME].create;

export const create = data =>({
    type:CREATE,
    data:data
});


export const create_success = data =>({
    type:CREATE_SUCCESS,
    data:data
});

export const create_fail = error =>({
    type:CREATE_FAIL,
    error:error
});


