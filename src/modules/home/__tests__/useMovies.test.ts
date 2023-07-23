import { renderHook, act } from "@testing-library/react";
import { useMovies } from "../hooks/useMovies";
import { HomeService } from "../services";

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
      await result.current.getMovies({ refresh: true});
    });
    expect(result.current.movies).toEqual([{ id: 1 }]);
  });

  it("getMovies should work when getMovies API fail", async () => {
    HomeService.getMovies = jest.fn().mockResolvedValue({
      success: false,
    });
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.getMovies({ refresh: true});
    });
    expect(result.current.movies).toEqual([]);
  });

  it("shareMovie should work when getYoutubeVideoInfo and shareMovie apis success", async () => {
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
    HomeService.getYoutubeVideoInfo = jest.fn().mockRejectedValue({
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
});
