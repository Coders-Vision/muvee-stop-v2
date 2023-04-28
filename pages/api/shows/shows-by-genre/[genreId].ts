import type { NextApiHandler } from 'next';
import createHttpError from 'http-errors';
import { apiHandler } from '@utils/api';
import { IShowsByGenre } from '@models/Shows/shows-by-genre.model';

const getShowsByGenreId: NextApiHandler<IShowsByGenre> = async (req, res) => {
    const { genreId } = req.query;
    if (!genreId)
        throw new createHttpError.NotFound(`Genre ID  is required`);
    if (genreId) {
        const result = await fetch(
            `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&api_key=${process.env.TMDB_API_KEY}&language=en_US&page=1`
        );
        const showsByGenre = await result.json();
        return res.status(200).json(showsByGenre);
    }
};

export default apiHandler({
    GET: getShowsByGenreId
});