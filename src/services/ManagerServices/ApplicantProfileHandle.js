const { RestMethod } = require("_helpers/ApiConfig/RestMethod");

export const GetPostedOpportunities = async (id) => {
  let url = `/opportunity/post-opportunity/${id}`;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getAppliedOpportunities = async (id) => {
  let url = `/opportunity/applied-opportunity/${id}`;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};