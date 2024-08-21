import { render, screen } from "@testing-library/react";
import Card from "../Card";

const mockImage = {
  author: 'nobody@flickr.com ("author name")',
  tags: "tag1 tag2 tag3",
  media: { m: "image-url" },
  title: "image title",
  date_taken: "2011-10-01T16:13:46-08:00",
  link: "https://example.com/image",
  description: "",
  published: "",
  author_id: "",
};

describe("Card", () => {
  it("renders the author name", () => {
    render(<Card image={mockImage} />);
    const authorNameElement = screen.getByText("author name");

    expect(authorNameElement).toBeInTheDocument();
  });

  it("renders the formatted date", () => {
    render(<Card image={mockImage} />);
    const formattedDateElement = screen.getByText("02/10/2011, 11:13:46 am");

    expect(formattedDateElement).toBeInTheDocument();
  });

  it("renders the tags", () => {
    render(<Card image={mockImage} />);
    const tagElements = screen.getAllByRole("tag");

    expect(tagElements).toHaveLength(3);
    expect(tagElements[0]).toHaveTextContent("tag1");
    expect(tagElements[1]).toHaveTextContent("tag2");
    expect(tagElements[2]).toHaveTextContent("tag3");
  });

  it("renders the image with correct src and alt", () => {
    render(<Card image={mockImage} />);
    const imageElement = screen.getByAltText("image title");

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "image-url");
  });

  it("renders the link to view full image", () => {
    render(<Card image={mockImage} />);
    const linkElement = screen.getByTitle("Open image");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "https://example.com/image");
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noreferrer noopener");
  });
});
