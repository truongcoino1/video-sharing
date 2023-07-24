import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonShareBox = (): JSX.Element => {
  return (
    <div className="sharebox-container-skeleton mt-[100px] flex items-center justify-center">
      <Skeleton className="w-[600px] min-w-[600px] min-h-[178px]" containerClassName="w-[600px] min-w-[600px] min-h-[178px] rounded-large" />
    </div>
  );
};

export default memo(SkeletonShareBox);
