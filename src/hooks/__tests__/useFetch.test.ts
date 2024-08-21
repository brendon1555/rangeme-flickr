import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "../useFetch";

describe("useFetch", () => {
  it("should fetch data successfully", async () => {
    const url = "https://api.example.com/data";
    const mockData = { foo: "bar" };

    // Mock the fetch function
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    const { result } = renderHook(() => useFetch(url));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
    });
  });

  it("should handle fetch error", async () => {
    const url = "https://api.example.com/data";
    const errorMessage = "Failed to fetch data";

    // Mock the fetch function
    global.fetch = vi.fn().mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetch(url));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toEqual(errorMessage);
    });
  });

  it("should handle fetch error when response is not ok", async () => {
    const url = "https://api.example.com/data";
    const errorMessage = "could not fetch the data for that resource";

    // Mock the fetch function
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useFetch(url));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toEqual(errorMessage);
    });
  });
});
