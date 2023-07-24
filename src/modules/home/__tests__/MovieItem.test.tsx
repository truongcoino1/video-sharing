/**
 * @jest-environment jsdom
 */
import { render, cleanup } from "@testing-library/react";
import MovieItem from "../components/MovieItem";
import { Movie } from "../types";
import { act } from "react-dom/test-utils";

const movie: Movie = {
  id: "123",
  title: "title",
  description: "description",
  thumbnail: "https://i.ytimg.com/vi/bP9gMpl1gyQ/sddefault.jpg",
  shared_by: "shared_by",
  youtube_id: 'dsdss'
};

describe("MovieItem", () => {
  afterEach(cleanup);

  it("MovieItem should render without crash", () => {
    const result = render(<MovieItem movie={movie} />);
    const elm = result.container.querySelector(".movie-item");
    expect(elm).toBeInTheDocument();
  });

  it("MovieItem should render iframe when click on placeholder", () => {
    const result = render(<MovieItem movie={movie} />);
    const placeholder = result.container.querySelector(
      ".video-placeholder"
    ) as HTMLElement;
    act(() => {
      placeholder?.click();
    });
    const iframe = result.container.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
  });

  it("MovieItem should render title with link", () => {
    const result = render(<MovieItem movie={movie} />);
    const title = result.container.querySelector(
      ".title-link"
    ) as HTMLElement;
    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe(movie.title);
    expect(title.getAttribute("href")).toBe(
      `https://www.youtube.com/watch?v=${movie.id}`
    );
  });

  it("MovieItem should render description", () => {
    const result = render(<MovieItem movie={movie} />);
    const description = result.container.querySelector(
      ".video-description"
    ) as HTMLElement;
    expect(description).toBeInTheDocument();
    expect(description.innerHTML).toBe(movie.description);
  });

  it("MovieItem should render shared_by", () => {
    const result = render(<MovieItem movie={movie} />);
    const sharedBy = result.container.querySelector(
      ".shared-by"
    ) as HTMLElement;
    expect(sharedBy).toBeInTheDocument();
    expect(sharedBy.innerHTML).toBe(`<span class=\"font-semibold text-16 text-light-high\">Shared by:</span> ${movie.shared_by}`);
  });

  it("should render correct MovieItem", () => {
    const element = render(<MovieItem movie={movie} />);
    expect(element).toMatchSnapshot();
  });
});
