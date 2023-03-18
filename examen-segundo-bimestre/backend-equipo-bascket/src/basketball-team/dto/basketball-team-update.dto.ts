import {IsBoolean, IsDate, IsNumber, IsOptional, IsString} from "class-validator";

export class BasketballTeamUpdateDto{

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsDate()
    creationDate: string;

    @IsOptional()
    @IsBoolean()
    professional: boolean;

    @IsOptional()
    @IsNumber()
    championshipWins: number;

    @IsOptional()
    @IsString()
    trainer: string;
}