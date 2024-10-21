const { RestMethod } = require("_helpers/ApiConfig/RestMethod");

export const setApplicationStatus = async (id, status) => {
  let url = "/application/status-handle/";

  if (id) url +=  id;
  if (status) url += "?handleType=" + status;

  try {
    const response = await RestMethod.POST(url);
    return response.data;
  } catch (error) {
    return null;
  }
};
