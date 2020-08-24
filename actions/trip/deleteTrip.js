export const NAME = "TRIP"; //foldername

export const DELETE_TRIP = `${NAME}/DELETE_TRIP`;
export const DELETE_TRIP_SUCCESS = `${NAME}/DELETE_TRIP_SUCCESS`;
export const DELETE_TRIP_FAIL = `${NAME}/DELETE_TRIP_FAIL`;

export const getDeleteTripData = (store) =>  store[NAME].deleteTrip;

export const deleteTrip = data =>({
    type:DELETE_TRIP,
    data:data
});


export const deleteTrip_success = data =>({
    type:DELETE_TRIP_SUCCESS,
    data:data
});

export const deleteTrip_fail = error =>({
    type:DELETE_TRIP_FAIL,
    error:error
});


