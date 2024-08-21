import { useState, useEffect } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setData(null);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return response.json();
      })
      .then((data: T) => {
        setIsLoading(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
