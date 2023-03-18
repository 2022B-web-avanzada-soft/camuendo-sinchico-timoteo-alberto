import {IsNotEmpty, IsNumber, IsString, IsDate, IsBoolean} from "class-validator";

export class BasketballTeamCreateDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDate()
    creationDate: string;

    @IsNotEmpty()
    @IsBoolean()
    professional: boolean;

    @IsNotEmpty()
    @IsNumber()
    championshipWins: number;

    @IsNotEmpty()
    @IsString()
    trainer: string;

}