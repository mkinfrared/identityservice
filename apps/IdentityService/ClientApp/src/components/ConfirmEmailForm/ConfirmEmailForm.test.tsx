import { fireEvent, render, waitFor } from "@testing-library/react";

import * as mutations from "api/mutations";

import { ConfirmEmailForm } from "./ConfirmEmailForm";

jest.mock("api/mutations");

describe("<ConfirmEmailForm />", () => {
  const { sessionStorage, location } = window;
  const returnUrl = "https://foobar.com/";
  const Component = <ConfirmEmailForm returnUrl={returnUrl} />;
  const mutationsMock = mutations as jest.Mocked<typeof mutations>;

  beforeAll(() => {
    Object.defineProperty(window, "sessionStorage", {
      configurable: true,
      value: {
        ...sessionStorage,
        getItem: jest.fn(),
      },
    });

    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...location,
        assign: jest.fn(),
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "sessionStorage", {
      configurable: true,
      value: sessionStorage,
    });

    Object.defineProperty(window, "location", {
      configurable: true,
      value: location,
    });
  });

  it("should be defined", () => {
    expect(ConfirmEmailForm).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should disable submit button if code is empty", () => {
    const { container, getByTestId } = render(Component);
    const codeField = container.querySelector('input[name="code"]');
    const submitButton = getByTestId("Button");

    fireEvent.change(codeField!, { target: { value: "" } });

    expect(submitButton).toBeDisabled();
  });

  it("should call verifyEmailMutation on form submit and redirect to returnUrl if form is valid", async () => {
    const getItem = jest.spyOn(window.sessionStorage, "getItem");

    getItem.mockReturnValue("marklar");

    const { container, getByTestId } = render(Component);
    const codeField = container.querySelector('input[name="code"]');
    const submitButton = getByTestId("Button");
    const button = getByTestId("Button");

    expect(submitButton).toBeDisabled();

    fireEvent.click(button);

    fireEvent.change(codeField!, { target: { value: "424242" } });

    await waitFor(() => expect(submitButton).toBeEnabled());

    await fireEvent.submit(submitButton);

    await waitFor(() =>
      expect(mutationsMock.verifyEmailMutation).toHaveBeenCalled(),
    );
  });

  it("should throw an error if token or user ID are missing in session storage", async () => {
    const getItem = jest.spyOn(window.sessionStorage, "getItem");

    getItem.mockReturnValue(null);

    const { container, getByTestId } = render(Component);
    const codeField = container.querySelector('input[name="code"]');
    const submitButton = getByTestId("Button");
    const button = getByTestId("Button");

    expect(submitButton).toBeDisabled();

    fireEvent.click(button);

    fireEvent.change(codeField!, { target: { value: "424242" } });

    await waitFor(() => expect(submitButton).toBeEnabled());

    await fireEvent.submit(submitButton);

    await waitFor(() =>
      expect(mutationsMock.verifyEmailMutation).not.toHaveBeenCalled(),
    );

    expect(window.location.assign).not.toHaveBeenCalled();
  });
});
