import { Match } from "./match";

export class Bet {
    id: number;
    created_date: Date;
    price: number;
    player: number;
    picked_team: number;
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

export function getTeamName(index: number) {
    let pickedTeamName: string[] = ["Zespół pierwszy", "Zespół drugi", "Remis"];
    if(0 > index || index > 2) return ""
    return pickedTeamName[index];
}
