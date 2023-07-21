import { renderHook, act } from "@testing-library/react";
import { useInput } from "../hooks";

test("useInput should work", () => {
  const { result } = renderHook(() => useInput("initValue"));
  expect(result.current).toBeTruthy();
  expect(result.current.value).toBeTruthy();
  expect(result.current.setValue).toBeTruthy();
  expect(result.current.setValue).toBeInstanceOf(Function);
  expect(result.current.handleOnChange).toBeTruthy();
  expect(result.current.handleOnChange).toBeInstanceOf(Function);

  // test setValue
  expect(result.current.value).toBe("initValue");
  act(() => {
    result.current.setValue("newValue");
  });
  expect(result.current.value).toBe("newValue");

  // test handleOnChange with valid event
  act(() => {
    const event = {
      target: {
        value: "finalValue",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    event.target.value = "finalValue";
    result.current.handleOnChange(event);
  });
  expect(result.current.value).toBe("finalValue");

  // test handleOnChange with invalid event
  act(() => {
    result.current.handleOnChange(null);
  });
  expect(result.current.value).toBe(undefined);
});
