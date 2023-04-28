import type { NextApiHandler} from 'next';
import createHttpError from 'http-errors';
import { apiHandler } from '@utils/api';

import { ISimilarShows } from '@models/Show/similar-show.model';


const getSimilarShows: NextApiHandler<ISimilarShows> = async (req, res) => {
    const { showId} = req.query;
    if (!showId)
        throw new createHttpError.NotFound(`Show ID  is required`);
    if (showId) {
        const result = await fetch(
            `https://api.themoviedb.org/3/tv/${showId}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        const search = await result.json();
        return res.status(200).json(search);
    }
};

export default apiHandler({
    GET: getSimilarShows
});