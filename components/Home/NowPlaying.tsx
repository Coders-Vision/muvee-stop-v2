// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import { INowPlaying } from "../../models/Home/nowPlaying.model";
// import Image from "next/image";

// const BANNER_URL = "https://image.tmdb.org/t/p/original/";

// type Props = {
//   nowPlaying: INowPlaying;
// };

// function NowPlaying({ nowPlaying }: Props) {
//   const slideShowImages =
//     nowPlaying &&
//     nowPlaying.results.slice(0, 6).map((now, index) => {
//       return (
//         <div
//           key={index}
//           className="bg-gradient-to-r from-slate-500 to-slate-800  "
//         >
//           <Image
//             loading="lazy"
//             // className=" object-cover md:h-[40rem] hover:cursor-move  w-screen bg-cover mix-blend-overlay "
//             className="object-cover md:h-[40rem] hover:cursor-move w-max bg-cover cursor-grab"
//             src={`${BANNER_URL}${now.backdrop_path}`}
//             alt={`${now.original_title}`}
//             width={1280}
//             height={10}
//           />
//           <div className="absolute top-1/2 mx-3 text-gray-300">
//             <h1 className="font-bold text-left text-xl md:text-5xl leading-5">
//               {now?.title}
//             </h1>
//             <div className="flex space-x-3 md:mt-2 text-[.8rem]">
//               <div className="">{now?.vote_average}</div>
//               {/* <div className="">{now?.release_date.slice(0, 4) ?? ""}</div>
//                 <div className="">{now?.runtime}</div> */}
//             </div>
//             <div className="md:mt-2 md:w-3/4">
//               <p className="hidden md:block text-xs text-left md:text-xl ">
//                 {now?.overview.slice(0, 150).concat("...") ?? ""}
//               </p>
//             </div>
//           </div>
//         </div>
//       );
//     });

//   return (
//     <section className="relative shadow-2xl  mx-auto">
//       <Carousel
//         autoPlay
//         infiniteLoop
//         showStatus={false}
//         showIndicators={true}
//         showArrows={false}
//         showThumbs={false}
//         interval={5000}
//         emulateTouch={true}
//       >
//         {slideShowImages}
//       </Carousel>
//     </section>
//   );
// }

// export default NowPlaying;


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { INowPlaying } from "../../models/Home/nowPlaying.model";
import Image from "next/image";
import { useState } from "react";

const BANNER_URL = "https://image.tmdb.org/t/p/original/";

type Props = {
  nowPlaying: INowPlaying;
};

function NowPlaying({ nowPlaying }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const slideShowImages =
    nowPlaying &&
    nowPlaying.results.slice(0, 6).map((now, index) => {
      return (
        <div
          key={index}
          className="bg-gradient-to-r from-slate-700 to-slate-800"
        >
          <div
            className="relative aspect-w-16 aspect-h-9"
            // style={{ minHeight: "40rem" }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
            <Image
              loading="lazy"
              className={`object-cover w-full h-full ${
                isLoading ? "hidden" : ""
              }`}
              src={`${BANNER_URL}${now.backdrop_path}`}
              alt={`${now.original_title}`}
              width={1280}
              height={720}
              onLoadingComplete={handleImageLoad}
            />
          </div>
          <div className="absolute top-1/2 mx-3 text-gray-300">
            <h1 className="font-bold text-left text-xl md:text-5xl leading-5">
              {now?.title}
            </h1>
            <div className="flex space-x-3 md:mt-2 text-[.8rem]">
              <div>{now?.vote_average}</div>
              {/* <div>{now?.release_date.slice(0, 4) ?? ""}</div>
                <div>{now?.runtime}</div> */}
            </div>
            <div className="md:mt-2 md:w-3/4">
              <p className="hidden md:block text-xs text-left md:text-xl ">
                {now?.overview.slice(0, 150).concat("...") ?? ""}
              </p>
            </div>
          </div>
        </div>
      );
    });

  return (
    <section className="relative shadow-2xl mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        showArrows={false}
        showThumbs={false}
        interval={5000}
        emulateTouch={true}
      >
        {slideShowImages}
      </Carousel>
    </section>
  );
}

export default NowPlaying;
