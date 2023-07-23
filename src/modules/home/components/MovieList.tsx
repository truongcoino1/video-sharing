import React, { memo, useEffect, useMemo } from "react";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import MovieItem from "./MovieItem";
import SkeletonMovie from "./SkeletonMovie";
import { useMovies } from "../hooks/useMovies";
import { Button, database, uniqueArrayById } from "@/modules/base";
import { MOVIE_COLLECTION } from "../services/firebase";
import { Movie } from "../types";

const fakeMovies = [1, 2, 3, 4, 5, 6];

const MovieList = () => {
  const { movies, getMovies, period, setMovies } = useMovies();

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(database, MOVIE_COLLECTION)),
      (querySnapshot) => {
        const newMovies = querySnapshot
          .docChanges()
          .map((change) => change.doc.data()) as Movie[];
        setMovies((preState) => {
          return [...newMovies, ...preState];
        });
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const isShowLoadMore = useMemo(() => {
    return (
      !period.refresh &&
      !period.loadMore &&
      !period.limited &&
      movies.length > 0
    );
  }, [movies.length, period.limited, period.loadMore, period.refresh]);

  const isShowSkeleton = useMemo(() => {
    return period.refresh || (movies.length === 0 && !period.limited);
  }, [movies.length, period.limited, period.refresh]);
  
  return (
    <div className="movie-list-container pt-[32px]">
      {isShowSkeleton
        ? fakeMovies.map((item) => <SkeletonMovie key={item} />)
        : uniqueArrayById(movies).map((movie) => <MovieItem movie={movie} key={movie.id} />)}
      {isShowLoadMore && (
        <div className="btn-loadmore-wrapper flex items-center justify-center my-24 ">
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
