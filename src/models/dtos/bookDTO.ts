export interface BookDTO {
    id: number;
    name: string;
    score?: number;
}

export interface UserBooksDTO {
    past: PastBookDTO[];
    present: PresentBookDTO[];
}
export interface PastBookDTO {
    name: string;
    userScore: number;
}

export interface PresentBookDTO {
    name: string;
}