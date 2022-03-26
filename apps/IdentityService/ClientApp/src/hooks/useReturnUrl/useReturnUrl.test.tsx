import { renderHook } from "@testing-library/react-hooks";

import { useReturnUrl } from "./useReturnUrl";

const mockUseSearchParams = jest.fn();

jest.mock("react-router-dom", () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

describe("useReturnUrl", () => {
  const hook = useReturnUrl;

  it("should be defined", () => {
    expect(hook).toBeDefined();
  });

  it("should return 'returnUrl' from query string", () => {
    const param = "marklar";
    const params = new URLSearchParams(`?returnUrl=${param}`);

    mockUseSearchParams.mockReturnValueOnce([params]);

    const { result } = renderHook(() => hook());

    expect(result.current).toBe(param);
  });

  it("should return 'ReturnUrl' from query string", () => {
    const param = "marklar";
    const params = new URLSearchParams(`?ReturnUrl=${param}`);

    mockUseSearchParams.mockReturnValueOnce([params]);

    const { result } = renderHook(() => hook());

    expect(result.current).toBe(param);
  });

  it("should return an empty string by default'", () => {
    const param = "marklar";
    const params = new URLSearchParams(`?reTurnUrl=${param}`);

    mockUseSearchParams.mockReturnValueOnce([params]);

    const { result } = renderHook(() => hook());

    expect(result.current).toBe("");
  });
});
