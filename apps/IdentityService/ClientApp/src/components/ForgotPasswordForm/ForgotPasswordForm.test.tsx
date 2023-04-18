import { findByText, fireEvent, render, waitFor } from "@testing-library/react";

import * as mutations from "api/mutations";

import { ForgotPasswordForm } from "./ForgotPasswordForm";

jest.mock("api/mutations");

describe("<ForgotPasswordForm />", () => {
  const mutationsMock = mutations as jest.Mocked<typeof mutations>;
  const returnUrl = "/foo/bar";
  const Component = <ForgotPasswordForm returnUrl={returnUrl} />;

  it("should be defined", () => {
    expect(ForgotPasswordForm).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("ForgotPasswordForm");

    expect(element).toBeDefined();
  });

  it("should call submitForgotPassword on submit", async () => {
    mutationsMock.submitForgotPassword.mockResolvedValueOnce({});

    const data = {
      email: "timmy@coons.com",
      returnUrl,
    };

    const { getByTestId, container } = render(Component);
    const emailField = container.querySelector('input[name="email"]');
    const submitButton = getByTestId("Button");

    fireEvent.change(emailField!, { target: { value: data.email } });

    fireEvent.submit(submitButton);

    await waitFor(async () => {
      expect(mutationsMock.submitForgotPassword).toHaveBeenCalled();

      expect(mutationsMock.submitForgotPassword).toHaveBeenCalledTimes(1);

      expect(mutationsMock.submitForgotPassword).toHaveBeenCalledWith(data);

      const header = await findByText(container, /Check your email/i);

      expect(header).toBeVisible();
    });
  });

  it("should not call submitForgotPassword on submit when email is invalid", async () => {
    const data = {
      email: "timmy",
      returnUrl,
    };

    const { getByTestId, container } = render(Component);
    const emailField = container.querySelector('input[name="email"]');
    const submitButton = getByTestId("Button");

    fireEvent.change(emailField!, { target: { value: data.email } });

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(mutationsMock.submitForgotPassword).not.toHaveBeenCalled();
    });
  });

  it("should show an error if submit failed", async () => {
    const message = "maklar";

    const responseMock = {
      isAxiosError: true,
      response: { statusText: message },
    };

    mutationsMock.submitForgotPassword.mockRejectedValueOnce(responseMock);

    const data = {
      email: "timmy@coons.com",
      returnUrl,
    };

    const { getByTestId, container } = render(Component);
    const emailField = container.querySelector('input[name="email"]');
    const submitButton = getByTestId("Button");

    fireEvent.change(emailField!, { target: { value: data.email } });

    fireEvent.submit(submitButton);

    await waitFor(async () => {
      expect(mutationsMock.submitForgotPassword).toHaveBeenCalled();

      const error = await findByText(container, message);

      expect(error).toBeVisible();
    });
  });
});
