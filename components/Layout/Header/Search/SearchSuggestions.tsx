import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
// import useSWR from "swr";
import Image from "next/image";
import { ISearch } from "../../../../models/common/search.model";
import { DateTime } from "luxon";

interface ISearchSuggestion {
  search: string;
}

function SearchSuggestions({ search }: ISearchSuggestion) {
  const router = useRouter();

  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [searchResult, setSearchResult] = useState<ISearch>();

  useEffect(() => {
    async function searchTerm(query: string) {
      const callApi = await fetch(`/api/search?query=${query}`);
      const getMovieResult: ISearch = await callApi.json();
      if (getMovieResult.results) {
        setSearchResult(getMovieResult);
      }
    }
    searchTerm(search);
  }, [search]);

  const searchForMoviesSeries = (type: string, id: number) => {
    if (type === "movies") {
      router.push(`/movies/${id}`);
    }
  };

  const showMovies = () => (
    <div>
      <div className="flex flex-col  ">
        {searchResult?.results &&
          searchResult.results
            .slice(0, 5)
            .filter((res) => res.media_type == "movie")
            .map((res, index) => {
              return (
                <div
                  key={index}
                  onClick={() => searchForMoviesSeries("movies", res.id)}
                  className="flex flex-row  rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300 mb-2"
                >
                  <Image
                    src={`${
                      res.poster_path
                        ? `${BASE_URL}${res.poster_path}`
                        : `/default-poster.svg`
                    }`}
                    width={50}
                    height={75}
                    alt={res.original_title || ""}
                    className="rounded-lg object-cover"
                  />
                  <div className="my-2">
                    <p className="mx-4  text-[#ffff]">{res.original_title}</p>
                    <div className="flex flex-row text-[#ffff] mx-4 space-x-2">
                      <div className="text-xs mt-1 font-thin">{res.vote_average}</div>
                      <div className="text-sm">
                       ({res?.release_date
                          ? DateTime.fromISO(res?.release_date || "").year
                          : ""})
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
  const showTVSeries = () => (
    <div className="mx-2">
      <div className="text-gray">Shows</div>
      <div className="flex flex-col md:flex-row">
        {searchResult?.results &&
          searchResult?.results
            .slice(0, 10)
            .filter((res) => res.media_type == "tv")
            .map((res, index) => {
              return (
                <div
                  key={index}
                  onClick={() => router.push(`/show/${res.id}`)}
                  className="mr-4  rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
                >
                  <Image
                    src={`${BASE_URL}${res.poster_path}`}
                    width={124}
                    height={175}
                    alt=""
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
              );
            })}
      </div>
    </div>
  );

  return (
    <div
      className={`absolute ${
        search.length === 0 ? "hidden" : ""
      } md:w-[400px] top-[150px] md:top-[95px] z-[1000]  flex flex-col  bg-[#070707] bg-opacity-70 py-5 px-3 rounded-lg transition ease-in-out delay-150`}
    >
      {showMovies()}
      {/* {showTVSeries()} */}
    </div>
  );
}

export default SearchSuggestions;
