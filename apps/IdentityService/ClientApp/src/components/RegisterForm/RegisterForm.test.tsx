import { fireEvent, render, waitFor } from "@testing-library/react";

import * as mutations from "api/mutations";

import { RegisterForm } from "./RegisterForm";

jest.mock("api/mutations");

jest.mock("components/AppLink");

describe("<RegisterForm />", () => {
  const { location } = window;
  const mutationsMock = mutations as jest.Mocked<typeof mutations>;
  const returnUrl = "https://marklar.com";
  const Component = <RegisterForm returnUrl={returnUrl} />;

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
    expect(RegisterForm).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should have a disabled button if fields are empty", () => {
    const { getByTestId } = render(Component);
    const submitButton = getByTestId("Button");

    expect(submitButton).toBeDisabled();
  });

  it("should have an enabled button if fields are filled and valid", async () => {
    const { getByTestId, container } = render(Component);
    const userNameField = container.querySelector('input[name="username"]');
    const firstNameField = container.querySelector('input[name="firstName"]');
    const lastNameField = container.querySelector('input[name="lastName"]');
    const emailField = container.querySelector('input[name="email"]');

    const phoneNumberField = container.querySelector(
      'input[name="phoneNumber"]',
    );

    const passwordField = container.querySelector('input[name="password"]');

    const passwordConfirmationField = container.querySelector(
      'input[name="passwordConfirmation"]',
    );

    const submitButton = getByTestId("Button");

    expect(submitButton).toBeDisabled();

    fireEvent.change(userNameField!, { target: { value: "foobar" } });

    fireEvent.change(firstNameField!, { target: { value: "foobar" } });

    fireEvent.change(lastNameField!, { target: { value: "foobar" } });

    fireEvent.change(emailField!, { target: { value: "foo@bar.com" } });

    fireEvent.change(phoneNumberField!, { target: { value: "foobar" } });

    fireEvent.change(passwordField!, { target: { value: "Marklar42$" } });

    fireEvent.change(passwordConfirmationField!, {
      target: { value: "Marklar42$" },
    });

    await waitFor(() => expect(submitButton).toBeEnabled());
  });

  it("should call registerMutation on submit", async () => {
    const userId = "00000000-0000-0000-0000-000000000000";
    const token = "fake-token";
    const registerResponse = { userId, token, code: null };
    const replaceState = jest.spyOn(window.history, "replaceState");

    mutationsMock.registerMutation.mockResolvedValueOnce(registerResponse);

    const data = {
      username: "marklar",
      firstName: "Timmy",
      lastName: "Burch",
      email: "timmy@coons.com",
      phoneNumber: "3334445566",
      password: "Marklar42$",
      passwordConfirmation: "Marklar42$",
      redirectUrl: returnUrl,
    };

    const { getByTestId, container } = render(Component);
    const userNameField = container.querySelector('input[name="username"]');
    const firstNameField = container.querySelector('input[name="firstName"]');
    const lastNameField = container.querySelector('input[name="lastName"]');
    const emailField = container.querySelector('input[name="email"]');

    const phoneNumberField = container.querySelector(
      'input[name="phoneNumber"]',
    );

    const passwordField = container.querySelector('input[name="password"]');

    const passwordConfirmationField = container.querySelector(
      'input[name="passwordConfirmation"]',
    );

    const submitButton = getByTestId("Button");

    fireEvent.change(userNameField!, { target: { value: data.username } });

    fireEvent.change(firstNameField!, { target: { value: data.firstName } });

    fireEvent.change(lastNameField!, { target: { value: data.lastName } });

    fireEvent.change(emailField!, { target: { value: data.email } });

    fireEvent.change(phoneNumberField!, {
      target: { value: data.phoneNumber },
    });

    fireEvent.change(passwordField!, { target: { value: data.password } });

    fireEvent.change(passwordConfirmationField!, {
      target: { value: data.passwordConfirmation },
    });

    await waitFor(() => expect(submitButton).toBeEnabled());

    await fireEvent.submit(submitButton);

    await waitFor(() =>
      expect(mutationsMock.registerMutation).toHaveBeenCalled(),
    );

    expect(mutationsMock.registerMutation).toHaveBeenCalledTimes(1);

    expect(mutationsMock.registerMutation).toHaveBeenCalledWith(data);

    expect(replaceState).toHaveBeenCalled();
  });

  it("should display an error on bad network request", async () => {
    const data = {
      username: "marklar",
      firstName: "Timmy",
      lastName: "Burch",
      email: "timmy@coons.com",
      phoneNumber: "3334445566",
      password: "Marklar42$",
      passwordConfirmation: "Marklar42$",
      redirectUrl: returnUrl,
    };

    const errorMessage = "Invalid login credentials";

    const axiosError = {
      isAxiosError: true,
      response: {
        data: {
          Username: ["Invalid login credentials"],
        },
        status: 400,
      },
    };

    mutationsMock.registerMutation.mockRejectedValueOnce(axiosError);

    const { getByTestId, container, getByText } = render(Component);
    const userNameField = container.querySelector('input[name="username"]');
    const firstNameField = container.querySelector('input[name="firstName"]');
    const lastNameField = container.querySelector('input[name="lastName"]');
    const emailField = container.querySelector('input[name="email"]');

    const phoneNumberField = container.querySelector(
      'input[name="phoneNumber"]',
    );

    const passwordField = container.querySelector('input[name="password"]');

    const passwordConfirmationField = container.querySelector(
      'input[name="passwordConfirmation"]',
    );

    const submitButton = getByTestId("Button");

    fireEvent.change(userNameField!, { target: { value: data.username } });

    fireEvent.change(firstNameField!, { target: { value: data.firstName } });

    fireEvent.change(lastNameField!, { target: { value: data.lastName } });

    fireEvent.change(emailField!, { target: { value: data.email } });

    fireEvent.change(phoneNumberField!, {
      target: { value: data.phoneNumber },
    });

    fireEvent.change(passwordField!, { target: { value: data.password } });

    fireEvent.change(passwordConfirmationField!, {
      target: { value: data.passwordConfirmation },
    });

    await waitFor(() => expect(submitButton).toBeEnabled());

    await fireEvent.submit(submitButton);

    await waitFor(() =>
      expect(mutationsMock.registerMutation).toHaveBeenCalled(),
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
