import React, { memo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/modules/base";

const PATH_SHARE = "/share";

type UserActionProps = {
  email?: string;
};
const UserAction = ({ email }: UserActionProps) => {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const goToSharePage = () => {
    router.push(PATH_SHARE);
  };

  return (
    <div className="user-action-container flex items-center">
      <span className="txt-welcome ">Welcome <span className="text-primary-250 font-semibold">{email}</span></span>
      <Button
        label="Share a movie"
        onClick={goToSharePage}
        className="btn-share-movie ml-12 w-[120px] h-[36px]"
        isDisable={pathname === PATH_SHARE}
      ></Button>
      <button className="btn-logout ml-12 border border-gray-300 h-[36px] px-[12px] rounded-medium" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default memo(UserAction);
