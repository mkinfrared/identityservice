const classNames = (
  ...args: (string | number | undefined | null | boolean)[]
) => args.filter((arg) => !!arg).join(" ");

export { classNames };
