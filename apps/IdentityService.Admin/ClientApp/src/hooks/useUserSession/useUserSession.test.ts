import { renderHook, waitFor } from "@testing-library/react";

import userManager from "utils/userManager";

import useUserSession from "./useUserSession";

jest.mock("utils/userManager");

describe("useUserSession", () => {
  const userManagerMock = userManager as jest.Mocked<typeof userManager>;
  const hook = useUserSession;

  it("should be defined", () => {
    expect(hook).toBeDefined();
  });

  it("should return user object", async () => {
    const user = { foo: "bar" } as any;

    userManagerMock.getUser.mockResolvedValueOnce(user);

    const { result } = renderHook(() => hook());

    await waitFor(() => {
      expect(result.current).toMatchObject(user);

      expect(userManagerMock.removeUser).not.toHaveBeenCalled();
    });
  });

  it("should call 'signinSilent' on userManager when initial value is falsy", async () => {
    const user = { foo: "bar" } as any;

    userManagerMock.getUser.mockResolvedValueOnce(null);

    userManagerMock.signinSilent.mockResolvedValueOnce(user);

    const { result } = renderHook(() => hook());

    await waitFor(() => {
      expect(result.current).toMatchObject(user);

      expect(userManagerMock.removeUser).not.toHaveBeenCalled();
    });
  });

  it("should call 'removeUser' on userManager and set user to null", async () => {
    userManagerMock.getUser.mockResolvedValueOnce(null);

    userManagerMock.signinSilent.mockRejectedValueOnce(
      new Error("login_required"),
    );

    const { result } = renderHook(() => hook());

    await waitFor(() => {
      expect(result.current).toBe(null);

      expect(userManagerMock.removeUser).toHaveBeenCalled();
    });
  });
});
