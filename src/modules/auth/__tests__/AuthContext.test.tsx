import { render, cleanup, screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import React from "react";
import { setToken } from "../../base/services/api";

const push = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: push,
  }),
  usePathname: () => "/",
}));

jest.mock("../../base/services/api", () => {
  return {
    setToken: jest.fn()
  }
})

describe("AuthProvider", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("AuthContext should render without crash", async () => {
    render(
      <AuthProvider>
        <div data-testid="root"></div>
      </AuthProvider>
    );
    expect(await screen.findByTestId("root")).toBeInTheDocument();
  });

  it("AuthContext should redirect to login when user not found", async () => {
    render(
      <AuthProvider>
        <div data-testid="root"></div>
      </AuthProvider>
    );
    expect(push).toBeCalled();
    expect(push).toBeCalledWith("/");
  });

  it("AuthContext should set current user when user found", async () => {
    localStorage.setItem("user", JSON.stringify({ token: "token" }));
    const setCurrentUser = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setCurrentUser];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <AuthProvider>
        <div data-testid="root"></div>
      </AuthProvider>
    );
    expect(push).not.toBeCalled();
    expect(setCurrentUser).toHaveBeenCalledWith({ token: "token" });
    expect(setCurrentUser).toHaveBeenCalledWith(false);
    expect(setToken).toBeCalledTimes(1);
  });
});
