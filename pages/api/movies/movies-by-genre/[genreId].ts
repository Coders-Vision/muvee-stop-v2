import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { apiHandler } from '../../../../utils/api';
import { IMoviesByGenre } from '../../../../models/Movies/movies-by-genre.model';

const getMoviesByGenreId: NextApiHandler<IMoviesByGenre> = async (req, res) => {
    const { genreId } = req.query;
    if (!genreId)
        throw new createHttpError.NotFound(`Genre ID  is required`);
    if (genreId) {
        const result = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${process.env.TMDB_API_KEY}&language=en_US&page=1`
        );
        const moviesByGenre = await result.json();
        return res.status(200).json(moviesByGenre);
    }
};

export default apiHandler({
    GET: getMoviesByGenreId
});