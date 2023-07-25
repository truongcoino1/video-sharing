import { render, cleanup } from "@testing-library/react";
import LoginPlaceholder from "../components/LoginPlaceholder";

describe("LoginPlaceholder", () => {
  afterEach(cleanup);

  it("LoginPlaceholder should render without crash", () => {
    const result = render(<LoginPlaceholder />);
    const elm = result.container.querySelector(".login-placeholder");
    expect(elm).toBeInTheDocument();
  });

  it("should render correct LoginPlaceholder", () => {
    const element = render(<LoginPlaceholder />);
    expect(element).toMatchSnapshot();
  });
});
