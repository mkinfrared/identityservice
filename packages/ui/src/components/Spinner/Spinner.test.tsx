import { render } from "@testing-library/react";
import React from "react";

import { Spinner } from "./Spinner";

describe("<Spinner />", () => {
  const Component = <Spinner type="audio" />;

  it("should be defined", () => {
    expect(Spinner).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should return an audio loader", () => {
    const type = "audio";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/audio/)).toBeDefined();
  });

  it("should return a ball-triangle loader", () => {
    const type = "ball-triangle";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/ball-triangle/)).toBeDefined();
  });

  it("should return a bars loader", () => {
    const type = "bars";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/bars/)).toBeDefined();
  });

  it("should return a circles loader", () => {
    const type = "circles";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/circles/)).toBeDefined();
  });

  it("should return a circles loader", () => {
    const type = "circles";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/circles/)).toBeDefined();
  });

  it("should return a double-ring loader", () => {
    const type = "double-ring";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/double-ring/)).toBeDefined();
  });

  it("should return an eclipse loader", () => {
    const type = "eclipse";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/eclipse/)).toBeDefined();
  });

  it("should return a grid loader", () => {
    const type = "grid";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/grid/)).toBeDefined();
  });

  it("should return a hearts loader", () => {
    const type = "hearts";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/hearts/)).toBeDefined();
  });

  it("should return an infinity loader", () => {
    const type = "infinity";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/infinity/)).toBeDefined();
  });

  it("should return an oval loader", () => {
    const type = "oval";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/oval/)).toBeDefined();
  });

  it("should return a puff loader", () => {
    const type = "puff";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/puff/)).toBeDefined();
  });

  it("should return a rings loader", () => {
    const type = "rings";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/rings/)).toBeDefined();
  });

  it("should return a ripple loader", () => {
    const type = "ripple";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/ripple/)).toBeDefined();
  });

  it("should return a rolling loader", () => {
    const type = "rolling";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/rolling/)).toBeDefined();
  });

  it("should return a spinning-circles loader", () => {
    const type = "spinning-circles";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/spinning-circles/)).toBeDefined();
  });

  it("should return a tail-spin loader", () => {
    const type = "tail-spin";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/tail-spin/)).toBeDefined();
  });

  it("should return a three-dots loader", () => {
    const type = "three-dots";
    const { getByText } = render(<Spinner type={type} />);

    expect(getByText(/three-dots/)).toBeDefined();
  });

  it("should return a rolling loader by default", () => {
    const { getByText } = render(<Spinner />);

    expect(getByText(/rolling/)).toBeDefined();
  });
});
