import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from "@nestjs/common";
import {BasketballTeamService} from "./basketball-team.service";
import {FindManyOptions, FindOptionsWhere} from "typeorm";
import {BasketballTeamEntity} from "./basketball-team.entity";
import {BasketballTeamUpdateDto} from "./dto/basketball-team-update.dto";
import {validate} from "class-validator";

@Controller('basketball-team')
export class BasketballTeamController {

    constructor(private readonly basketballTeamService: BasketballTeamService) {
    }

    @Get('/')
    @HttpCode(200)
    find(@Query() queryParams) {
        const query: FindManyOptions<BasketballTeamEntity> = {
            relations: ['players'],
            skip: queryParams.skip ? +queryParams.skip : 0,
            take: queryParams.take ? +queryParams.take : 10,
        };

        const queryWhere = [] as FindOptionsWhere<BasketballTeamEntity>[];

        if (queryWhere.length > 0) {
            query.where = queryWhere;
        }

        return this.basketballTeamService.find(query);
    }

    @Get('/:id')
    @HttpCode(200)
    findOneById(@Param() params) {
        return this.basketballTeamService.findOneById(+params.id);
    }

    @Post('/')
    @HttpCode(201)
    async create(@Body() bodyParams) {
        return this.basketballTeamService.create(bodyParams)
    }

    @Put('/:id')
    @HttpCode(200)
    async update(@Param() params, @Body() bodyParams) {
        const updatedBasketballTeam = new BasketballTeamUpdateDto();

        updatedBasketballTeam.name = bodyParams.name;
        updatedBasketballTeam.championshipWins = bodyParams.championshipWins;
        updatedBasketballTeam.creationDate = bodyParams.creationDate;
        updatedBasketballTeam.trainer = bodyParams.trainer;
        updatedBasketballTeam.professional = bodyParams.professional;

        const errors = await validate(updatedBasketballTeam);

        if (errors.length > 0) {
            console.error({errors});
            throw new BadRequestException({message: 'Wrong data'});
        }

        return this.basketballTeamService.update(bodyParams, +params.id);
    }

    @Delete("/:id")
    @HttpCode(200)
    delete(@Param() params) {
        return this.basketballTeamService.delete(+params.id);
    }

}