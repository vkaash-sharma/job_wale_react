import {RestMethod} from "../../_helpers/ApiConfig/RestMethod";
import {auth_user} from "_helpers/helper";
import toastr from 'toastr'

async function login(data) {
  try {
    const response = await RestMethod.POST("/user-management/login", data);
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api", error);
    return error?.response?.data || null;
  }
}
async function getUserByID(id) {
  try {
    const response = await RestMethod.GET("/users/" + id);
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api");
    return null;
  }
}

async function updateUser(id, data) {
  try {
    const response = await RestMethod.PUT(
      "/user-management/update-user/" + id,
      data
    );
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api");
    return null;
  }
}
const loggedUser = async () => {
  let url = "/user-management/self/user";
  let endorsementUrl = "/user-management/endorsement/" + auth_user().id;

  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.GET(url);
    const response2 = await RestMethod.GET(endorsementUrl);
    response.data.endorsement = response2.data.data;
    return response?.data;
  } catch (error) {
    console.log("error detected while fetching data from api", error);
    return null;
  }
};

const updateLoggedUser = async (data) => {
  let url = "/user-management/self/user";

  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.PUT(url, data);
    return response.data;
  } catch (error) {
    console.error("error detected while fetching data from api", error);
    return null;
  }
};
const userImage = async (data) => {
  let url = "/upload/image";
  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.PUT(url, data);
    console.log("File Image Response", response);
    return response.data;
  } catch (error) {
    if (error?.response?.status === 413) {
      return error?.response?.data;
    } else {
      console.log("Error while uploading image", error);
      return null;
    }
  }
};

const createUser = async (data) => {
  try {
    const response = await RestMethod.POST("/user-management/create", data);
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api");
    return null;
  }
};

const createUserCompleteDetails = async (data) => {
  try {
    const response = await RestMethod.POST(
      "user-management/complete-profile",
      data
    );
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api");
    return null;
  }
};

const forgotPasswordLink = async (data) => {
  try {
    const response = await RestMethod.POST(
      "/auth/forgot-password/request",
      data
    );
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api");
    return null;
  }
};

const resetPassword = async (id, data) => {
  try {
    const response = await RestMethod.POST(
      "/auth/forgot-password/save/" + id,
      data
    );
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api");
    return null;
  }
};

const verifyAccount = async (id, data) => {
  try {
    const response = await RestMethod.POST("/auth/account-verify/" + id, data);
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api");
    return null;
  }
};
const changePassword = async (data) => {
  try {
    const response = await RestMethod.PUT(
      "/user-management/change-password",
      data
    );
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api");
    return null;
  }
};
async function skipById(id) {
  try {
    const response = await RestMethod.GET(
      "/user-management/skip-profile/" + id
    );
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api");
    return null;
  }
}

export const UserService = {
  login,
  getUserByID,
  updateUser,
  loggedUser,
  updateLoggedUser,
  userImage,
  createUser,
  skipById,
  createUserCompleteDetails,
  changePassword,
  forgotPasswordLink,
  resetPassword,
  verifyAccount,
};
