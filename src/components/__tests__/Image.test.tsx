import { fireEvent, render, screen } from "@testing-library/react";
import Image from "../Image";

describe("Image", () => {
  it("renders the loading state initially", () => {
    render(<Image src="test.jpg" alt="Test Image" />);
    const loadingElement = screen.getByRole("status");
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders the image after it is loaded", () => {
    render(<Image src="test.jpg" alt="Test Image" />);
    const imageElement = screen.getByAltText("Test Image");
    expect(imageElement).toBeInTheDocument();
  });

  it("calls the onLoad callback when the image is loaded", () => {
    const onLoadMock = vi.fn();
    render(<Image src="test.jpg" alt="Test Image" onLoad={onLoadMock} />);
    const imageElement = screen.getByAltText("Test Image");
    expect(onLoadMock).not.toHaveBeenCalled();
    fireEvent.load(imageElement);
    expect(onLoadMock).toHaveBeenCalled();
  });
});
