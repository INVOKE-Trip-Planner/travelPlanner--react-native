import fetchApi from "./helper";

export const login = data => {
  return fetchApi("post", "api/login", data);
};



export const register = data => {
  return fetchApi("post", "api/register", data);
};

export const getAll = headers => {
  return fetchApi("get", "api/trip", null, headers );
};

