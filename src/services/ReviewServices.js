import { RestMethod } from "_helpers/ApiConfig/RestMethod";

export const getReviews = async (data) => {
  let url = "/reviews/" + data;

  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getAllReviews = async (userType, todoType) => {
  let url = "/reviews/user?userType=" + userType + "&todoType=" + todoType;
  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

//post review
export const postTodo = async (data) => {
  let url = "/reviews/create";

  try {
    const response = await RestMethod.POST(url, data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const postTodoForCompleted = async (data) => {
  let url = "/reviews/user-review";

  try {
    const response = await RestMethod.POST(url, data);
    return response.data;
  } catch (error) {
    return null;
  }
};
