import { RestMethod } from "_helpers/ApiConfig/RestMethod";

export const getSkills = async (id) => {
  let url = "/public-list/skill";

  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getInterest = async (id) => {
  let url = "/public-list/interest";

  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getLocation = async (id) => {
  let url = "/public-list/location";

  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};
