import axios from 'axios';
import { IGenreList } from '../models/common/genreList.model';
const config = {
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
    }
};

const client = axios.create(config);


export const getGenreList = async ():Promise<IGenreList> => {
    const res = await client.get(`/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en_US&page=1`)
    return res.data
}
