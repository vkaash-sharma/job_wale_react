import { RestMethod } from "_helpers/ApiConfig/RestMethod";

export const getAllTodos = async (userType) => {
  let url = `/reviews/todo?userType=${userType}`;

  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

//get todo by id
export const getTodoById = async (id) => {
  let url = `/reviews/getTodo/${id}`;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
}
