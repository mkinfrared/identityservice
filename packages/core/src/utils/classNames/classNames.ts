/**
 * Filters out falsy values and generates a string of concatenated
 * class names
 * @param {(string | number | undefined | null | boolean)[]} args
 * @returns {string} - a string of concatenated classes separated by a space
 * @example
 * // returns "foo bar"
 * classNames(false, "foo", undefined, "bar");
 */
const classNames = (
  ...args: (string | number | undefined | null | boolean)[]
) => args.filter((arg) => !!arg).join(" ");

export { classNames };
