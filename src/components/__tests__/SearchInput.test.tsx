import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchInput from "../SearchInput";

describe("SearchInput", () => {
  it("calls the onChange function with the correct value when input changes", async () => {
    const onChangeMock = vi.fn();
    render(<SearchInput onChange={onChangeMock} />);
    const inputElement = screen.getByPlaceholderText("Search...");

    fireEvent.change(inputElement, { target: { value: "test" } });
    await waitFor(() => expect(onChangeMock).toHaveBeenCalledWith("test"));
  });

  it("clears the search when clear button is clicked", async () => {
    const onChangeMock = vi.fn();
    render(<SearchInput onChange={onChangeMock} />);
    const inputElement = screen.getByPlaceholderText("Search...");

    fireEvent.change(inputElement, { target: { value: "test" } });
    fireEvent.click(screen.getByTitle("Clear Input"));

    await waitFor(() => expect(onChangeMock).toHaveBeenCalledWith(""));
  });
});
