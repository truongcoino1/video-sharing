/* istanbul ignore file */

import { api, ApiResponse } from "@/modules/base";
import { Movie, MovieSession } from "../types";

export const HomeService = {
  getMovies: async (
    pageSize: number,
    lastMovieId?: string,
  ): Promise<ApiResponse<Movie[]>> => {
    return await api.get("/api/public/movie", { lastMovieId, pageSize: pageSize, orderBy: "DESC" });
  },

  shareMovie: async (movie: MovieSession): Promise<ApiResponse<Movie>> => {
    return await api.post("/api/movie", movie);
  },

  getYoutubeVideoInfo: async (
    video_id?: string
  ): Promise<{
    kind: string;
    etag: string;
    items: {
      snippet: {
        title: string;
        description: string;
        thumbnails: {
          standard: {
            url: string;
          };
        };
      };
    }[];
  }> => {
    const gootleApiBase = "https://www.googleapis.com/youtube/v3";
    const youtubeApiKey = "AIzaSyA-Z8sMk4jnJsMB9mffnOo-bGMIwwkW4EI";
    const requestUrl = `${gootleApiBase}/videos?id=${video_id}&key=${youtubeApiKey}&part=snippet`;
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await fetch(requestUrl);
        const data = await resp.json();
        if (data && data.error) {
          reject(data.error);
        } else {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};
