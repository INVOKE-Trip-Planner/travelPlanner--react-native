export const NAME = "TRIP"; //foldername

export const GET_ALL = `${NAME}/GET_ALL`;
export const GET_ALL_SUCCESS = `${NAME}/GET_ALL_SUCCESS`;
export const GET_ALL_FAIL = `${NAME}/GET_ALL_FAIL`;

export const getGetAllData = (store) =>  store[NAME].getAll;

export const getAll = data =>({
    type:GET_ALL,
    data:data
});


export const getAll_success = data =>({
    type:GET_ALL_SUCCESS,
    data:data
});

export const getAll_fail = error =>({
    type:GET_ALL_FAIL,
    error:error
});


