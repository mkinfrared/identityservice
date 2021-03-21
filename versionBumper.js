const fs = require("fs");

const regex = /(?<=<Version>).*(?=<\/)/gi;

const getVersion = (contents) => {};

module.exports.readVersion = (contents) => {
  try {
    const [version] = contents?.match(regex);

    return version;
  } catch (e) {
    console.error(e);
  }
};

module.exports.writeVersion = (contents, version) => {
  const bumpedProject = contents.replace(regex, version);

  return bumpedProject;
};
