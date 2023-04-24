import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/Layout";
import GenreButton from "../../components/common/GenreButton";
import useSWR from "swr";
import { getGenreList } from "../../services/client";
import { IGenreList } from "../../models/common/genreList.model";

function Movies() {
  const { data, error, isLoading } = useSWR<IGenreList>(getGenreList);

  if (error) return <div>Failed to fetch users.</div>;
  if (isLoading) return <h2>Loading...</h2>;

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
        <h1>Movies Page</h1>
        {data?.genres.map((genre) => (
          <GenreButton key={genre.id} />
        ))}
      </Layout>
    </>
  );
}

export default Movies;
