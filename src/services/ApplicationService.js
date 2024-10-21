import { RestMethod } from "_helpers/ApiConfig/RestMethod";

export const getApplication = async () => {
  let url = "/opportunity/mng/appiled";

  // if (filter) url += '?' + filter;

  try {
    const response = await RestMethod.GET(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getApplicantById = async (id) => {
  let url = "/user-management/user/" + id;
  let endorsementUrl = "/user-management/endorsement/" + id;

  // if (filter) url += '?' + filter;
  try {
    const response = await RestMethod.GET(url);
    const response2 = await RestMethod.GET(endorsementUrl);
    response.data.endorsement = response2.data.data;
    return response?.data;
  } catch (error) {
    return null;
  }
};
