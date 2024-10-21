export const initialForm = {
  opportunityName: "",
  description: "",
  skills: [],
  interests: [],
  recruitmentStartDate: "",
  recruitmentEndDate: "",
  projectStartDate: "",
  projectEndDate: "",
  location: [],
  engagementType: "Remote",
  emergency: "",
  commitTime: 0,
};

export const rules = [
  {
    field_name: "opportunityName",
    label: "Name",
    type: "string",
    maxLength: 64,

    isRequired: true,
  },
  {
    field_name: "description",
    label: "Description",
    type: "string",
    maxLength: 2024,
    minLength: 20,

    isRequired: true,
  },
  {
    field_name: "skills",
    label: "Skills",
    type: "string",
    isRequired: true,
  },
  {
    field_name: "interests",
    label: "Interests",
    type: "string",
    isRequired: true,
  },
  {
    field_name: "recruitmentStartDate",
    label: "Recruitment Start Date",
    isRequired: true,
  },
  {
    field_name: "recruitmentEndDate",
    label: "Recruitment End Date",
    isRequired: true,
  },
  {
    field_name: "projectStartDate",
    label: "Project Start Date",
    isRequired: true,
  },
  {
    field_name: "projectEndDate",
    label: "Project End Date",
    isRequired: true,
  },
  {
    field_name: "location",
    label: "Location",
    isRequired: true,
  },
];
