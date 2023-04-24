export interface ISearch {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export interface Result {
    adult: boolean;
    backdrop_path: null | string;
    id: number;
    name?: string;
    original_language: string;
    original_name?: string;
    overview: string;
    poster_path: string;
    media_type: MediaType;
    genre_ids: number[];
    popularity: number;
    first_air_date?: Date;
    vote_average: number;
    vote_count: number;
    origin_country?: string[];
    title?: string;
    original_title?: string;
    release_date?: string;
    video?: boolean;
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
}
