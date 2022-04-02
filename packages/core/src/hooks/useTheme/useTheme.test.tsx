import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { useTheme } from "./useTheme";

describe("useTheme", () => {
  const { matchMedia } = window;
  const hook = useTheme;

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: jest.fn(),
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: matchMedia,
    });
  });

  it("should be defined", () => {
    expect(hook).toBeDefined();
  });

  it("should return an object with theme and toggleTheme", () => {
    const matchMediaMock = jest.spyOn(window, "matchMedia");

    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    } as any);

    const { result } = renderHook(() => hook("marklar"));

    expect(result.current.theme).toBeDefined();

    expect(result.current.toggleTheme).toBeDefined();
  });

  it("should toggle theme", () => {
    const matchMediaMock = jest.spyOn(window, "matchMedia");

    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    } as any);

    const { result } = renderHook(() => hook("marklar"));

    expect(result.current.theme).toBe("dark");

    waitFor(() => {
      result.current.toggleTheme();

      expect(result.current.theme).toBe("light");

      result.current.toggleTheme();

      expect(result.current.theme).toBe("light");
    });

    waitFor(() => {
      result.current.toggleTheme();

      expect(result.current.theme).toBe("dark");
    });
  });
});
