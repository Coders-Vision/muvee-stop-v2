export interface Person {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: null;
    gender: number;
    homepage: null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
    images: Images;
}

export interface Images {
    profiles: Profile[];
}

export interface Profile {
    aspect_ratio: number;
    height: number;
    iso_639_1: null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}
