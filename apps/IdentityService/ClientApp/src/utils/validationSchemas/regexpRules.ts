const password = {
  upperCase: new RegExp("[A-Z]"),
  lowerCase: new RegExp("[a-z]"),
  number: new RegExp("[0-9]"),
  special: new RegExp("[#?!@$%^&*-]"),
};

export { password };
