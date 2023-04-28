import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../utils/api';
import createHttpError from 'http-errors';
import { IGenreList } from '../../models/common/genreList.model';


enum Media {
    Movie = 'movie',
    TV = 'tv'
}

const getGenreList: NextApiHandler<IGenreList> = async (req, res) => {
    const { media } = req.query;
    if (!media)
        throw new createHttpError.NotFound(`Media is required`);
    if (!Object.values(Media).includes(media as Media))
        throw new createHttpError.BadRequest(`Invalid query for media: ${media}, should be of type 'movie' or 'tv'`);

    const result = await fetch(
        `https://api.themoviedb.org/3/genre/${media}/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const genreList = await result.json();
    return res.status(200).json(genreList);
};

export default apiHandler({
    GET: getGenreList
});