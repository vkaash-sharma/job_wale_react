const { RestMethod } = require("_helpers/ApiConfig/RestMethod");

export const GetActiveMngOpportunities = async (id) => {
  let url = "/opportunity/mng/active-list";

  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const GetCompletedMngOpportunities = async (id) => {
  let url = "/opportunity/mng/completed-list";

  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};
