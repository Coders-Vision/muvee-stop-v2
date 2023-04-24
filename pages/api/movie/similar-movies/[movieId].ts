import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { apiHandler } from '../../../../utils/api';

import { ISimilarMovies } from '../../../../models/Movie/similar-movie.model';


const getSimilarMovies: NextApiHandler<ISimilarMovies> = async (req, res) => {
    const { movieId} = req.query;
    if (!movieId)
        throw new createHttpError.NotFound(`Movie ID  is required`);
    if (movieId) {
        const result = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        const search = await result.json();
        return res.status(200).json(search);
    }
};

export default apiHandler({
    GET: getSimilarMovies
});