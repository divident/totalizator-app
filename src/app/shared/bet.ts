import { Match } from "./match";

export class Bet {
    id: number;
    created_date: Date;
    price: number;
    player: number;
    picked_team: string;
    reward: number;
    status: number;
    match_id: number;
    match: Match;
};

export enum BetStatus {
    PENDING = 0,
    WIN = 1,
    LOSE = 2
};
