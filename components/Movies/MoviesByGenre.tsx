import { Result } from "@models/Home/popular.model";
import { IMoviesByGenre } from "@models/Movies/movies-by-genre.model";
import MovieCard from "../common/MovieCard";

type Props = {
  moviesByGenre: IMoviesByGenre;
};

function MoviesByGenre({ moviesByGenre }: Props) {
  const MoviesList =
    moviesByGenre &&
    moviesByGenre.results.map((movie) => {
      return <MovieCard key={movie.id} result={movie as unknown as Result} />;
    });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
      {MoviesList}
    </div>
  );
}

export default MoviesByGenre;
