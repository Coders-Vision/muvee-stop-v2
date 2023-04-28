import { Result } from "@models/Shows/shows-by-genre.model";
import { IShowsByGenre } from "@models/Shows/shows-by-genre.model";
import ShowCard from "../common/ShowCard";

type Props = {
    showsByGenre: IShowsByGenre ;
};

function ShowsByGenre({ showsByGenre }: Props) {
  const ShowsList =
    showsByGenre &&
    showsByGenre.results.map((show) => {
      return <ShowCard  key={show.id} result={show as unknown as Result} />;
    });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
      {ShowsList}
    </div>
  );
}

export default ShowsByGenre
