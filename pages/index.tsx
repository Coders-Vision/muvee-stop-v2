import Head from "next/head";
import Layout from "@components/Layout";
import { Inter } from "@next/font/google";
import NowPlaying from "@components/Home/NowPlaying";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import TrendingMovies from "@components/Home/TrendingMovies";
import { INowPlaying } from "@models/Home/nowPlaying.model";
import { IPopular } from "@models/Home/popular.model";
// import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ["latin"] });

function Page({
  nowPlaying,
  popularMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps | any>) {
  return (
    <>
      <Head>
        <title>Muvee Stop | Search Movies for Free</title>
        <meta
          name="description"
          content="Search online movies for free, search movies free without registration. Just a better place for searching movies online for free. "
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <NowPlaying nowPlaying={nowPlaying} />
        <TrendingMovies popularMovies={popularMovies} />
      </Layout>
    </>
  );
}
export default Page;

export const getServerSideProps: GetServerSideProps<{
  nowPlaying: INowPlaying;
  popularMovies: IPopular;
}> = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`
  );
  const resPop = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  );

  const nowPlaying: INowPlaying = await res.json();
  const popularMovies: IPopular = await resPop.json();
  return {
    props: {
      nowPlaying,
      popularMovies,
    },
  };
};
