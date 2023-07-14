import { App } from "./App";

jest.mock("routes/AppRoutes");

jest.mock("@identity-service/ui");

describe("<App />", () => {
  it("should be defined", () => {
    expect(App).toBeDefined();
  });
});
