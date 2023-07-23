import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";

const LoginPlaceholder = (): JSX.Element => {
  return (
    <div className="flex justify-between">
      <Skeleton containerClassName="mr-12" className="w-[200px] min-w-[200px]  h-[40px] flex-shrink-0 overflow-hidden relative" />
      <Skeleton containerClassName="mr-12" className="w-[200px] min-w-[200px] mr-12 h-[40px] flex-shrink-0 overflow-hidden relative" />
      <Skeleton className="w-[134px] min-w-[150px] h-[40px] flex-shrink-0 overflow-hidden relative" />
    </div>
  );
};

export default memo(LoginPlaceholder);
