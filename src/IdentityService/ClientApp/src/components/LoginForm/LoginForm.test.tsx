import { fireEvent, render, waitFor } from "@testing-library/react";

import * as mutations from "api/mutations";

import { LoginForm } from "./LoginForm";

jest.mock("api/mutations");

describe("<LoginForm />", () => {
  const mutationsMock = mutations as jest.Mocked<typeof mutations>;
  const returnUrl = "?someUrl=Marklar";
  const Component = <LoginForm returnUrl={returnUrl} />;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(LoginForm).toBeDefined();
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
    const passwordField = container.querySelector('input[name="password"]');
    const submitButton = getByTestId("Button");

    expect(submitButton).toBeDisabled();

    fireEvent.change(userNameField!, { target: { value: "foobar" } });

    fireEvent.change(passwordField!, { target: { value: "marklar" } });

    await waitFor(() => expect(submitButton).toBeEnabled());
  });

  it("should call loginMutation on submit", async () => {
    mutationsMock.loginMutation.mockResolvedValueOnce("" as any);

    const data = {
      username: "marklar",
      password: "foobar",
      returnUrl,
    };

    const { getByTestId, container } = render(Component);
    const userNameField = container.querySelector('input[name="username"]');
    const passwordField = container.querySelector('input[name="password"]');
    const submitButton = getByTestId("Button");

    fireEvent.change(userNameField!, { target: { value: data.username } });

    fireEvent.change(passwordField!, { target: { value: data.password } });

    await waitFor(() => expect(submitButton).toBeEnabled());

    await fireEvent.submit(submitButton);

    await waitFor(() => expect(mutationsMock.loginMutation).toHaveBeenCalled());

    expect(mutationsMock.loginMutation).toHaveBeenCalledTimes(1);

    expect(mutationsMock.loginMutation).toHaveBeenCalledWith(data);
  });

  it("should display an error on bad network request", async () => {
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

    mutationsMock.loginMutation.mockRejectedValueOnce(axiosError);

    const { getByTestId, getByText, container } = render(Component);
    const userNameField = container.querySelector('input[name="username"]');
    const passwordField = container.querySelector('input[name="password"]');
    const submitButton = getByTestId("Button");

    fireEvent.change(userNameField!, { target: { value: "username" } });

    fireEvent.change(passwordField!, { target: { value: "password" } });

    await waitFor(() => expect(submitButton).toBeEnabled());

    await fireEvent.submit(submitButton);

    await waitFor(() => expect(mutationsMock.loginMutation).toHaveBeenCalled());

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it("should redirect to register page", () => {
    const replaceState = jest.spyOn(window.history, "replaceState");
    const url = "http://localhost/account/register";
    const { getByText } = render(Component);
    const link = getByText(/register/);

    fireEvent.click(link);

    expect(replaceState).toHaveBeenCalled();

    expect(replaceState).toHaveBeenCalledWith({}, "", url);
  });
});
