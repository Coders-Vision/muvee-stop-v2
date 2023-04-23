import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
// import useSWR from "swr";
import Image from "next/image";

interface ISearchSuggestion {
  search: string;
}

function SearchSuggestions({ search }: ISearchSuggestion) {
  const router = useRouter();
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    async function searchTerm(query: string) {
      const callApi = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=6647e8ab73826ee5e42384b9dd72b92b&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const getMovieResult = await callApi.json();
      if (getMovieResult) {
        setResult(getMovieResult.results);
      }
    }
    searchTerm(search);
  }, [search]);

  const showMovies = () => (
    <div>
      <div className="flex flex-col  ">
        {result &&
          result
            .slice(0, 5)
            .filter((res) => res.media_type == "movie")
            .map((res, index) => {
              return (
                <div
                  key={index}
                  onClick={() => router.push(`/movies/${res.id}`)}
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
                    alt={res.original_title}
                    className="rounded-lg object-cover"
                  />
                  <div className="my-2">
                    <p className="mx-4  text-[#ffff]">{res.original_title}</p>
                    <div className="flex flex-row text-[#ffff] mx-4 ">
                      <div>{res.vote_average}</div>
                      <div>{res.release_date}</div>
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
        {result &&
          result
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
                    objectFit="cover"
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
