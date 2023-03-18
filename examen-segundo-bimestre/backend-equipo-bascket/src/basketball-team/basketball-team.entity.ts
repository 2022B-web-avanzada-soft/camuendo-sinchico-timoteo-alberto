import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PlayerEntity} from "../player/player.entity";

@Entity('basketball-team')
export class BasketballTeamEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column({
        name: 'name',
        type: 'text',
        length: 60,
        nullable: false
    })
    name: string;

    @Column({
        name: 'trainer',
        type: 'text',
        length: 60,
        nullable: false
    })
    trainer: string;

    @Column({
        name: 'creationDate',
        type: 'text',
        nullable: false
    })
    creationDate: string;

    @Column({
        name:'professional',
        type: 'integer',
        nullable: false
    })
    professional: boolean;

    @Column({
        name: 'championshipWins',
        type: 'integer',
        nullable: false
    })
    championshipWins: number;

    @OneToMany(
        () => PlayerEntity, //Entidad hija
        (instancePlayerEntity) =>
            instancePlayerEntity.basketballTeam) //Campo relacional
    players:PlayerEntity[];

}