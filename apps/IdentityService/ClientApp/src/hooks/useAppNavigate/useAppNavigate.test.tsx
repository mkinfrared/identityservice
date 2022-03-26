import { renderHook } from "@testing-library/react-hooks";

import { useAppNavigate } from "./useAppNavigate";

const locationMock = {
  search: "?foo=bar",
  hash: "#",
};

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useLocation: () => locationMock,
  useNavigate: () => mockNavigate,
}));

describe("useAppNavigate", () => {
  const hook = useAppNavigate;

  it("should should be defined", () => {
    expect(hook).toBeDefined();
  });

  it("should call 'mockNavigate'", () => {
    const pathname = "marklar";
    const { result } = renderHook(() => hook());

    result.current(pathname as any);

    expect(mockNavigate).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledTimes(1);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname,
      search: locationMock.search,
      hash: locationMock.hash,
    });
  });
});
