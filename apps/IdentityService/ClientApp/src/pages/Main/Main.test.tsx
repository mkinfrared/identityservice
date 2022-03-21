import { render, waitFor } from "@testing-library/react";

import { Routes } from "pages/Main/Main.type";
import { withQuery } from "utils/testUtils";

import { Main } from "./Main";

jest.mock("components/ConfirmEmailForm");

jest.mock("components/ForgotPasswordForm");

jest.mock("components/LoginForm");

jest.mock("components/RegisterForm");

jest.mock("components/PasswordResetForm");

describe("<Main />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<Main path={Routes.LOGIN} />);

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot", () => {
    const { container } = render(<Main path={Routes.LOGIN} />);

    expect(container).toMatchSnapshot();
  });

  it("should render <LoginForm /> when path is 'login'", async () => {
    const testId = "LoginForm";
    const { findByTestId } = render(<Main path={Routes.LOGIN} />);

    await waitFor(async () => {
      const element = await findByTestId(testId);

      expect(element).toBeDefined();
    });
  });

  it("should render <RegisterForm /> when path is 'register'", async () => {
    const testId = "RegisterForm";
    const { findByTestId } = render(<Main path={Routes.REGISTER} />);

    await waitFor(async () => {
      const element = await findByTestId(testId);

      expect(element).toBeDefined();
    });
  });

  it("should render <ConfirmEmailForm /> when path is 'confirmEmail'", async () => {
    const testId = "ConfirmEmailForm";
    const { findByTestId } = render(<Main path={Routes.CONFIRM_EMAIL} />);

    await waitFor(async () => {
      const element = await findByTestId(testId);

      expect(element).toBeDefined();
    });
  });

  it("should render <ConsentForm /> when path is 'consent'", async () => {
    const testId = "ConsentForm";

    const { findByTestId } = render(<Main path={Routes.CONSENT} />, {
      wrapper: withQuery,
    });

    await waitFor(async () => {
      const element = await findByTestId(testId);

      expect(element).toBeDefined();
    });
  });

  it("should render <ForgotPasswordForm /> when path is 'forgotPassword'", async () => {
    const testId = "ForgotPasswordForm";

    const { findByTestId } = render(<Main path={Routes.FORGOT_PASSWORD} />, {
      wrapper: withQuery,
    });

    await waitFor(async () => {
      const element = await findByTestId(testId);

      expect(element).toBeDefined();
    });
  });

  it("should render <PasswordResetForm /> when path is 'resetPassword'", async () => {
    const testId = "PasswordResetForm";

    const { findByTestId } = render(<Main path={Routes.PASSWORD_RESET} />, {
      wrapper: withQuery,
    });

    await waitFor(async () => {
      const element = await findByTestId(testId);

      expect(element).toBeDefined();
    });
  });

  it("should render <LoginForm /> as the default value", async () => {
    const testId = "LoginForm";
    const { findByTestId } = render(<Main path={"marklar" as any} />);

    await waitFor(async () => {
      const element = await findByTestId(testId);

      expect(element).toBeDefined();
    });
  });
});
