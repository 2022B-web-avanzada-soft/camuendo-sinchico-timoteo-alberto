import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from "@nestjs/common";
import {PlayerService} from "./player.service";
import {PlayerUpdateDto} from "./dto/player-update.dto";
import {validate} from "class-validator";
import {PlayerCreateDto} from "./dto/player-create.dto";

@Controller('player')
export class PlayerController {

    constructor(
        private readonly playerService: PlayerService,
    ) {
    }

    @Get('/')
    @HttpCode(200)
    async find(@Query() queryParams) {
        return this.playerService.find({relations: ['basketballTeam']});
    }

    @Get('/:id')
    @HttpCode(200)
    async findOneById(@Param() params) {
        return this.playerService.findOneById(+params.id);
    }

    @Post('/')
    @HttpCode(201)
    async create(@Body() bodyParams) {
        const createdPlayer = new PlayerCreateDto();

        createdPlayer.name = bodyParams.name;
        createdPlayer.age = bodyParams.age;
        createdPlayer.birthDate = bodyParams.birthDate;
        createdPlayer.height = bodyParams.height;
        createdPlayer.weight = bodyParams.weight;

        const errors = await validate(createdPlayer);

        if (errors.length > 0) {
            console.error({errors});
            throw new BadRequestException({message: 'Wrong data'});
        }

        return this.playerService.create(bodyParams);
    }

    @Put('/:id')
    @HttpCode(200)
    async update(@Param() params, @Body() bodyParams) {
        const updatedPlayer = new PlayerUpdateDto();

        updatedPlayer.name = bodyParams.name;
        updatedPlayer.age = bodyParams.age;
        updatedPlayer.birthDate = bodyParams.birthDate;
        updatedPlayer.height = bodyParams.height;
        updatedPlayer.weight = bodyParams.weight;

        const errors = await validate(updatedPlayer);

        if (errors.length > 0) {
            console.error({errors});
            throw new BadRequestException({message: 'Wrong data'});
        }

        return this.playerService.update(bodyParams, +params.id);
    }

    @Delete('/:id')
    @HttpCode(200)
    delete(@Param() params) {
        return this.playerService.delete(+params.id);
    }

}