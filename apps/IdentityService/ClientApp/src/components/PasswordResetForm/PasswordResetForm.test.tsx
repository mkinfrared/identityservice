import { fireEvent, render, waitFor } from "@testing-library/react";

import * as mutations from "api/mutations";
import { MainRoutes } from "routes/MainRoute";
import { withRouter } from "utils/testUtils";

import { PasswordResetForm } from "./PasswordResetForm";

const mockAppNavigate = jest.fn();

jest.mock("api/mutations");

jest.mock("hooks", () => ({
  useAppNavigate: () => mockAppNavigate,
}));

describe("<PasswordResetForm />", () => {
  const { location } = window;
  const mutationsMock = mutations as jest.Mocked<typeof mutations>;
  const token = "marklar";
  const userId = "foobar";
  const Component = <PasswordResetForm token={token} userId={userId} />;

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...location,
        replace: jest.fn(),
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: location,
    });
  });

  it("should be defined", () => {
    expect(PasswordResetForm).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component, { wrapper: withRouter });

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component, { wrapper: withRouter });
    const element = getByTestId("PasswordResetForm");

    expect(element).toBeDefined();
  });

  it("should have a disabled button if fields are empty", () => {
    const { getByTestId } = render(Component, { wrapper: withRouter });
    const submitButton = getByTestId("Button");

    expect(submitButton).toBeDisabled();
  });

  it("should have a disabled button if fields are invalid", async () => {
    const { getByTestId, container } = render(Component, {
      wrapper: withRouter,
    });

    const passwordValue = "marklar";
    const passwordField = container.querySelector('input[name="password"]');

    const confirmPasswordField = container.querySelector(
      'input[name="confirmPassword"]',
    );

    const submitButton = getByTestId("Button");

    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordField!, { target: { value: passwordValue } });

    fireEvent.change(confirmPasswordField!, {
      target: { value: passwordValue },
    });

    await waitFor(() => expect(submitButton).toBeDisabled());
  });

  it("should have an enabled button if fields are filled and valid", async () => {
    const { getByTestId, container } = render(Component, {
      wrapper: withRouter,
    });

    const passwordValue = "Marklar42$";
    const passwordField = container.querySelector('input[name="password"]');

    const confirmPasswordField = container.querySelector(
      'input[name="confirmPassword"]',
    );

    const submitButton = getByTestId("Button");

    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordField!, { target: { value: passwordValue } });

    fireEvent.change(confirmPasswordField!, {
      target: { value: passwordValue },
    });

    await waitFor(() => expect(submitButton).toBeEnabled());
  });

  it("should set confirmPassword value to the value of password field", async () => {
    const { getAllByTestId, container } = render(Component, {
      wrapper: withRouter,
    });

    const passwordValue = "Marklar42$";

    const passwordField = container.querySelector(
      'input[name="password"]',
    ) as HTMLInputElement;

    const confirmPasswordField = container.querySelector(
      'input[name="confirmPassword"]',
    ) as HTMLInputElement;

    const [visbilityToggler] = getAllByTestId("FakeButton");

    fireEvent.click(visbilityToggler);

    fireEvent.change(passwordField!, { target: { value: passwordValue } });

    await waitFor(() =>
      expect(confirmPasswordField.value).toBe(passwordField.value),
    );
  });

  it("should call submitPasswordChange on apiMock and call mockAppNavigate", async () => {
    mutationsMock.submitPasswordChange.mockResolvedValueOnce({});

    const { getByTestId, container } = render(Component, {
      wrapper: withRouter,
    });

    const passwordValue = "Marklar42$";
    const passwordField = container.querySelector('input[name="password"]');

    const confirmPasswordField = container.querySelector(
      'input[name="confirmPassword"]',
    );

    const submitButton = getByTestId("Button");

    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordField!, { target: { value: passwordValue } });

    fireEvent.change(confirmPasswordField!, {
      target: { value: passwordValue },
    });

    await waitFor(() => expect(submitButton).toBeEnabled());

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mutationsMock.submitPasswordChange).toHaveBeenCalled();

      expect(mockAppNavigate).toHaveBeenCalled();

      expect(mockAppNavigate).toHaveBeenCalledWith(MainRoutes.LOGIN);
    });
  });
});
