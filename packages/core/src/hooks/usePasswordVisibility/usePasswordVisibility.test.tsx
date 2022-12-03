import { act, renderHook } from "@testing-library/react";

import { usePasswordVisibility } from "./usePasswordVisibility";

describe("usePasswordVisibility", () => {
  const hook = usePasswordVisibility;

  it("should be defined", () => {
    expect(hook).toBeDefined();
  });

  it("should return a defined object", () => {
    const { result } = renderHook(() => hook());
    const { current } = result;

    expect(current).toHaveProperty("fieldType");

    expect(current).toHaveProperty("togglePasswordVisibility");

    expect(current).toHaveProperty("Icon");

    expect(current.fieldType).toBe("password");

    expect(current.Icon).toHaveProperty("props");

    expect(typeof current.togglePasswordVisibility).toBe("function");
  });

  it("should toggle field type on togglePasswordVisibility call", () => {
    const { result } = renderHook(() => hook());
    const { fieldType, togglePasswordVisibility, Icon } = result.current;

    expect(fieldType).toBe("password");

    act(() => {
      togglePasswordVisibility();
    });

    expect(result.current.fieldType).toBe("text");

    expect(result.current.Icon).not.toMatchObject(Icon);
  });
});
