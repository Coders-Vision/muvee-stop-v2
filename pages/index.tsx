import Head from "next/head";
import Layout from "@components/Layout";
import { Inter } from "@next/font/google";
import NowPlaying from "@components/Home/NowPlaying";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import TrendingMovies from "@components/Home/TrendingMovies";
import { INowPlaying } from "@models/Home/nowPlaying.model";
import { IPopular } from "@models/Home/popular.model";
import SEOTags from "@components/common/SEOTags";
// import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ["latin"] });

function Page({
  nowPlaying,
  popularMovies,
  domainUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps | any>) {
  return (
    <>
      <Head>
        <title>Muvee Stop | Search Movies for Free</title>
        <SEOTags
          // title="Muvee Stop | Search Movies for Free"
          description={`Search online movies for free, search movies free without registration.Just a better place for searching movies online for free.`}
          keywords={`muvee stop, muvee, search movies, online movie, movie online, search movies online, search movies online free, hd movies, search movies online,`}
          ogTitle={"Muvee Stop | Search Movies for Free"}
          ogDescription={
            "Search online movies for free, search movies free without registration.Just a better place for searching movies online for free. Muvee Stop, muvee.stop, muvee stop."
          }
          ogImage={`${domainUrl}/images/og-image.png`}
          ogType={`website`}
          twitterTitle={`Muvee Stop | Search Movies for Free`}
          twitterDescription={`Search online movies for free, search movies free without registration.Just a better place for searching movies online for free. Muvee Stop, muvee.stop, muvee stop.`}
          twitterImage={`${domainUrl}/images/og-image.png`}
        />
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
}> = async (context) => {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
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
      domainUrl: `${protocol}://${context.req.headers.host}`,
    },
  };
};
