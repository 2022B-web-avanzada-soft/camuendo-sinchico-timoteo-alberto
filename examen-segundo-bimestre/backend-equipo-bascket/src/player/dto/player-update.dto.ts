import { IsNumber, IsOptional, IsString} from "class-validator";

export class PlayerUpdateDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    age: number;

    @IsOptional()
    @IsNumber()
    weight: number;

    @IsOptional()
    @IsNumber()
    height: number;

    @IsOptional()
    @IsString()
    birthDate: string;

}