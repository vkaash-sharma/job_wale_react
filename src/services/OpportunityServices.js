const { RestMethod } = require("_helpers/ApiConfig/RestMethod");

export const createOpportunity = async (data) => {
  try {
    const response = await RestMethod.POST("/opportunity/mng/create", data);
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api", error);
    return null;
  }
};

export const opportunitiesById = async (id, filter) => {
  let url = "/opportunity/details/" + id;

  if (filter) url += "?" + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const completedTeamsById = async (id, filter) => {
  let url = "/opportunity/team-completed/" + id;

  if (filter) url += "?" + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const activeTeamsById = async (id, filter) => {
  let url = "/opportunity/team-active/" + id;

  if (filter) url += "?" + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

// Function to get more opportunities
export const getMoreOpportunities = async (url) => {
  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};
// Function to get recommended opportunities
export const getRecommendedOpportunities = async (filter) => {
  let url = "/opportunity/recommended";

  // if (filter) url += "?" + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const allAppliedOpportunity = async (filter) => {
  let url = "/opportunity/applied-list";
  if (filter) url += "?" + filter;
  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const applyOpportunity = async (data) => {
  let url = "/opportunity/apply";
  // if (filter) url += '?' + filter;
  try {
    const response = await RestMethod.POST(url, data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const deleteActiveOpportunity = async (id) => {
  let url = "/opportunity/mng/delete/" + id;

  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.DELETE(url);
    return response.data;
  } catch (error) {
    console.log("error detected while fetching data from api", error);
    return null;
  }
};
