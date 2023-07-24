import { render, cleanup, fireEvent } from "@testing-library/react";
import Login from "../components/Login";
import {flushPromises} from '@/modules/base';
import "@/modules/base/utils/jest.mock";

const login = jest.fn();
jest.mock("../hooks/useAuth", () => {
  const useAuth = () => {
    return {
      login: login,
    };
  };
  return {
    useAuth,
  };
});

describe("Login", () => {
  afterEach(cleanup);

  it("Login render without crash", () => {
    const result = render(<Login />);
    const container = result.container;
    const elm = container.querySelector(".login-container");
    const inputEmail = container.querySelector('input[type="email"]');
    const inputPassword = container.querySelector('input[type="password"]');
    const btnSubmit = container.querySelector('button[type="submit"]');
    expect(elm).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
  });

  it("Button Login/Register disabled when email and password empty", () => {
    const result = render(<Login />);
    const btnSubmit = result.container.querySelector('button[type="submit"]');
    expect(btnSubmit).toBeDisabled();
  });

  const setUp = () => {
    const result = render(<Login />);
    const container = result.container;
    const inputEmail = container.querySelector(
      'input[type="email"]'
    ) as Element;
    const inputPassword = container.querySelector(
      'input[type="password"]'
    ) as Element;
    const btnSubmit = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    const form = container.querySelector("form") as Element;
    return {
      inputEmail,
      inputPassword,
      btnSubmit,
      form,
    };
  };

  it("Button Login/Register disabled when email empty and password not empty", () => {
    const { inputPassword, btnSubmit } = setUp();
    fireEvent.change(inputPassword, { target: { value: "test_password" } });
    expect(btnSubmit).toBeDisabled();
  });

  it("Button Login/Register disabled when email not empty and password empty", () => {
    const { inputEmail, btnSubmit } = setUp();
    fireEvent.change(inputEmail, { target: { value: "test_email@gmail.com" } });
    expect(btnSubmit).toBeDisabled();
  });

  it("Button Login/Register enabled when email not empty and password not empty", () => {
    const { inputEmail, inputPassword, btnSubmit } = setUp();
    fireEvent.change(inputEmail, { target: { value: "test_email@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "test_password" } });
    expect(btnSubmit).not.toBeDisabled();
  });

  it("Button Login/Register should call login function when click",async () => {
    const { form } = setUp();
    form?.dispatchEvent(new Event("submit", { bubbles: true }));
    await flushPromises()
    expect(login).toBeCalledTimes(1);
  });
  
  it('should render correct Login', () => {
    const login = render(<Login />)
    expect(login).toMatchSnapshot();
  });
});
