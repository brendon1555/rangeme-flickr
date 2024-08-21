import { renderHook } from "@testing-library/react";
import useDebounce from "../useDebounce";
import { act } from "react";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial value", 500));

    expect(result.current).toBe("initial value");
  });

  test("should debounce the value after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: {
          value: "initial value",
          delay: 500,
        },
      },
    );

    expect(result.current).toBe("initial value");

    act(() => {
      rerender({ value: "updated value", delay: 500 });
    });

    expect(result.current).toBe("initial value");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated value");
  });
});
