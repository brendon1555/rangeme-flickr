import { useState } from "react";
import Loading from "./Loading";
import { twMerge } from "tailwind-merge";

const Image = ({ ...imageProps }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Display a loading spinner while the image is loading
  return (
    <div className="relative">
      {isLoading && (
        <div
          className={twMerge(
            "absolute flex items-center justify-center",
            imageProps.className,
          )}
        >
          <Loading />
        </div>
      )}
      <img onLoad={() => setIsLoading(false)} loading="lazy" {...imageProps} />
    </div>
  );
};

export default Image;
