import { render } from "@testing-library/react";

import { Routes } from "pages/Main/Main.type";

import { Main } from "./Main";

jest.mock("components/ConfirmEmailForm");

jest.mock("components/LoginForm");

jest.mock("components/RegisterForm");

describe("<Main />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<Main path={Routes.LOGIN} />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot", () => {
    const { container } = render(<Main path={Routes.LOGIN} />);

    expect(container).toMatchSnapshot();
  });

  it("should render <LoginForm /> when path is 'login'", () => {
    const testId = "LoginForm";
    const { getByTestId } = render(<Main path={Routes.LOGIN} />);
    const element = getByTestId(testId);

    expect(element).toBeDefined();
  });

  it("should render <RegisterForm /> when path is 'register'", () => {
    const testId = "RegisterForm";
    const { getByTestId } = render(<Main path={Routes.REGISTER} />);
    const element = getByTestId(testId);

    expect(element).toBeDefined();
  });

  it("should render <ConfirmEmailForm /> when path is 'confirmEmail'", () => {
    const testId = "ConfirmEmailForm";
    const { getByTestId } = render(<Main path={Routes.CONFIRM_EMAIL} />);
    const element = getByTestId(testId);

    expect(element).toBeDefined();
  });
});
