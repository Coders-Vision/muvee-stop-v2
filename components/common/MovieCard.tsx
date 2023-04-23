import { useEffect, useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiTwotoneStar } from "react-icons/ai";
import { Result } from "../../models/Home/popular.model";

type Props = {
  result: Result;
};

function MovieCard({ result }: Props) {
  const [showQuickDetails, setShowQuickDetails] = useState<boolean>(false);

  const BASE_URL = "https://image.tmdb.org/t/p/w300/";
  const router = useRouter();
  const movieCardRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pos, setPost] = useState<boolean>(false);

  const isMouseInBound = (): void => {
    const movieRefParentWidth =
      movieCardRef.current?.offsetParent?.clientWidth || 0;
    const tooltipRefBounds = tooltipRef.current!.getBoundingClientRect();

    console.log("Tooltip Right", tooltipRefBounds.right);
    console.log("Movie Card Parent", movieRefParentWidth);

    if (tooltipRefBounds.right < movieRefParentWidth) {
      setPost(true);
    } else {
      setPost(false);
    }
  };
  useEffect(() => {
    if (showQuickDetails) {
      isMouseInBound();
    }
  }, [showQuickDetails]);

  return (
    <div
      id="movieCardRef"
      className="relative"
      ref={movieCardRef}
      onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
        setShowQuickDetails(true);
      }}
      onMouseLeave={() => setShowQuickDetails(false)}
    >
      <div className="flex flex-col">
        <div
          className="min-h-[30vh] md:min-h-[25vh]  md:h-[250px] rounded-lg  shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
          onClick={() => router.push(`/movies/${result.id}`)}
        >
          <Image
            src={`${BASE_URL}${result.poster_path}`}
            fill
            alt="movie"
            className="rounded-lg md:object-cover"
          />
        </div>
        <div>
          <div className="my-2 text-center">{result.original_title}</div>
          <div className="font-thin text-center text-xs leading-none">
            {result.release_date?.toString()}
          </div>
        </div>
      </div>
      <div
        id="tooltipRef"
        ref={tooltipRef}
        // onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
        //   isMouseInBound(e);
        // }}
        className={`mx-4 z-[9999] absolute top-12 md:${
          pos ? "left-full" : "right-full"
        } bg-slate-800 w-[275px] h-[275px] rounded-lg overflow-auto ease-in-out transition-all duration-600 ${
          showQuickDetails ? "md:translate-x-0" : "hidden"
        }`}
      >
        <div className="m-2 flex flex-col">
          <h6 className="font-light m-2 text-left">{result.original_title}</h6>
          <div className="flex flex-row">
            <div className="m-2 inline-flex ">
              <AiTwotoneStar />
              <div className="text-xs mx-1"> {result.vote_average}</div>
            </div>
            <div className="m-2 inline-flex ">
              <div className="text-xs mx-1">
                {result.release_date?.toString()}
              </div>
            </div>
          </div>
          <div className="mt-1">
            <p className="text-gray-500 font-light m-2 text-sm select-none">
              {result?.overview?.slice(0, 250).concat("...") ?? ""}
            </p>
          </div>
          {/* <div className="mt-2">
            <button className="bg-green-700">View</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
