import { render, cleanup } from "@testing-library/react";
import SkeletonMovie from "../components/SkeletonMovie";

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


describe("SkeletonMovie", () => {
  afterEach(cleanup);

  it("share should render without crash", () => {
    const result = render(<SkeletonMovie />);
    const elm = result.container.querySelector(".movie-item-skeleton");
    expect(elm).toBeInTheDocument();
  });

  it("should render correct SkeletonMovie", () => {
    const element = render(<SkeletonMovie />);
    expect(element).toMatchSnapshot();
  });
});
