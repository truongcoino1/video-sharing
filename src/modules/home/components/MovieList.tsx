import React, { memo, useEffect } from "react";
import MovieItem from "./MovieItem";
import SkeletonMovie from "./SkeletonMovie";
import { useMovies } from "../hooks/useMovies";
import { Button } from "@/modules/base";

const fakeMovies = [1, 2, 3, 4, 5, 6];

const MovieList = () => {
  const { movies, getMovies, period } = useMovies();

  useEffect(() => {
    getMovies({ refresh: true });
  }, [getMovies]);

  return (
    <div className="movie-list-container pt-[32px]">
      {period.refresh
        ? fakeMovies.map((item) => <SkeletonMovie key={item} />)
        : movies.map((movie) => <MovieItem movie={movie} key={movie.id} />)}
      {!period.refresh && !period.loadMore && !period.limited && (
        <div className="btn-loadmore-wrapper flex items-center justify-center mt-24">
          <Button
            isLoading={period.loadMore}
            className="w-[150px] h-[40px]"
            label="Load more"
            onClick={() => getMovies({ loadMore: true })}
          />
        </div>
      )}
    </div>
  );
};

export default memo(MovieList);
