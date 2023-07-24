import React, { memo, useEffect, useMemo } from "react";
import MovieItem from "./MovieItem";
import SkeletonMovie from "./SkeletonMovie";
import { useMovies } from "../hooks/useMovies";
import { Button } from "@/modules/base";
import { useAuthContext } from "@/modules/auth";
import { useSocket } from "@/modules/base/hooks/useSocket";

const fakeMovies = [1, 2, 3, 4, 5];

const MovieList = () => {
  const { movies, getMovies, period, setMovies } = useMovies();
  const { loading } = useAuthContext();
  const { isConnected, subscribe } = useSocket();

  useEffect(() => {
    getMovies({ refresh: true });
  }, []);

  useEffect(() => {
    if (isConnected) {
      subscribe("share-movie", (data: any) => {
        setMovies((prev) => [data, ...prev]);
      });
    }
  }, [isConnected]);

  const isShowLoadMore = useMemo(() => {
    return (
      !period.refresh &&
      !period.loadMore &&
      !period.limited &&
      movies.length > 0
    );
  }, [movies.length, period.limited, period.loadMore, period.refresh]);

  const isShowPlaceholder = useMemo(() => {
    return (period.refresh && movies.length === 0) || loading;
  }, [loading, movies.length, period.refresh]);

  return (
    <div className="movie-list-container pt-[32px]">
      {isShowPlaceholder
        ? fakeMovies.map((item) => <SkeletonMovie key={item} />)
        : movies.map((movie) => <MovieItem movie={movie} key={movie.id} />)}
      {isShowLoadMore && (
        <div className="btn-loadmore-wrapper flex items-center justify-center mt-24">
          <Button
            isLoading={period.loadMore}
            className="w-[150px] h-[40px] btn-loadmore"
            label="Load more"
            onClick={() => {
              getMovies({ loadMore: true })
            }}
          />
        </div>
      )}
      {period.limited && movies.length === 0 && (
        <div className="w-full flex justify-center items-center">
          No videos have been shared yet
        </div>
      )}
    </div>
  );
};

export default memo(MovieList);
