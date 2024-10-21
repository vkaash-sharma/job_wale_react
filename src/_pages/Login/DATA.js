export let userInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const userRules = [
  {
    field_name: "firstName",
    label: "First Name",
    type: "string",
    minLength: 2,
    maxLength: 32,
    isRequired: true,
  },
  {
    field_name: "lastName",
    label: "Last Name",
    type: "string",
    minLength: 2,
    maxLength: 32,
    isRequired: true,
  },

  {
    field_name: "email",
    label: "Email",
    type: "email",
    isRequired: true,
  },
  {
    field_name: "password",
    label: "Password",
    type: "password",
    minLength: 8,
    isRequired: true,
  },
  {
    field_name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    minLength: 8,
    isRequired: true,
  },
];
