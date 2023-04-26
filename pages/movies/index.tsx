import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/Layout";
import GenreButton from "../../components/common/Buttons/GenreButton";
import useSWR from "swr";
import { IGenreList } from "../../models/common/genreList.model";
import Loader from "../../components/common/Loaders/Loader";
import { IMoviesByGenre } from "../../models/Movies/movies-by-genre.model";
import MoviesByGenre from "../../components/Movies/MoviesByGenre";

function Movies() {
  const [genreId, setGenreId] = useState<number>(28);
  const genreList = useSWR<IGenreList>(`/api/genre-list`, (apiURL: string) =>
    fetch(apiURL).then((res) => res.json())
  );
  const moviesByGenre = useSWR<IMoviesByGenre>(
    `/api/movies/movies-by-genre/${genreId}`,
    (apiURL: string) => fetch(apiURL).then((res) => res.json())
  );
  return (
    <>
      <Head>
        <title>Muvee Stop | Movies</title>
        <meta name="description" content="" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout headerClasses="block">
        <section className="realtive flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
          <h2 className="font-semibold">Select a Genre</h2>
          {genreList.isLoading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="flex space-x-3 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2">
              {genreList.data?.genres.map((genre) => (
                <GenreButton
                  btnProps={{
                    onClick: () => setGenreId(genre.id),
                  }}
                  activeClass={`${
                    genreId === genre.id
                      ? "text-white font-bold border-teal-600"
                      : ""
                  }`}
                  key={genre.id}
                  btnTitle={genre.name}
                />
              ))}
            </div>
          )}
        </section>
        <section className="realtive space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
          <h2 className="font-semibold">Movies By Genre</h2>
          {moviesByGenre.isLoading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <MoviesByGenre moviesByGenre={moviesByGenre.data!} />
          )}
        </section>
      </Layout>
    </>
  );
}

export default Movies;
