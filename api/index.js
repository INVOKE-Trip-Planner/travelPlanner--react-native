import fetchApi from "./helper";

export const login = data => {
  return fetchApi("post", "api/login", data);
};



export const register = data => {
  return fetchApi("post", "api/register", data);
};


