import { render, screen, fireEvent } from "@testing-library/react";
import Toggle from "../Toggle";

describe("Toggle", () => {
  it("renders with default values", () => {
    render(<Toggle trueLabel="On" falseLabel="Off" onChange={() => {}} />);
    const falseLabelElement = screen.getByText("Off");
    const trueLabelElement = screen.getByText("On");

    expect(falseLabelElement).toBeInTheDocument();
    expect(trueLabelElement).toBeInTheDocument();
  });

  it("calls the onChange function with the correct value when toggled", () => {
    const onChangeMock = vi.fn();
    render(<Toggle onChange={onChangeMock} trueLabel="On" falseLabel="Off" />);
    const toggleElement = screen.getByLabelText("OffOn");

    fireEvent.click(toggleElement);

    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  it("updates the checked state when toggled", () => {
    render(<Toggle trueLabel="On" falseLabel="Off" onChange={() => {}} />);
    const toggleElement = screen.getByLabelText("OffOn");

    fireEvent.click(toggleElement);

    expect(toggleElement).toBeChecked();
  });
});
