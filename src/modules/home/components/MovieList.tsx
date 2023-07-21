import React, { useEffect, useCallback, useState, useRef, memo } from 'react';
import MovieItem from './MovieItem';
import './MovieList.scss';

const FETCH_LIMIT = 4;

const MovieList = () => {


  return (
    <div className="movie-list-container">
      {movies.map((movie) => (
        <MovieItem key={movie.video_id} movie={movie} />
      ))}
      <div className="btn-loadmore-wrapper">
        <button className="btn-loadmore" onClick={handleLoadMore}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default memo(MovieList);
