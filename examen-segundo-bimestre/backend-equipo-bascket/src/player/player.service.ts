import {Injectable} from "@nestjs/common";
import {PlayerEntity} from "./player.entity";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource, FindManyOptions} from "typeorm";
import {PlayerCreateDto} from "./dto/player-create.dto";
import {PlayerUpdateDto} from "./dto/player-update.dto";

@Injectable()
export class PlayerService {

    constructor(@InjectDataSource() public datasource: DataSource) {
    }

    public playerRepository = this.datasource.getRepository(PlayerEntity);

    public find(options: FindManyOptions<PlayerEntity>) {
        return this.playerRepository.find(options);
    }

    public findOneById(id: number) {
        return this.playerRepository.findOne({
            where: {id: id},
        });
    }

    public create(player: PlayerCreateDto) {
        return this.playerRepository.save(player);
    }

    public update(playerUpdate: PlayerUpdateDto, id: number) {
        return this.playerRepository.save({...playerUpdate, id});
    }

    public delete(id: number) {
        return this.playerRepository.delete(id);
    }

}