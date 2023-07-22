import { render, cleanup } from "@testing-library/react";
import VideoPlaceholder from "../components/VideoPlaceholder";

describe("VideoPlaceholder", () => {
  afterEach(cleanup);

  it("VideoPlaceholder should render without crash", () => {
    const result = render(
      <VideoPlaceholder
        thumbnail={"https://i.ytimg.com/vi/r3ARBhMk_g4/sddefault.jpg"}
        handleClick={() => {}}
      />
    );
    const elm = result.container.querySelector(".video-placeholder");
    expect(elm).toBeInTheDocument();
  });

  it("VideoPlaceholder should render with correct thumbnail", () => {
    const result = render(
      <VideoPlaceholder
        thumbnail={"https://i.ytimg.com/vi/r3ARBhMk_g4/sddefault.jpg"}
        handleClick={() => {}}
      />
    );
    const elm = result.container.querySelector("img");
    expect(elm).toHaveAttribute(
      "src",
      "https://i.ytimg.com/vi/r3ARBhMk_g4/sddefault.jpg"
    );
  });
});
