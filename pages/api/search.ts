import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ISearch } from '../../models/common/search.model';
import { apiHandler } from '../../utils/api';
import createHttpError from 'http-errors';


const search: NextApiHandler<ISearch> = async (req, res) => {
    const { query } = req.query;
    if (!query)
        throw new createHttpError.NotFound(`Search 'query' is required`);
    if (query) {
        const result = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        );
        const search = await result.json();
        return res.status(200).json(search);
    }
};

export default apiHandler({
    GET: search
});