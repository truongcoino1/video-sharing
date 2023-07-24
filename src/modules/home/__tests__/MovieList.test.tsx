import { render, cleanup } from "@testing-library/react";
import MovieList from "../components/MovieList";
import { act } from "react-dom/test-utils";

jest.mock("../../../modules/base/services/websocket", () => {
  return {
    socket: {
      on: jest.fn(),
      emit: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn(),
      off: jest.fn()
    }
  }
});

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

  it("should render correct MovieList", () => {
    const element = render(<MovieList />);
    expect(element).toMatchSnapshot();
  });
});
