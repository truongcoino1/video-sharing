import { renderHook, act } from "@testing-library/react";
import { useAuth } from "../hooks/useAuth";
import { AuthService } from "../services";

describe("useAuth", () => {
  it("useAuth should work", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current).toBeTruthy();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(result.current.login).toBeInstanceOf(Function);
    expect(result.current.user).toBeNull();
    expect(result.current.logout).toBeInstanceOf(Function);
  });

  it("login should work when login API success", async () => {
    AuthService.login = jest.fn().mockResolvedValue({
      success: true,
      data: { id: 1 },
    });
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login("test@gmail.com", "123456");
    });
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(result.current.user).toEqual({ id: 1 });
  });

  it("login should work when login API fail", async () => {
    AuthService.login = jest.fn().mockResolvedValue({
      success: false,
    });
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login("test@gmail.com", "123456");
    });
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(result.current.user).toBeNull()
  });

  it("logout should work", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.logout();
    });
    expect(result.current.user).toEqual(null);
  });
});
