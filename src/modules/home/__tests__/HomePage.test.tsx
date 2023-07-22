import { render, cleanup } from "@testing-library/react";
import HomePage from "../pages/HomePage";

describe("SharePage", () => {
  afterEach(cleanup);

  it("share should render without crash", () => {
    const result = render(<HomePage />);
    const elm = result.container.querySelector(".home-container");
    expect(elm).toBeInTheDocument();
  });
});
