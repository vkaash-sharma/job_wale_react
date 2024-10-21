const Api_url = process.env.REACT_APP_API_URL || "http://localhost:3009/";
export const URL_CONFIG = {
  DEV_URL: Api_url,
  IMG_URL: Api_url + "public/upload",
  AWS_COGNITO_LOGIN_URL: process.env.REACT_APP_AWS_COGNITO_LOGIN_URL,
};
