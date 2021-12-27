import { getFormErrors } from "./getFormErrors";

describe("getFormErrors", () => {
  it("should be defined", () => {
    expect(getFormErrors).toBeDefined();
  });

  it("should return a correct array of objects", () => {
    const errors = {
      Username: [
        "Username is empty",
        "Username is too short",
        "Username contains invalid characters",
      ],
      Password: [
        "Password is too short",
        "Password must contain a special character",
        "Password must include a capital letter",
      ],
      Foo: ["Foo"],
      Bar: ["Bar"],
      ReturnUrl: ["Return Url is empty"],
      fooBar: ["fooBar"],
    };

    const result = getFormErrors(errors);

    expect(result).toHaveLength(6);

    expect(result[0]).toMatchObject({
      name: "username",
      type: "networkError",
      message: errors.Username[0],
    });

    expect(result[1]).toMatchObject({
      name: "password",
      type: "networkError",
      message: errors.Password[0],
    });

    expect(result[2]).toMatchObject({
      name: "foo",
      type: "networkError",
      message: errors.Foo[0],
    });

    expect(result[3]).toMatchObject({
      name: "bar",
      type: "networkError",
      message: errors.Bar[0],
    });

    expect(result[4]).toMatchObject({
      name: "returnUrl",
      type: "networkError",
      message: errors.ReturnUrl[0],
    });

    expect(result[5]).toMatchObject({
      name: "fooBar",
      type: "networkError",
      message: errors.fooBar[0],
    });
  });
});
