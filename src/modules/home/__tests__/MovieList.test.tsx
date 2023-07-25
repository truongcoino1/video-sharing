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
      off: jest.fn(),
    },
  };
});

const subscribe = jest.fn();
jest.mock("../../../modules/base/hooks/useSocket", () => {
  const useSocket = () => {
    return {
      subscribe: subscribe,
      isConnected: true,
      unsubscribe: jest.fn(),
    };
  };
  return {
    useSocket,
  };
});

jest.mock("../hooks/useMovies", () => {
  return {
    useMovies: jest.fn().mockReturnValue({
      movies: [],
      getMovies: jest.fn(),
      period: {
        page: 0,
        limited: false,
        pageSize: 20,
        refresh: false,
        loadMore: false,
      },
      setMovies: jest.fn(),
    }),
  };
});

describe("MovieList", () => {
  afterEach(cleanup);

  it("MovieList should render without crash", async () => {
    const result = render(<MovieList />);
    const elm = result.container.querySelector(".movie-list-container");
    expect(elm).toBeInTheDocument();
  });

  it("should render correct MovieList", () => {
    const element = render(<MovieList />);
    expect(element).toMatchSnapshot();
  });

  it("should subscribe when connected", () => {
    render(<MovieList />);
    expect(subscribe).toBeCalledWith("share-movie", expect.any(Function));
  });

  it("should load more when limited period is false", () => {
    const getMovies = jest.fn();
    const useMovies = jest.requireMock("../hooks/useMovies").useMovies;
    useMovies.mockReturnValue({
      movies: [{ id: 1 }],
      getMovies: getMovies,
      period: {
        page: 0,
        limited: false,
        pageSize: 20,
        refresh: false,
        loadMore: false,
      },
      setMovies: jest.fn(),
    });
    const result = render(<MovieList />);
    const elm = result.container.querySelector(".btn-loadmore-wrapper");
    expect(elm).toBeInTheDocument();
  });

  it("should not load more when limited period is true", () => {
    const getMovies = jest.fn();
    const useMovies = jest.requireMock("../hooks/useMovies").useMovies;
    useMovies.mockReturnValue({
      movies: [{ id: 1 }],
      getMovies: getMovies,
      period: {
        page: 0,
        limited: true,
        pageSize: 20,
        refresh: false,
        loadMore: false,
      },
      setMovies: jest.fn(),
    });
    const result = render(<MovieList />);
    const elm = result.container.querySelector(".btn-loadmore-wrapper");
    expect(elm).not.toBeInTheDocument();
  });

  it("should not load more when refresh period is true", () => {
    const getMovies = jest.fn();
    const useMovies = jest.requireMock("../hooks/useMovies").useMovies;
    useMovies.mockReturnValue({
      movies: [{ id: 1 }],
      getMovies: getMovies,
      period: {
        page: 0,
        limited: false,
        pageSize: 20,
        refresh: true,
        loadMore: false,
      },
      setMovies: jest.fn(),
    });
    const result = render(<MovieList />);
    const elm = result.container.querySelector(".btn-loadmore-wrapper");
    expect(elm).not.toBeInTheDocument();
  });

  it("should not load more when loadMore period is true", () => {
    const getMovies = jest.fn();
    const useMovies = jest.requireMock("../hooks/useMovies").useMovies;
    useMovies.mockReturnValue({
      movies: [{ id: 1 }],
      getMovies: getMovies,
      period: {
        page: 0,
        limited: false,
        pageSize: 20,
        refresh: false,
        loadMore: true,
      },
      setMovies: jest.fn(),
    });
    const result = render(<MovieList />);
    const elm = result.container.querySelector(".btn-loadmore-wrapper");
    expect(elm).not.toBeInTheDocument();
  });

  it("should not load more when movies length is 0", () => {
    const getMovies = jest.fn();
    const useMovies = jest.requireMock("../hooks/useMovies").useMovies;
    useMovies.mockReturnValue({
      movies: [],
      getMovies: getMovies,
      period: {
        page: 0,
        limited: false,
        pageSize: 20,
        refresh: false,
        loadMore: false,
      },
      setMovies: jest.fn(),
    });
    const result = render(<MovieList />);
    const elm = result.container.querySelector(".btn-loadmore-wrapper");
    expect(elm).not.toBeInTheDocument();
  });

  it("should has placeholder when refresh period is true and movies length is 0", () => {
    const getMovies = jest.fn();
    const useMovies = jest.requireMock("../hooks/useMovies").useMovies;
    useMovies.mockReturnValue({
      movies: [],
      getMovies: getMovies,
      period: {
        page: 0,
        limited: false,
        pageSize: 20,
        refresh: true,
        loadMore: false,
      },
      setMovies: jest.fn(),
    });
    const result = render(<MovieList />);
    const elm = result.container.querySelector(".movie-item-skeleton");
    expect(elm).toBeInTheDocument();
  });

  it("should click load more button", async () => {
    const getMovies = jest.fn();
    const useMovies = jest.requireMock("../hooks/useMovies").useMovies;
    useMovies.mockReturnValue({
      movies: [{ id: 1 }],
      getMovies: getMovies,
      period: {
        page: 0,
        limited: false,
        pageSize: 20,
        refresh: false,
        loadMore: false,
      },
      setMovies: jest.fn(),
    });
    const result = render(<MovieList />);
    const elm = result.container.querySelector(".btn-loadmore");
   await act(() => {
      elm?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(getMovies).toBeCalledWith({ loadMore: true });
  });
});
