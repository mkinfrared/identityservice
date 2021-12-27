type Key<T extends Record<string, any>> = keyof T extends string
  ? Uncapitalize<keyof T>
  : keyof T;
type Entry = [string, string[]];
type FormData<T extends Record<string, any>> = Record<keyof T, string[]>;

const getFormErrors = <T>(data: FormData<T>) => {
  const responseErrors = Object.entries(data).map((entry) => {
    const [key, value] = entry as Entry;

    return {
      type: "networkError",
      name: (key.charAt(0).toLowerCase() + key.slice(1)) as Key<T>,
      message: value[0],
    };
  });

  return responseErrors;
};

export { getFormErrors };
