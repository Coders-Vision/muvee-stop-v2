import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "@components/Layout";
import { Person } from "@models/Person/person.model";
import { DateTime } from "luxon";
// import dynamic from "next/dynamic";

function index({
  person,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(person);
  return (
    <>
      <Head>
        <title>Muvee Stop | {person?.name}</title>
        <meta name="description" content={`${person.biography}`} />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <section className="">
          <div className="relative w-full h-[90vh]">
            <Image
              fill
              style={{ objectFit: "cover", objectPosition: "center left" }}
              alt="q"
              className="rounded-lg filter blur-lg absolute "
              src={`https://image.tmdb.org/t/p/original/${person.images.profiles[0].file_path}`}
            />
            <div className="absolute text-black top-3/4 left-1/2 -translate-y-1/2 -translate-x-1/2  md:left-[3vw] md:top-1/2  md:-translate-x-0  md:-translate-y-0">
              <div className="min-h-[175px] min-w-[125px] md:min-h-[30vh] md:min-w-[10vw] rounded-lg border-[3px] border-[#f9f9f9] border-opacity-80 shadow-2xl scale-105">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${person.images.profiles[0].file_path}`}
                  fill
                  alt="movie"
                  className="rounded-lg md:object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col md:flex-row">
          <div className="m-5 text-center md:text-left max-w-[850px]">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-semibold p-2">
              {person.name}
            </h1>
            <div className="mt-4">
              <p className="text-gray-500 text-[0.9rem] leading-[1.2rem]">
                {person.biography}
              </p>
            </div>
          </div>
          <div className="m-8 ">
            <h2 className="text-xl font-light mb-4">Personal Information</h2>
            <div className="space-x-3 overflow-y-scroll overflow-x-hidden scrollbar-hide p-2 -m-2 flex flex-col items-start max-h-[300px]">
              <div className="flex flex-col divide-y divide-gray-600 ">
                <div className="my-1 ">
                  <h4 className="font-bold text-left">Known For</h4>
                  <h6 className="font-thin text-left">
                    {person.known_for_department}
                  </h6>
                </div>
                <div className="my-1">
                  <h4 className="font-bold text-left">Gender</h4>
                  <h6 className="font-thin text-left">
                    {person.gender === 1
                      ? "Female"
                      : person.gender === 2
                      ? "Male"
                      : "Other"}
                  </h6>
                </div>
                <div className="my-1">
                  <h4 className="font-bold text-left">Birthday</h4>
                  <h6 className="font-thin text-left">
                    {DateTime.fromISO(person.birthday)
                      .toRelativeCalendar()
                      ?.toString()
                      .replace("ago", "old")}
                  </h6>
                </div>
                <div className="my-1">
                  <h4 className="font-bold text-left">Place of Birth</h4>
                  <h6 className="font-thin text-left">
                    {person.place_of_birth}
                  </h6>
                </div>
                <div className="my-1">
                  <h4 className="font-bold text-left">Also Known As</h4>
                  {person.also_known_as.map((name, index) => (
                    <h6 key={index} className="font-thin text-left">
                      {name}
                    </h6>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* {JSON.stringify(person)} */}
        </section>
      </Layout>
    </>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps<{
  person: Person;
}> = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  const [personRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images`
    ),
  ]);

  const person: Person = await personRes.json();

  return {
    props: {
      person,
    },
  };
};
