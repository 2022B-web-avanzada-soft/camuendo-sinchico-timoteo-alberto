import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class PlayerCreateDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsNotEmpty()
    @IsNumber()
    height: number;

    @IsNotEmpty()
    @IsString()
    birthDate: string;

}