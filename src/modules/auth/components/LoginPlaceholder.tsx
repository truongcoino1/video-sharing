import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";

const LoginPlaceholder = (): JSX.Element => {
  return (
    <div className="flex login-placeholder">
      <Skeleton containerClassName="mr-12" className="w-[100px] min-w-[100px] lg:w-[200px] lg:min-w-[200px]  h-[40px] flex-shrink-0 overflow-hidden relative" />
      <Skeleton containerClassName="mr-12" className="w-[100px] min-w-[100px] lg:w-[200px] lg:min-w-[200px] mr-12 h-[40px] flex-shrink-0 overflow-hidden relative" />
      <Skeleton className="w-[80px] min-w-[80px] lg:w-[134px] lg:min-w-[150px] h-[40px] flex-shrink-0 overflow-hidden relative" />
    </div>
  );
};

export default memo(LoginPlaceholder);
