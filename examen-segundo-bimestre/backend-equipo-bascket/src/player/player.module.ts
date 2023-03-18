import {Module} from "@nestjs/common";
import {PlayerController} from "./player.controller";
import {PlayerService} from "./player.service";
import {BasketballTeamService} from "../basketball-team/basketball-team.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PlayerEntity} from "./player.entity";
import {BasketballTeamEntity} from "../basketball-team/basketball-team.entity";

@Module({
    controllers: [PlayerController],
    providers: [PlayerService, BasketballTeamService],
    exports: [PlayerService],
    imports: [TypeOrmModule.forFeature(
        [PlayerEntity, BasketballTeamEntity], 'default'
    )]
})
export class PlayerModule {
}