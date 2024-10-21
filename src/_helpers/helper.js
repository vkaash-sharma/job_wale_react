import { createBrowserHistory } from "history";
import moment from "moment";

export const isLogin = () => {
  return !!localStorage.getItem("jwt_token");
};

export const auth_user = () => {
  const auth_user = JSON.parse(localStorage.getItem("auth_user"));
  return auth_user ? auth_user : false;
};

export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const IS_MOBILE = () => {
  const { pathname } = createBrowserHistory().location;
  return !!pathname.includes("mobile");
};
export const capitalizeName = (name = "") => {
  const arr = name?.split(" ");

  if (arr?.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const newName = arr.join(" ");
    return newName;
  } else return "";
};
export const validateEmailList = (raw) => {
  var emails = raw ? raw.split(",") : [];

  var valid = true;
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  for (var i = 0; i < emails.length; i++) {
    if (emails[i] === "" || !regex.test(emails[i].replace(/\s/g, ""))) {
      valid = false;
    }
  }
  return valid;
};
export const parseJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const fullName = (user) => {
  try {
    return <> {`${user?.firstName ? capitalizeName(user?.firstName) : ""} ${user?.lastName ? capitalizeName(user?.lastName) : ""}`}</>;
  } catch (error) {
    return null;
  }
};
export const DDMMYYYYFormat = (date) => {
  return date ? moment(date).format("DD-MM-YYYY") : moment().format("DD-MM-YYYY"); // true
};
export const DDMMMYYYYFormat = (date) => {
  return date ? moment(date).format("DDMMM YYYY") : moment().format("DDMMM YYYY"); // true
};
export const MonthYearFormat = (date) => {
  return moment(date, "YYYY-MM-DD").format("MMM YYYY");
};

export const YYYYMMDDHHMMSSFormat = (date) => {
  return moment(date).format("YYYY-MM-DD hh:mm:ss"); // true
};
export const IS_DEFAULT_PASSWORD = () => {
  return auth_user()?.isDefaultPassword;
};

export function getTimeDifference(date) {
  // Assuming that 'date' is provided in a specific format, update the format accordingly
  const dateMoment = moment(date, "DD/MM/YYYY HH:mm:ss");
  const now = moment();

  const differenceInSeconds = now.diff(dateMoment, "seconds");

  if (differenceInSeconds < 60) return `${Math.floor(differenceInSeconds)} seconds`;
  else if (differenceInSeconds < 3600) return `${Math.floor(differenceInSeconds / 60)} minutes`;
  else if (differenceInSeconds < 86400) return `${Math.floor(differenceInSeconds / 3600)} hours`;
  else if (differenceInSeconds < 86400 * 30) return `${Math.floor(differenceInSeconds / 86400)} days`;
  else if (differenceInSeconds < 86400 * 30 * 12) return `${Math.floor(differenceInSeconds / 86400 / 30)} months`;
  else return `${(differenceInSeconds / 86400 / 30 / 12).toFixed(1)} years`;
}

export const getSkillHelper = (skillKey, opportunity) => {
  const skillSet = opportunity?.opportunitySkill?.filter((value) => value?.type === skillKey)?.map((skill) => skill?.skill?.name);
  return skillSet;
};

/* GetOpportunity Commit Time */
export const getOpportunityCommitTime = (commit_time) => {
  if ([undefined, null, ""].includes(commit_time) || commit_time < 5) {
    return <span>&lt;5%</span>;
  } else {
    return <span>{commit_time}%</span>;
  }
};
