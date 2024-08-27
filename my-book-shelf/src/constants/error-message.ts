export const ERROR_MESSAGES = {
  RESPONSE_ERROR: "The server is not responding. Please try again!",
  GET_ERROR: "The server does not respond. Retrieving data failed!",
  POST_ERROR: "The server does not respond. Please try again!",
  DELETE_ERROR: "Delete failed. Please try again!",
  EDIT_ERROR: "Edit failed. Please try again!",
  SUBMIT_ERROR: "Submit failed. Please try again!",
  UPDATE_ERROR: "Update failed. Please try again!",
  CREATE_ERROR: "Create data failed. Please try again!",

  // Response Api
  NETWORK_ERROR: "Network response was not ok!",
  EMAIL_PASSWORD_INVALID: 'Email or password invalid.Please help to try again!',

  // Validation
  FIELD_REQUIRED: "This field is required.",

  // Dynamic error messages
  FORMAT: (ariaLabel: string) => `${ariaLabel} does not follow format.`,

  // ConfirmPassword
  CONFIRM_PASSWORD: "Passwords do not match!",
};
