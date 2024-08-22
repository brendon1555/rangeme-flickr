import { useMemo } from "react";
import Image from "./Image";
import LinkIcon from "./Link";

interface CardProps {
  image: Image;
}

const Card = ({ image }: CardProps) => {
  // Pull the actual author name from the author string
  const authorName = useMemo(
    () => image.author.match(/"(.*?)"/)?.[1],
    [image.author],
  );

  //   Split the tags string into an array of tags, and filter out any empty strings
  const tags = useMemo(
    () => image.tags.split(" ").filter(Boolean),
    [image.tags],
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col">
      <Image
        className="rounded-t-lg w-full object-cover object-center aspect-video"
        src={image.media.m}
        alt={image.title}
      />

      <div className="flex flex-col p-5 flex-1">
        <div className="flex justify-between mb-2">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            {authorName}
          </span>
          <a
            href={image.link}
            target="_blank"
            rel="noreferrer noopener"
            title="Open image"
          >
            <LinkIcon className="w-4 h-4 mt-1" />
          </a>
        </div>
        <span className="mb-3 font-medium text-gray-500">
          {new Date(image.date_taken).toLocaleString("en-AU")}
        </span>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 truncate"
              role="tag"
              title={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
