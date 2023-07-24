import { render, cleanup } from "@testing-library/react";
import SkeletonShareBox from "../components/SkeletonShareBox";

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


describe("SkeletonShareBox", () => {
  afterEach(cleanup);

  it("share should render without crash", () => {
    const result = render(<SkeletonShareBox />);
    const elm = result.container.querySelector(".sharebox-container-skeleton");
    expect(elm).toBeInTheDocument();
  });

  it("should render correct SkeletonMovie", () => {
    const element = render(<SkeletonShareBox />);
    expect(element).toMatchSnapshot();
  });
});
