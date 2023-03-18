import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BasketballTeamEntity} from "./basketball-team.entity";
import {BasketballTeamService} from "./basketball-team.service";
import {BasketballTeamController} from "./basketball-team.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [BasketballTeamEntity]
        ),
    ],
    providers: [BasketballTeamService],
    exports: [BasketballTeamService],
    controllers: [BasketballTeamController]
})
export class BasketballTeamModule {
}