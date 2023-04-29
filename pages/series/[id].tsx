import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@components/Layout";
import { HiPlus, HiX } from "react-icons/hi";
import dynamic from "next/dynamic";
import { IShow } from "@models/Show/show.model";
import { ICredit } from "@models/Show/cast.model";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ISimilarShows} from "@models/Show/similar-show.model";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function Show({
  show,
  credit,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<ISimilarShows>(`/api/show/similar-shows/${id}`, (apiURL: string) =>
    fetch(apiURL).then((res) => res.json())
  );

  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const player = () => {
    return (
      <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
    );
  };
  const index = show.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );

  const BASE_URL = "https://image.tmdb.org/t/p/w1280/";
  return (
    <>
      <Head>
        <title>Muvee Stop | {show?.name}</title>
        <meta name="description" content={`${show.overview}`} />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <section className=" relative z-50 bg-gradient-to-r from-gray-800 to-gray-400  ">
          <div className="relative min-h-[calc(100vh-72px)] mix-blend-overlay ">
            <Image
              src={`${BASE_URL}${show.backdrop_path}`}
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50  mt-16 md:m-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
              {show.name}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]">
                <span className="uppercase font-medium tracking-wide">
                  Play
                </span>
              </button>
              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                onClick={() => setShowPlayer(true)}
              >
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>
              <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                <HiPlus className="h-6" />
              </div>
            </div>
            <p className="text-xs md:text-sm">
              {`${show.first_air_date} . ${show.genres.map(
                (genre) => `${genre.name} `
              )}`}
            </p>
            <h4 className="text-sm md:text-lg max-w-4xl">{show.overview}</h4>
          </div>
          {showPlayer && player()}
          <div
            className={`absolute top-[20vh] inset-x-[7%] md:inset-x-[13%] rounded overflow-hiden transition duration-1000 ${
              showPlayer ? "opacity-100 z-50" : "opacity-0"
            }`}
          >
            <div className=" flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold">Play Trailer</span>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0f0f0f]"
                onClick={() => setShowPlayer(false)}
              >
                <HiX className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${show.videos?.results[index]?.key}`}
                width="100%"
                height="100%"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: "1000",
                }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        </section>

        <section className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Cast</h2>
          <div className="flex space-x-3 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2">
            {credit.cast.map((castMember, index) => (
              <div className="flex flex-col justify-around" key={index}>
                <div
                  className="flex min-w-[100px] min-h-[90px] md:min-w-[100px] md:min-h-[100px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[2px] border-[#f9f9f9] border-opacity-10 hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
                  onClick={() => router.push(`/person/${castMember.id}`)}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${
                      castMember?.profile_path || "/default-poster.svg"
                    }`}
                    width={100}
                    height={100}
                    className="rounded-lg"
                    alt={castMember.name || castMember.character}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[0.8rem] leading-[0.9rem]">
                    {castMember.name}
                  </h3>
                  <p className="text-gray-500 text-[0.8rem] leading-[1.2rem] text-ellipsis">
                    {castMember.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* <section>
          {show.seasons.map((show,index)=>(
          <>
            <h1>{show.name}</h1>
            <p>{show.overview}</p>
    <p>{show.episode_count}</p>
          </>
          ))}
        </section> */}

        <section className="realtive flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
          <h2 className="font-semibold">Similar shows</h2>
          <div className="flex space-x-3 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2">
            {data?.results.map((show, index) => (
              <div className="flex flex-col  justify-around" key={index}>
                <div
                  className="flex min-w-[100px] min-h-[90px] md:min-w-[100px] md:min-h-[100px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[2px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
                  onClick={() => router.push(`/series/${show.id}`)}
                >
                  <Image
                    src={`${
                      show?.poster_path
                        ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
                        : "/default-poster.svg"
                    }`}
                    width={100}
                    height={100}
                    className="rounded-lg"
                    alt={show.name}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[0.8rem] leading-[0.9rem]">
                    {show.name}
                  </h3>
                  <p className="text-gray-500 text-[0.8rem] leading-[1.2rem]">
                    {show.first_air_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Show;

export const getServerSideProps: GetServerSideProps<{
  show: IShow;
  credit: ICredit;
}> = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  const [showRes, creditRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=videos`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API_KEY}`
    ),
  ]);

  const show: IShow = await showRes.json();
  const credit: ICredit = await creditRes.json();

  return {
    props: {
      show: { ...show, poster_url: process.env.TMDB_URL_POSTER },
      credit,
    },
  };
};

