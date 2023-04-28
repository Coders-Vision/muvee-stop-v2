export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: null | string;
    character: string;
    credit_id: string;
    order: number;
}

export interface ICredit {
    id: number;
    cast: Cast[];
    // crew: any[];
}