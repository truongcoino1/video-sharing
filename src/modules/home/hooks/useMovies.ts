"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { HomeService } from "../services";
import { getYoutubeVideoId } from "../utils";
import { Movie } from "../types";
import { useAuthContext } from "@/modules/auth";

type Period = {
  page?: number;
  limited?: boolean;
  pageSize?: number;
  refresh?: boolean;
  loadMore?: boolean;
};

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [period, setPeriod] = useState({
    page: 0,
    limited: false,
    pageSize: 20,
    refresh: false,
    loadMore: false,
  });

  const {currentUser} = useAuthContext();

  const [isSharing, setIsSharing] = useState(false);

  const getMovies = useCallback(async (param: Period) => {
    try {
      setPeriod((preState) => ({
        ...preState,
        ...param
      }));
      const lastMovieId = movies[movies.length - 1]?.id;
      const lastMovieIdParam = param.refresh ? undefined : lastMovieId;
      const response = await HomeService.getMovies(period.pageSize, lastMovieIdParam);
      if (response.status ==="success" && response.result) {
        setMovies(preState => preState.concat(response.result || []));
        setPeriod((preState) => ({
          ...preState,
          loadMore: false,
          refresh: false,
          limited: (response.result?.length || 0) < period.pageSize,
        }));
      } else {
        setPeriod((preState) => ({
          ...preState,
          loadMore: false,
          refresh: false,
        }));
      }
    } catch (error) {
      setPeriod((preState) => ({
        ...preState,
        loadMore: false,
        refresh: false,
        limited: true,
      }));
    }
  }, [movies, period.pageSize]);

  const shareMovie = useCallback(async (youtubeLink: string) => {
    try {
      const videoId = getYoutubeVideoId(youtubeLink);
      if (!videoId) {
        toast("Invalid Youtube link", {
        type: "error",
      });
        return;
      }
      setIsSharing(true);
      let title = "Movie title";
      let description = "Movie description";
      let thumbnail = "";
      const youtubeInfo = await HomeService.getYoutubeVideoInfo(videoId);
      if (youtubeInfo && youtubeInfo.items && youtubeInfo.items.length > 0) {
        title = youtubeInfo.items[0].snippet?.title ?? title;
        description = youtubeInfo.items[0].snippet?.description ?? description;
        thumbnail =
          youtubeInfo.items[0].snippet?.thumbnails?.standard?.url ?? thumbnail;
        const response = await HomeService.shareMovie({
          title,
          description,
          thumbnail,
          youtube_id: videoId,
          shared_by: currentUser?.email ?? "",
        });
        setIsSharing(false);
        if (response.status === "success" && response.result) {
          toast("Share successfully", {
            type: "success",
          });
          setMovies([response.result, ...movies]);
        }
      } else {
        toast("Invalid Youtube link", {
          type: "error",
        });
        setIsSharing(false);
      }
    } catch (error: any) {
      toast(error.message, {
        type: "error",
      });
      setIsSharing(false);
    }
  }, [currentUser?.email, movies]);

  return {
    movies,
    period,
    getMovies,
    shareMovie,
    isSharing,
    setMovies
  };
};
