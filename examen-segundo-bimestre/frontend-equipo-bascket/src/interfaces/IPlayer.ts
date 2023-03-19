import { IBasketballTeam } from './IBasketballTeam';
export interface IPlayer {
    id: number;
    name: string;
    age: number;
    weight: number;
    height: number;
    birthDate: string;
    basketballTeam: IBasketballTeam;
}