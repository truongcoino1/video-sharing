import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}));
 //@ts-ignore
 global.setImmediate = jest.useRealTimers;
const setUpNotLogin = () => {
  return render(
    <AuthContext.Provider
      value={{
        currentUser: null,
        setLoading: jest.fn(),
        setCurrentUser: jest.fn(),
        loading: false,
      }}
    >
      <Header />
    </AuthContext.Provider>
  );
};

const setUpLogin = () => {
  return render(
    <AuthContext.Provider
      value={{
        currentUser: {
          email: "truongvk",
          token: "123",
          id: 1,
          password: "123",
          refreshToken: "123",
        },
        setLoading: jest.fn(),
        setCurrentUser: jest.fn(),
        loading: false,
      }}
    >
      <Header />
    </AuthContext.Provider>
  );
};

describe("Header", () => {
  afterEach(cleanup);
 
  it("Header render without crash", async () => {
    const result = setUpNotLogin();
    const elm = result.container.querySelector(".header-container");
    expect(elm).toBeInTheDocument();
  });

  it("Header show correct title", () => {
    const result = setUpNotLogin();
    const elm = result.container.querySelector(".title");
    expect(elm?.textContent).toBe("Funny Movies");
  });

  it("Header show login", () => {
    const result = setUpNotLogin();
    const elm = result.container.querySelector(".login-container");
    expect(elm).toBeInTheDocument();
  });

  it("Header show userAction", () => {
    const result = setUpLogin();
    const elm = result.container.querySelector(".user-action-container");
    expect(elm).toBeInTheDocument();
  });

  it("Header show userAction after login/register success", () => {
    const result = setUpNotLogin();

    // Firstly, display loign
    const container = result.container;
    const loginElm = result.container.querySelector(".login-container");
    expect(loginElm).toBeInTheDocument();

    const inputEmail = container.querySelector(
      'input[type="email"]'
    ) as Element;
    const inputPassword = container.querySelector(
      'input[type="password"]'
    ) as Element;
    const buttonSubmit = container.querySelector(
      'button[type="submit"]'
    ) as Element;

    fireEvent.change(inputEmail, {
      target: { value: "test_email1@gmail.com" },
    });
    fireEvent.change(inputPassword, { target: { value: "abc123451" } });
    expect(buttonSubmit).not.toBeDisabled();

    fireEvent.submit(buttonSubmit);

    // After login success
    const actionElm = result.container.querySelector(".user-action-container");
    waitFor(() => expect(actionElm).toBeInTheDocument());
  });

  it("should render correct Header", () => {
    const header = render(<Header />);
    expect(header).toMatchSnapshot();
  });
});
