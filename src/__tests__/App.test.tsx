import { act, render, screen } from "@testing-library/react";
import App from "../App";
import useFetch from "../hooks/useFetch";

vi.mock("../hooks/useFetch");

describe("App", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the App component", async () => {
    const mockData = {
      items: [
        {
          author: 'nobody@flickr.com ("author 1")',
          tags: "tag1 tag2 tag3",
          media: { m: "image-url" },
          title: "image title",
          date_taken: "2011-10-01T16:13:46-08:00",
          link: "https://example.com/image",
          description: "",
          published: "",
          author_id: "",
        },
        {
          author: 'nobody@flickr.com ("author 2")',
          tags: "tag1 tag2 tag3",
          media: { m: "image-url" },
          title: "image title",
          date_taken: "2011-10-01T16:13:46-08:00",
          link: "https://example.com/image",
          description: "",
          published: "",
          author_id: "",
        },
        {
          author: 'nobody@flickr.com ("author 3")',
          tags: "tag1 tag2 tag3",
          media: { m: "image-url" },
          title: "image title",
          date_taken: "2011-10-01T16:13:46-08:00",
          link: "https://example.com/image",
          description: "",
          published: "",
          author_id: "",
        },
      ],
    };

    vi.mocked(useFetch).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<App />);
    });

    expect(screen.queryByLabelText("searching")).not.toBeInTheDocument();
    expect(screen.queryByText("Error:")).not.toBeInTheDocument();

    expect(screen.getByText("author 1")).toBeInTheDocument();
    expect(screen.getByText("author 2")).toBeInTheDocument();
    expect(screen.getByText("author 3")).toBeInTheDocument();
  });

  it("renders the loading state when isLoading is true", async () => {
    vi.mocked(useFetch).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByLabelText("searching")).toBeInTheDocument();
    expect(screen.queryByText("Error:")).not.toBeInTheDocument();
    expect(screen.queryByText("author 1")).not.toBeInTheDocument();
  });

  it("renders the error message when there is an error", async () => {
    const mockError = "Failed to fetch data";

    vi.mocked(useFetch).mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError,
    });

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
    expect(screen.queryByLabelText("searching")).not.toBeInTheDocument();
    expect(screen.queryByText("author 1")).not.toBeInTheDocument();
  });
});
