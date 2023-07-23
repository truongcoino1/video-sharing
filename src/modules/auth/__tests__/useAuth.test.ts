import { renderHook, act } from "@testing-library/react";
import { useAuth } from "../hooks/useAuth";
jest.mock("firebase/app", () => {
  return {
    initializeApp: jest.fn(() => {
      return new Promise((res, rej) => {
        res({});
      });
    }),
  };
});

jest.mock("firebase/firestore", () => {
  return {
    getFirestore: jest.fn(() => {
      return new Promise((res, rej) => {
        res({});
      });
    }),
  };
});
jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(() => {
      return {
        signOut: jest.fn(),
      }
    }),
    signInWithEmailAndPassword: jest.fn(() => {
      return new Promise((res, rej) => {
        res({
          user: {
            id: 1,
          },
        });
      });
    }),
    createUserWithEmailAndPassword: jest.fn(() => {
      return new Promise((res, rej) => {
        res({
          user: {
            id: 1,
          },
        });
      });
    }),
  };
});

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
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login("test@gmail.com", "123456");
    });
    expect(result.current.user).toEqual({ id: 1 });
  });

  it("login should work when login API fail", async () => {
    jest.mock("firebase/auth", () => {
      return {
        auth: jest.fn().mockReturnThis(),
        signInWithEmailAndPassword: jest.fn(() => {
          return new Promise((res, rej) => {
            res(null);
          });
        }),
        getAuth: jest.fn(() => {
          return new Promise((res, rej) => {
            res({
              signOut: jest.fn(),
            });
          });
        }),
        createUserWithEmailAndPassword: jest.fn(() => {
          return new Promise((res, rej) => {
            res(null);
          });
        }),
      };
    });
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login("test@gmail.com", "123456");
    });
    expect(result.current.user).toBeNull();
  });

  it("logout should work", async () => {
   
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.logout();
    });
    expect(result.current.user).toEqual(null);
  });
});
