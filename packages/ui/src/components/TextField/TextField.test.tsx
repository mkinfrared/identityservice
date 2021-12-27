import { render } from "@testing-library/react";
import React from "react";

import { TextField } from "./TextField";

describe("<TextField />", () => {
  const Component = <TextField />;

  it("should be defined", () => {
    expect(TextField).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should not have Heading when label is not defined", () => {
    const { queryByTestId } = render(Component);
    const heading = queryByTestId("Heading");

    expect(heading).not.toBeInTheDocument();
  });

  it("should have Heading when label is a truthy string", () => {
    const label = "Marklar";
    const { queryByTestId } = render(<TextField label={label} />);
    const heading = queryByTestId("Heading");

    expect(heading).toBeInTheDocument();

    expect(heading).toHaveTextContent(label);
  });

  it("should have a hasError class name when error is a truthy string", () => {
    const error = "Marklar";
    const { getByTestId } = render(<TextField error={error} />);
    const textField = getByTestId("TextField");

    expect(textField.classList).toContain("hasError");
  });

  it("should have a hasPrefix class name when prefix is defined", () => {
    const testId = "prefix";
    const prefix = <div data-testid={testId}>Marklar</div>;

    const { getByTestId, queryByTestId } = render(
      <TextField prefix={prefix} />,
    );

    const textField = getByTestId("TextField");
    const prefixElement = queryByTestId(testId);

    expect(textField.classList).toContain("hasPrefix");

    expect(prefixElement).toBeInTheDocument();
  });

  it("should have a hasSuffix class name when suffix is defined", () => {
    const testId = "suffix";
    const suffix = <div data-testid={testId}>Marklar</div>;

    const { getByTestId, queryByTestId } = render(
      <TextField suffix={suffix} />,
    );

    const textField = getByTestId("TextField");
    const prefixElement = queryByTestId(testId);

    expect(textField.classList).toContain("hasSuffix");

    expect(prefixElement).toBeInTheDocument();
  });
});
