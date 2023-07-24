import { render, cleanup } from "@testing-library/react";
import Share from "../pages/SharePage";

const push = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: push,
  }),
  usePathname: () => "/",
}));

describe("SharePage", () => {
  afterEach(cleanup);

  it("share should render without crash", () => {
    const result = render(<Share />);
    const elm = result.container.querySelector(".share-container");
    expect(elm).toBeInTheDocument();
  });

  it("should render correct Share", () => {
    const element = render(<Share />);
    expect(element).toMatchSnapshot();
  });
});
