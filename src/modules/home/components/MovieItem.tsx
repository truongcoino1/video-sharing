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
    <div className="flex justify-between mb-12">
      {hasLoadIframe ? (
        <div className="w-[350px] h-[196px] flex-shrink-0 overflow-hidden relative">
          <iframe
            title={movie.title}
            loading="lazy"
            allow="autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
            src={`https://www.youtube.com/embed/${movie.id}?autoplay=1`}
          />
        </div>
      ) : (
        <VideoPlaceholder
          thumbnail={movie.thumbnail}
          handleClick={handleClickPlaceholder}
        />
      )}
      <div className="h-[196px] ml-12 flex-grow">
        <div className="font-bold text-24">
          <a
            href={`https://www.youtube.com/watch?v=${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {movie.title}
          </a>
        </div>
        <div className="flex items-center">
          <div className="text-16" title={movie.shared_by}>
            <span className="font-medium">Shared by:</span> {movie.shared_by}
          </div>
        </div>
        <div className="font-medium">Description:</div>
        <p className="text-14">{movie.description}</p>
      </div>
    </div>
  );
};

export default memo(MovieItem);
