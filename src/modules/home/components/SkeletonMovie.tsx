import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonMovie = (): JSX.Element => {
  return (
    <div className="movie-item-skeleton flex justify-between mb-12">
      <Skeleton className="w-[350px] min-w-[350px] h-[196px] flex-shrink-0 overflow-hidden relative" />
      <div className="h-[196px] ml-24 flex-grow">
        <Skeleton
          count={1}
          className="h-[24px] flex-shrink-0 overflow-hidden relative"
        />
         <Skeleton
          count={1}
          className="h-[24px] max-w-[200px] flex-shrink-0 overflow-hidden relative"
        />
        <div className="flex items-center my-12">
          <Skeleton className="h-[18px] min-w-[250px] flex-shrink-0 overflow-hidden" />
        </div>
        <Skeleton className="h-[18px] max-w-[200px] flex-shrink-0 overflow-hidden relative" />
        <Skeleton
          count={3}
          className="h-[12px] flex-shrink-0 overflow-hidden relative"
        />
      </div>
    </div>
  );
};

export default memo(SkeletonMovie);
