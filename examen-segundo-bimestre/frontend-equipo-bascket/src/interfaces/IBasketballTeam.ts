import {IPlayer} from "@/interfaces/IPlayer";

export interface IBasketballTeam {
    id: number;
    name: string;
    trainer: string;
    creationDate: string;
    professional: number | boolean
    championshipWins: number;
    players: IPlayer[];
}