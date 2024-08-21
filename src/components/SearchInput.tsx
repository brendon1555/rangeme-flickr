import { useEffect, useRef, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import Cross from "./Cross";

interface SearchInputProps {
  onChange: (value: string) => void;
}

const SearchInput = ({ onChange }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchTerms, setSearchTerms] = useState("");
  const debouncedSearchTerms = useDebounce(searchTerms, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(e.target.value);
  };

  // Clear the search terms and refocus the input
  const clearSearch = () => {
    setSearchTerms("");
    inputRef.current?.focus();
  };

  // Call the parent onChange function with the debounced search terms
  useEffect(() => {
    onChange(debouncedSearchTerms);
  }, [debouncedSearchTerms, onChange]);

  return (
    <div className="flex-1 bg-white shadow border rounded-lg p-2 focus-within:outline outline-1 flex items-center">
      <input
        aria-label="Search"
        ref={inputRef}
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={searchTerms}
        className="w-full h-full outline-none font-medium"
        autoFocus
      />
      <button onClick={clearSearch} title="Clear Input">
        <Cross />
      </button>
    </div>
  );
};

export default SearchInput;
