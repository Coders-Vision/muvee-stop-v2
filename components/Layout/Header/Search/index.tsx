import React, { useState } from "react";
import SearchSuggestions from "./SearchSuggestions";

type Props = {
  showSearch: boolean;
};

function Search({ showSearch=true }: Props) {
  const [search, setSearch] = useState("");

  return (
    <div className={`md:block ${showSearch ? "block" : "hidden"}`}>
      <input
        className="my-5 md:mx-4 md:my-4 w-full bg-white text-white bg-opacity-0 backdrop-blur-sm   border border-gray-300 rounded-full text-white-600 h-12 md:h-10  pl-5 pr-10  hover:border-white-400 focus:outline-none appearance-none"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchSuggestions search={search} />
    </div>
  );
}

export default Search;
