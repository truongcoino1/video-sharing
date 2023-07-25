import { render, cleanup } from "@testing-library/react";
import HomePage from "../pages/HomePage";

const push = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: push,
  }),
  usePathname: () => "/",
}));

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

jest.mock("../../../modules/base/hooks/useSocket", () => {
  const useSocket = ()=>{
    return {
      subscribe: jest.fn(), 
      isConnected: true,
      unsubscribe: jest.fn()
    }
  }
  return {
    useSocket
  };
});

describe("HomePage", () => {
  afterEach(cleanup);

  it("HomePage should render without crash", () => {
    const result = render(<HomePage />);
    const elm = result.container.querySelector(".home-container");
    expect(elm).toBeInTheDocument();
  });

  it("should render correct HomePage", () => {
    const element = render(<HomePage />);
    expect(element).toMatchSnapshot();
  });
});
