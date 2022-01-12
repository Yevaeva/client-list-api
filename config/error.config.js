module.exports = {
  defaultError: {
    name: "somethingWentWrong",
    message: "Something went wrong please try again later",
    status: 500,
  },
  userExists: {
    name: "UserExists",
    message: "User with email address already exists",
    status: 409,
  },

  pathExists: {
    name: "PathExists",
    message: "Path  already exists",
    status: 409,
  },

  pathIsRequired: {
    name: "PathIsRequired",
    message: "Path is required",
    status: 404,
  },

  providerNotFound: {
    name: "ProviderNotFound",
    message: "Provider is not found",
    status: 404,
  },
  emailValidationError: {
    name: "EmailValidationError",
    message: "Invalid email",
    status: 400,
  },
  emailDuplicationError: {
    name: "emailDuplicationError",
    message: "The email address is already registered",
    status: 400,
  },
  nothingToUpdate: {
    name: "NothingToUpdate",
    message: "no data send for update",
    status: 400,
  },

  notaNumber: {
    name: "NotaNumber",
    message: "Phone must be a number",
    status: 400,
  },

  clientNotFound: {
    name: "clientNotFound",
    message: "Client is not found",
    status: 404,
  },
  nothingToRemove: {
    name: "nothingToRemove",
    message: "There is nothing to remove",
    status: 404,
  },
};
