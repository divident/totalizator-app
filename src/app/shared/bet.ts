export class Bet {
    id: number;
    created_date: Date;
    price: number;
    match: number;
    player: number;
    picked_team: string;
    reward: number;
    status: number;
};

export enum BetStatus {
    PENDING = 0,
    WIN = 1,
    LOSE = 2
};
