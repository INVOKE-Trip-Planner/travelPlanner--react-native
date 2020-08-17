export const NAME = "AUTH"; //foldername

export const REGISTER = `${NAME}/REGISTER`;
export const REGISTER_SUCCESS = `${NAME}/REGISTER_SUCCESS`;
export const REGISTER_FAIL = `${NAME}/REGISTER_FAIL`;
export const getRegisterData = (store) =>  store[NAME].register;



export const register = data =>({
    type:REGISTER,
    data:data
});


export const register_success = data =>({
    type:REGISTER_SUCCESS,
    data:data
});

export const register_fail = error =>({
    type:REGISTER_SUCCESS,
    error:error
});


