import { useMemo, useState } from "react";
import SearchInput from "./components/SearchInput";
import useFetch from "./hooks/useFetch";
import Loading from "./components/Loading";
import Card from "./components/Card";
import Toggle from "./components/Toggle";

function App() {
  const [searchTerms, setSearchTerms] = useState("");
  const [allTags, setAllTags] = useState(true);

  // Construct the search params based on the search terms and allTags state
  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    params.append("format", "json");
    params.append("nojsoncallback", "1");
    params.append("tagmode", allTags ? "all" : "any");
    if (searchTerms) {
      params.append("tags", searchTerms);
    }
    return params;
  }, [allTags, searchTerms]);

  const { data, isLoading, error } = useFetch<FlickrData>(
    `/images?${searchParams.toString()}`,
  );

  return (
    <div className="container p-2 flex flex-col">
      <header>
        <h1 className="font-bold text-3xl">RangeMe Flickr</h1>
      </header>
      <div className="min-h-16 flex w-full gap-2 sticky top-0 z-10 bg-white py-2">
        <SearchInput onChange={setSearchTerms} />
        <Toggle
          trueLabel="ALL"
          falseLabel="OR"
          defaultValue={allTags}
          onChange={setAllTags}
        />
      </div>
      {isLoading && (
        <div
          className="flex justify-center items-center flex-1"
          aria-label="searching"
        >
          <Loading />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center flex-1">
          Error: {error}
        </div>
      )}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          {data?.items.map((item) => <Card key={item.link} image={item} />)}
        </div>
      )}
    </div>
  );
}

export default App;
