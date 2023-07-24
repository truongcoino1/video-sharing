import { render, cleanup, fireEvent } from "@testing-library/react";
import { Loading } from "../components/Loading";

describe("Loading", () => {
  afterEach(cleanup);

  it("should render correct Loading", () => {
    const element = render(<Loading />);
    expect(element).toMatchSnapshot();
  });
});
