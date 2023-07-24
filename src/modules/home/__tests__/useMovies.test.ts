import { renderHook, act } from "@testing-library/react";
import { toast } from "react-toastify";
import { useMovies } from "../hooks/useMovies";
import { HomeService } from "../services";
import { Movie } from "../types";

jest.mock("../utils/helpers");
jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

describe("useMovies", () => {
  it("useMovies should work", () => {
    const { result } = renderHook(() => useMovies());
    expect(result.current).toBeTruthy();
    expect(result.current.movies).not.toBeUndefined();
    expect(result.current.period).not.toBeUndefined();
    expect(result.current.getMovies).toBeInstanceOf(Function);
    expect(result.current.shareMovie).toBeInstanceOf(Function);
  });

  it("getMovies should work when getMovies API success", async () => {
    HomeService.getMovies = jest.fn().mockResolvedValue({
      status: "success",
      result: [{ id: 1 }],
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.getMovies({ refresh: true });
    });
    expect(result.current.movies).toEqual([{ id: 1 }]);
  });

  it("getMovies should work when getMovies API fail", async () => {
    HomeService.getMovies = jest.fn().mockResolvedValue({
      success: false,
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.getMovies({ refresh: true });
    });
    expect(result.current.movies).toEqual([]);
  });

  it("shareMovie should work when getYoutubeVideoInfo and shareMovie apis success", async () => {
    const { getYoutubeVideoId } = require("../utils/helpers");
    getYoutubeVideoId.mockImplementation(() => "1");
    HomeService.getYoutubeVideoInfo = jest.fn().mockResolvedValue({
      items: [
        {
          snippet: {
            title: "string",
            description: "string",
            thumbnails: {
              standard: {
                url: "string",
              },
            },
          },
        },
      ],
    });
    HomeService.shareMovie = jest.fn().mockResolvedValue({
      status: "success",
      result: { id: 1 },
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.shareMovie(
        "https://www.youtube.com/watch?v=mnlo3ntJG98"
      );
    });
    expect(result.current.movies).toEqual([{ id: 1 }]);
    expect(toast).toBeCalledWith("Share successfully", {
      type: "success",
    });
  });

  it("shareMovie should work when getYoutubeVideoInfo api success and shareMovie api fail", async () => {
    HomeService.getYoutubeVideoInfo = jest.fn().mockResolvedValue({
      items: [
        {
          snippet: {
            title: "string",
            description: "string",
            thumbnails: {
              standard: {
                url: "string",
              },
            },
          },
        },
      ],
    });
    HomeService.shareMovie = jest.fn().mockResolvedValue({
      success: false,
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.shareMovie(
        "https://www.youtube.com/watch?v=mnlo3ntJG98"
      );
    });
    expect(result.current.movies).toEqual([]);
  });

  it("shareMovie should work when getYoutubeVideoInfo api fail", async () => {
    HomeService.getYoutubeVideoInfo = jest.fn().mockResolvedValue({
      item: null,
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.shareMovie("https://www.youtube.com/watch");
    });
    expect(result.current.movies).toEqual([]);
    expect(toast).toBeCalledWith("Invalid Youtube link", {
      type: "error",
    });
  });

  it("shareMovie should work when getYoutubeVideoId fail", async () => {
    const { getYoutubeVideoId } = require("../utils/helpers");
    getYoutubeVideoId.mockImplementation(() => null);
    HomeService.getYoutubeVideoInfo = jest.fn().mockResolvedValue({
      items: [
        {
          snippet: {
            title: "string",
            description: "string",
            thumbnails: {
              standard: {
                url: "string",
              },
            },
          },
        },
      ],
    });
    HomeService.shareMovie = jest.fn().mockResolvedValue({
      success: false,
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.shareMovie("https://www.youtube.com/watch?v=");
    });
    expect(result.current.movies).toEqual([]);
    expect(toast).toBeCalledWith("Invalid Youtube link", {
      type: "error",
    });
  });

  it("should set loading properties period when getMovies success", async () => {
    HomeService.getMovies = jest.fn().mockResolvedValue({
      status: "success",
      result: [{ id: 1 }],
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.getMovies({ refresh: true });
    });
    expect(result.current.period).toEqual({
      limited: true,
      pageSize: 20,
      page: 0,
      refresh: false,
      loadMore: false,
    });
  });

  it("should set loading properties period when getMovies fail", async () => {
    HomeService.getMovies = jest.fn().mockRejectedValue({
      success: false,
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.getMovies({ refresh: true });
    });
    expect(result.current.period).toEqual({
      limited: true,
      pageSize: 20,
      page: 0,
      refresh: false,
      loadMore: false,
    });
  });

  it("should show toast and setLoading is false when shareMovie fail", async () => {
    const { getYoutubeVideoId } = require("../utils/helpers");
    getYoutubeVideoId.mockImplementation(() => "1");
    HomeService.getYoutubeVideoInfo = jest.fn().mockRejectedValue({
      items: [
        {
          snippet: {
            title: "string",
            description: "string",
            thumbnails: {
              standard: {
                url: "string",
              },
            },
          },
        },
      ],
    });
    HomeService.shareMovie = jest.fn().mockRejectedValue({
      success: false,
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.shareMovie(
        "https://www.youtube.com/watch?v=mnlo3ntJG98"
      );
    });
    expect(result.current.movies).toEqual([]);
    expect(toast).toBeCalled()
  });

  it("should has not lastMovieIdParam when getMovies", async () => {
    HomeService.getMovies = jest.fn().mockResolvedValue({
      status: "success",
      result: [{ id: 1 }],
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.getMovies({ refresh: true });
    });
    expect(HomeService.getMovies).toBeCalledWith(20, undefined);
  });

  it("should has lastMovieIdParam when getMovies", async () => {
    HomeService.getMovies = jest.fn().mockResolvedValue({
      status: "success",
      result: [{ id: 1 }],
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.getMovies({ refresh: true });
    });
    await act(async () => {
      await result.current.getMovies({ loadMore: true });
    });
    expect(HomeService.getMovies).toBeCalledWith(20, undefined);
    expect(HomeService.getMovies).toBeCalledWith(20, 1);
  });
});
