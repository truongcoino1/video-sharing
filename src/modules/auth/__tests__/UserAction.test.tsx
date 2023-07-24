import { render, cleanup, fireEvent } from "@testing-library/react";
import UserAction from "../components/UserAction";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}));

const logout = jest.fn();
jest.mock("../hooks/useAuth", () => {
  const useAuth = () => {
    return {
      logout: logout
    };
  }

  return { useAuth }
});

describe("UserAction", () => {
  afterEach(cleanup);

  it("UserAction should render without crash", () => {
    const result = render(<UserAction />);
    const elm = result.container.querySelector(".user-action-container");
    expect(elm).toBeInTheDocument();
  });

  it("UserAction should show authorized user's email", () => {
    const email = "email_test@gmail.com";
    const result = render(<UserAction email={email} />);
    const elm = result.container.querySelector(".txt-welcome");
    expect(elm).not.toBeNull();
    expect(elm?.textContent).toBe(`Welcome ${email}`);
  });

  it("UserAction should show empty user email when not passing", () => {
    const result = render(<UserAction />);
    const elm = result.container.querySelector(".txt-welcome");
    expect(elm).not.toBeNull();
    expect(elm?.textContent).toBe(`Welcome `);
  });

  it('It calls start logout on button click', () => {
    const result = render(<UserAction />);
    const btn = result.container.querySelector(".btn-logout") as Element;
    fireEvent.click(btn)
    expect(logout).toBeCalledTimes(1);
  });

  it('should render correct Login', () => {
    const element = render(<UserAction />)
    expect(element).toMatchSnapshot();
  });
});
