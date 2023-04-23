export interface IMovie {
    poster_url?: string;
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToCollection;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: Date;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    videos: Videos;
  }

  export enum OriginCountry {
    Us = "US",
  }
  
  export interface ProductionCountry {
    iso_3166_1: OriginCountry;
    name: string;
  }
  
  export interface SpokenLanguage {
    english_name: string;
    name: string;
  }

  export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: OriginCountry;
  }
  

  export interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  }

  

export interface Genre {
    id: number;
    name: string;
  }
  
 
  export interface Videos {
    results: Result[];
  }
  
  export interface Result {
    iso_3166_1: OriginCountry;
    name: string;
    key: string;
    size: number;
    official: boolean;
    published_at: Date;
    id: string;
  }
  