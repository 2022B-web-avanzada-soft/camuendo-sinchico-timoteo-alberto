import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource, FindManyOptions} from "typeorm";
import {BasketballTeamEntity} from "./basketball-team.entity";
import {BasketballTeamCreateDto} from "./dto/basketball-team-create.dto";
import {BasketballTeamUpdateDto} from "./dto/basketball-team-update.dto";

@Injectable()
export class BasketballTeamService {

    constructor(@InjectDataSource() public datasource: DataSource) {
    }

    public basketballTeam = this.datasource.getRepository(BasketballTeamEntity);

    public find(options: FindManyOptions<BasketballTeamEntity>) {
        return this.basketballTeam.find(options);
    }

    public findOneById(id: number) {
        return this.basketballTeam.findOne({
            where: {id: id},
        });
    }

    public create(basketballTeam: BasketballTeamCreateDto) {
        return this.basketballTeam.save(basketballTeam);
    }

    public update(basketballTeamUpdate: BasketballTeamUpdateDto, id: number) {
        return this.basketballTeam.save({...basketballTeamUpdate, id});
    }

    public delete (id: number){
        return this.basketballTeam.delete(id);
    }
}