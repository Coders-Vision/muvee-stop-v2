import { IPopular } from "../../models/Home/popular.model";
import MovieCard from "../common/MovieCard";

type Props = {
  popularMovies: IPopular;
};

function TrendingMovies({ popularMovies }: Props) {
  const MoviesList =
    popularMovies &&
    popularMovies.results.map((movie) => {
      return <MovieCard key={movie.id} result={movie} />;
    });

  return (
    <section className="relative space-y-2 my-10 px-6 ">
      <h2 className="font-semibold">Trending</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {MoviesList}
      </div>
    </section>
  );
}

export default TrendingMovies;
