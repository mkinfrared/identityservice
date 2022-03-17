import { fireEvent, render, waitFor } from "@testing-library/react";

import * as mutations from "api/mutations";
import { withQuery } from "utils/testUtils";

import { ConsentForm } from "./ConsentForm";

jest.mock("api/mutations");

describe("<ConsentForm />", () => {
  const mutationsMock = mutations as jest.Mocked<typeof mutations>;
  const returnUrl = "/marklar";
  const allowRememberConsent = true;
  const clientName = "marklar";

  const defaultValues = {
    rememberConsent: false,
    apiScopes: [
      {
        name: "OrdersApi",
        displayName: "OrdersApi",
        description: "",
        emphasize: false,
        required: false,
        isPermitted: false,
      },
    ],
    identityScopes: [
      {
        name: "openid",
        displayName: "Your user identifier",
        description: "",
        emphasize: false,
        required: true,
        isPermitted: true,
      },
      {
        name: "profile",
        displayName: "User profile",
        description:
          "Your user profile information (first name, last name, etc.)",
        emphasize: true,
        required: false,
        isPermitted: false,
      },
    ],
    description: "",
    permissionGranted: true,
    redirectUrl: "/foo/bar",
  };

  const Component = (
    <ConsentForm
      returnUrl={returnUrl}
      defaultValues={defaultValues}
      allowRememberConsent={allowRememberConsent}
      clientName={clientName}
    />
  );

  it("should be defined", () => {
    expect(ConsentForm).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component, { wrapper: withQuery });

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component, { wrapper: withQuery });
    const element = getByTestId("ConsentForm");

    expect(element).toBeDefined();
  });

  it("should call 'submitConsent' with 'permissionGranted' set to true", async () => {
    const data = {
      ...defaultValues,
      permissionGranted: true,
    };

    mutationsMock.submitConsent.mockResolvedValueOnce("marklar");

    const { queryByText } = render(Component, {
      wrapper: withQuery,
    });

    const allowButton = queryByText("Allow");

    fireEvent.click(allowButton!);

    await waitFor(() => {
      expect(mutationsMock.submitConsent).toHaveBeenCalled();

      expect(mutationsMock.submitConsent).toHaveBeenCalledTimes(1);

      expect(mutationsMock.submitConsent).toHaveBeenCalledWith(data);
    });
  });

  it("should call 'submitConsent' with 'permissionGranted' set to false", async () => {
    const data = {
      ...defaultValues,
      permissionGranted: true,
    };

    mutationsMock.submitConsent.mockResolvedValueOnce("marklar");

    const { queryByText } = render(Component, {
      wrapper: withQuery,
    });

    const allowButton = queryByText("Allow");

    fireEvent.click(allowButton!);

    await waitFor(() => {
      expect(mutationsMock.submitConsent).toHaveBeenCalled();

      expect(mutationsMock.submitConsent).toHaveBeenCalledTimes(1);

      expect(mutationsMock.submitConsent).toHaveBeenCalledWith(data);
    });
  });
});
