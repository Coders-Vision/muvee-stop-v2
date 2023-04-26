import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../utils/api';
import createHttpError from 'http-errors';
import { IGenreList } from '../../models/common/genreList.model';


const getGenreList: NextApiHandler<IGenreList> = async (req, res) => {
    const result = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en_US&page=1`
    );
    const genreList = await result.json();
    return res.status(200).json(genreList);
};

export default apiHandler({
    GET: getGenreList
});