/* eslint-disable @next/next/no-img-element */
import React, { memo } from "react";

type VideoPlaceholderProps = {
  thumbnail: string;
  handleClick: () => void;
};
const VideoPlaceholder = ({
  thumbnail,
  handleClick,
}: VideoPlaceholderProps) => {
  return (
    <div className={`video-placeholder cursor-pointer rounded-large flex items-center justify-center overflow-hidden relative w-full lg:w-[350px] min-w-[350px] lg:h-[196px]`} onClick={handleClick}>
      <img
        className="w-full lg:w-[350px] rounded-large lg:h-[196px] object-cover"
        src={thumbnail || "/video-placeholder.png"}
        alt="video placeholder"
        width="640"
        height="480"
      />
      <img
        className="absolute opacity-50"
        src={'/youtube-brands.svg'}
        alt="button play"
        width="72"
        height="72"
      />
    </div>
  );
};

export default memo(VideoPlaceholder);
