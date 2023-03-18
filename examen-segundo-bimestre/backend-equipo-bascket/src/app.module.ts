import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PlayerEntity} from "./player/player.entity";
import {BasketballTeamEntity} from "./basketball-team/basketball-team.entity";
import {PlayerModule} from "./player/player.module";
import {BasketballTeamModule} from "./basketball-team/basketball-team.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: './db/db.sqlite',
            entities: [PlayerEntity, BasketballTeamEntity],
            synchronize: true,
            dropSchema: false,
        }),
        PlayerModule,
        BasketballTeamModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
