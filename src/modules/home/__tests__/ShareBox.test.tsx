import { render, cleanup } from "@testing-library/react";
import ShareBox from "../components/ShareBox";
import {flushPromises} from '@/modules/base';
import { AuthContext } from "@/modules/auth";
//@ts-ignore
global.setImmediate = jest.useRealTimers;

const setUpLogin = () => {
  return render(
    <AuthContext.Provider
      value={{
        currentUser: {
          email: "truongvk",
          token: "123",
          id: 1,
          password: "123",
          refreshToken: "123",
        },
        setLoading: jest.fn(),
        setCurrentUser: jest.fn(),
        loading: false,
      }}
    >
      <ShareBox />
    </AuthContext.Provider>
  );
};

const setUpLoginLoading = () => {
  return render(
    <AuthContext.Provider
      value={{
        currentUser: {
          email: "truongvk",
          token: "123",
          id: 1,
          password: "123",
          refreshToken: "123",
        },
        setLoading: jest.fn(),
        setCurrentUser: jest.fn(),
        loading: true,
      }}
    >
      <ShareBox />
    </AuthContext.Provider>
  );
};

const shareMovie = jest.fn();
jest.mock("../hooks/useMovies", () => {
  const useMovies = () => {
    return {
      shareMovie: shareMovie,
    };
  };
  return {
    useMovies,
  };
});

describe("ShareBox", () => {
  afterEach(cleanup);
  it("ShareBox should render without crash", () => {
    const result = setUpLogin();
    const elm = result.container.querySelector(".sharebox-container");
    expect(elm).toBeInTheDocument();
  });

  it("ShareBox should render form", () => {
    const result = setUpLogin();
    const elm = result.container.querySelector(".sharebox-form");
    expect(elm).toBeInTheDocument();
  });

  it("ShareBox should render title", () => {
    const result = setUpLogin();
    const elm = result.container.querySelector(".sharebox-title");
    expect(elm).toBeInTheDocument();
    expect(elm?.innerHTML).toBe("Share a Youtube movie");
  });

  it("ShareBox should render url input", () => {
    const result = setUpLogin();
    const elm = result.container.querySelector(".sharebox-url");
    expect(elm).toBeInTheDocument();
    expect(elm?.querySelector("label")?.innerHTML).toBe("Youtube URL:");
    expect(elm?.querySelector("input")?.getAttribute("name")).toBe("url");
    expect(elm?.querySelector("input")?.getAttribute("type")).toBe("text");
  });

  it("ShareBox should render submit button", () => {
    const result = setUpLogin();
    const elm = result.container.querySelector(".sharebox-submit");
    expect(elm).toBeInTheDocument();
    expect(elm?.querySelector("button")?.getAttribute("name")).toBe("submit");
    expect(elm?.querySelector("button")?.getAttribute("type")).toBe("submit");
    expect(elm?.querySelector("button")?.innerHTML).toBe("Share");
  });

  it("ShareBox should disable submit button when url is empty", () => {
    const result = setUpLogin();
    const elm = result.container.querySelector(".sharebox-submit");
    expect(elm?.querySelector("button")?.getAttribute("disabled")).toBe("");
  });

  it("ShareBox should enable submit button when url is not empty", () => {
    const result = setUpLogin();
    const elm = result.container.querySelector(".sharebox-submit");
    const input = result.container.querySelector(".sharebox-url input");
    input?.setAttribute("value", "https://www.youtube.com/watch?v=123");
    expect(elm?.querySelector("button")?.getAttribute("disabled")).toBe("");
  });

  it("ShareBox should call shareMovie when submit form", async () => {
    const result = setUpLogin();
    const form = result.container.querySelector(".sharebox-form");
    const input = result.container.querySelector(".sharebox-url input");
    input?.setAttribute("value", "https://www.youtube.com/watch?v=123");
    form?.dispatchEvent(new Event("submit", { bubbles: true }));
    await flushPromises();
   expect(shareMovie).toBeCalledTimes(1);
   
  });

  it("should render correct ShareBox", () => {
    const element = setUpLogin();
    expect(element).toMatchSnapshot();
  });

  it("should render correct ShareBox when loading", () => {
    const result = setUpLoginLoading();
    const sharebox = result.container.querySelector(".sharebox-container-skeleton");
    expect(sharebox).toBeInTheDocument();
  });
});
