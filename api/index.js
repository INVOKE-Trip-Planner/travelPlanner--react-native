import fetchApi from "./helper";

export const login = data => {
  return fetchApi("post", "api/login", data);
};


export const register = data => {
  return fetchApi("post", "api/register", data);
};



// **************************TRIP***********************************************

export const getAll = headers => {
  return fetchApi("get", "api/trip", null, headers );
};


export const create = (data, headers) => { 
  return fetchApi("post", "api/trip", data, headers);

}

export const deleteTrip = (data, headers) => { 
  return fetchApi("post", "api/trip/delete", data, headers);

}



// ---------ACCOMMODATION---------------------------

export const getAllAcc = (headers) => {
  return fetchApi('get', "api/accommodation", null, headers)
};
export const createAcc = (data, headers) => {
  console.log(data);
  console.log(headers);
  return fetchApi('post', "api/accommodation", data, headers)
};
export const editAcc = (data, headers) => {
  return fetchApi('post', 'api/accommodation/update', data, headers)
};
export const deleteAcc = (data, headers) => {
  // console.log("data id:",data);
  return fetchApi('post', 'api/accommodation/delete', data, headers)
};

//-----------TRANSPORT----------------------------
export const getAllTrans = (headers) => {
  return fetchApi('get', "api/transport", null, headers)
};
export const createTrans = (data, headers) => {
  console.log(data);
  console.log(headers);
  return fetchApi('post', "api/transport", data, headers)
};
export const editTrans = (data, headers) => {
  return fetchApi('post', 'api/transport/update', data, headers)
};
export const deleteTrans = (data, headers) => {
  // console.log("data id:",data);
  return fetchApi('post', 'api/transport/delete', data, headers)
};

//-----------ITINERARY----------------------------
export const getAllItin = (headers) => {
  return fetchApi('get', "api/itinerary", null, headers)
};
export const createItin = (data, headers) => {
  console.log(data);
  console.log(headers);
  return fetchApi('post', "api/itinerary", data, headers)
};
export const editItin = (data, headers) => {
  return fetchApi('post', 'api/itinerary/update', data, headers)
};
export const deleteItin = (data, headers) => {
  // console.log("data id:",data);
  return fetchApi('post', 'api/itinerary/delete', data, headers)
};

//-----------DESTINATION----------------------------
export const getAllDes = (headers) => {
  return fetchApi('get', "api/destination", null, headers)
};
export const createDes = (data, headers) => {
  console.log(data);
  console.log(headers);
  return fetchApi('post', "api/destination", data, headers)
};
export const editDes = (data, headers) => {
  return fetchApi('post', 'api/destination/update', data, headers)
};
export const deleteDes = (data, headers) => {
  // console.log("data id:",data);
  return fetchApi('post', 'api/destination/delete', data, headers)
};




//-----------USER------------------------
export const updateUser = (data, token) => {
  return fetchApi('post', 'api/user', data, token);
}


export const searchUser = (query) => {
  return fetchApi('get', `api/user/search/${query}`, null, 
  { Authorization: `Bearer ${store.getState().PROFILE.userSession.data}` });
}
