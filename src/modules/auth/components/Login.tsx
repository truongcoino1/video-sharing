import React, { memo, useCallback, useMemo } from "react";
import { useInput } from "@/modules/base";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, login, error } = useAuth();
  const { value: email, handleOnChange: handleSetEmail } = useInput("");
  const { value: password, handleOnChange: handleSetPassword } = useInput("");

  const handleLogin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      login(email, password);
    },
    [email, password]
  );

  const isDisabled = useMemo(() => {
    return loading || !email || !password;
  }, [email, loading, password]);

  return (
    <div className="login-container">
      <form className="login-form flex-col flex lg:flex-row" onSubmit={handleLogin}>
        <input
          autoFocus
          name="email"
          type="email"
          placeholder="Email"
          aria-label="email"
          value={email}
          className="mr-8 h-[40px] border rounded-medium border-gray-300 px-4"
          onChange={handleSetEmail}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          aria-label="password"
          value={password}
          className="mr-8 h-[40px] border rounded-medium border-gray-300 px-4"
          onChange={handleSetPassword}
        />
        <button disabled={isDisabled} type="submit">
          <span>Login / Register</span>
        </button>
      </form>
    </div>
  );
};

export default memo(Login);
