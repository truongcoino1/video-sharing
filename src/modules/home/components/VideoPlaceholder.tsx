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
    <div className={`overflow-hidden relative`} onClick={handleClick}>
      <img
        className="w-full h-auto object-cover"
        src={thumbnail}
        alt="video placeholder"
        width="640"
        height="480"
      />
    </div>
  );
};

export default memo(VideoPlaceholder);
