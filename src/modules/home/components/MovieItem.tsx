import React, { useState, useCallback, memo } from "react";
import VideoPlaceholder from "./VideoPlaceholder";
import type { Movie } from "../types";

type MovieItemProps = {
  movie: Movie;
};
const MovieItem = ({ movie }: MovieItemProps): JSX.Element => {
  const [hasLoadIframe, setHasLoadIframe] = useState(false);

  const handleClickPlaceholder = useCallback(() => {
    setHasLoadIframe(true);
  }, []);

  return (
    <div className="movie-item lg:flex justify-between mb-12">
      {hasLoadIframe ? (
        <div className="lg:w-[350px] lg:h-[196px] rounded-large w-full flex-shrink-0 overflow-hidden relative">
          <iframe 
            className="w-full h-full rounded-large object-cover"
            title={movie.title}
            loading="lazy"
            allow="autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
            src={`https://www.youtube.com/embed/${movie.youtube_id}?autoplay=1`}
          />
        </div>
      ) : (
        <VideoPlaceholder
          thumbnail={movie.thumbnail}
          handleClick={handleClickPlaceholder}
        />
      )}
      <div className="lg:h-[196px] lg:ml-24 flex-grow lg:mt-0 lg:mb-0 mt-12 mb-24">
        <div className="font-bold text-[28px] overflow-hidden line-clamp-2 text-cyan-400">
          <a
            className="title-link"
            href={`https://www.youtube.com/watch?v=${movie.youtube_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {movie.title}
          </a>
        </div>
        <div className="flex items-center">
          <div className="shared-by text-light-low" title={movie.shared_by}>
            <span className="font-semibold text-16 text-light-high">Shared by:</span> {movie.shared_by}
          </div>
        </div>
        <div className="font-semibold text-16 text-light-high">Description:</div>
        <p className="text-14 overflow-hidden text-light-low line-clamp-2 video-description">{movie.description}</p>
      </div>
    </div>
  );
};

export default memo(MovieItem);
