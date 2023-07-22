import { render, cleanup } from "@testing-library/react";
import MovieList from "../components/MovieList";
import { act } from "react-dom/test-utils";

describe("MovieList", () => {
  afterEach(cleanup);

  it("MovieList should render without crash",async () => {
    let result: any = null;
    await act(() => {
       result = render(<MovieList />);
    });
    const elm = result.container.querySelector(".movie-list-container");
    expect(elm).toBeInTheDocument();
  });
});
