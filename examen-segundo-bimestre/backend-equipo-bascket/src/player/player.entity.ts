import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BasketballTeamEntity} from "../basketball-team/basketball-team.entity";

@Entity('player')
export class PlayerEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'name',
        type: 'text',
        length: 60,
        nullable: false
    })
    name: string;

    @Column({
        name: 'age',
        type: 'integer',
        nullable: false
    })
    age: number;

    @Column({
        name: 'weight',
        type: 'real',
        nullable: false
    })
    weight: number;

    @Column({
        name: 'height',
        type: 'real',
        nullable: false
    })
    height: number;

    @Column({
        name: 'birthDate',
        type: 'text',
        nullable: false
    })
    birthDate: string;

    @ManyToOne(
        ()=> BasketballTeamEntity, //Entidad papá
        (instanceBasketBallTeamEntity)=>//campo relacional
            instanceBasketBallTeamEntity.players,
        {nullable: false}
    )
    basketballTeam:BasketballTeamEntity;

}