import {Header} from "@/components/layout/Header";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "@/styles/Team.module.css";
import axios from "axios";
import {baseUrl} from "@/environments/apiBaseUrl";
import {IPlayer} from "@/interfaces/IPlayer";
import {IBasketballTeam} from "@/interfaces/IBasketballTeam";


const editPlayer = ({player, teams}: { player: IPlayer, teams: IBasketballTeam[] }) => {

    const [playerForm, setPlayerForm] = useState<IPlayer>(
        {
            id: player.id,
            name: player.name,
            age: player.age,
            height: player.height,
            weight: player.weight,
            birthDate: player.birthDate,
            basketballTeam: player.basketballTeam
        }
    );

    const basketballTeamIds = teams.map((team) => team.id);
    const selectedBasketballTeamId = basketballTeamIds.includes(playerForm.basketballTeam.id)
        ? playerForm.basketballTeam.id
        : '';

    const handleInputChange = (event: any) => {
        console.log(event.target.value)
        setPlayerForm({
            ...playerForm,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const player = {
            id: playerForm.id,
            name: playerForm.name,
            age: playerForm.age,
            height: playerForm.height,
            weight: playerForm.weight,
            birthDate: playerForm.birthDate,
            basketballTeam: playerForm.basketballTeam
        }

        console.log(player)

        axios.put(baseUrl.apiUrl + `player/${player.id}`, player)
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("Team updated successfully")
                window.location.href = "/player";
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div>
            <Header/>
            <div className={styles.container}>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 className={styles.titleEdit}>Do &nbsp; you &nbsp; want &nbsp; to &nbsp; edit &nbsp; the &nbsp; {player.name} &nbsp;</h1>
                    <img
                        className={styles.image}
                        src="https://www.si.com/.image/t_share/MTkzNDQ4MTU4NzM3NDc0Nzg4/cbb-1-363-graphic.jpg"
                        alt=""
                    />
                    <h4>Information about the {player.name} team</h4>
                    <TextField
                        name="name"
                        label="Name"
                        size="small"
                        id="name"
                        value={playerForm.name}
                        onChange={handleInputChange}
                    />

                    <TextField
                        name="age"
                        label="Age"
                        type="number"
                        size="small"
                        id="age"
                        value={playerForm.age}
                        onChange={handleInputChange}
                    />

                    <TextField
                        name="height"
                        label="Height"
                        type="number"
                        size="small"
                        id="height"
                        value={playerForm.height}
                        onChange={handleInputChange}
                    />

                    <TextField
                        name="weight"
                        label="Weight"
                        type="number"
                        size="small"
                        id="weight"
                        value={playerForm.weight}
                        onChange={handleInputChange}
                    />

                    <TextField
                        name="birthDate"
                        label="Birth Date"
                        type="date"
                        size="small"
                        id="birthDate"
                        value={playerForm.birthDate}
                        onChange={handleInputChange}
                    />

                    <Select
                        name="basketballTeam"
                        label="Basketball Team"
                        size="small"
                        id="basketballTeam"
                        value={selectedBasketballTeamId}
                        onChange={handleInputChange}
                    >
                        {teams.map((team) => (
                            <MenuItem key={team.id} value={team.id}>{team.name} {team.id}</MenuItem>
                        ))}
                    </Select>

                    <Button className={styles.buttonSubmit} type={"submit"}>Edit</Button>
                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps({query}: { query: { id: string } }) {

    const resTeam = await fetch(baseUrl.apiUrl + `basketball-team/`);
    const resPlayer = await fetch(baseUrl.apiUrl + `player/${query.id}`);

    const teams: IBasketballTeam[] = await resTeam.json();
    const player: IPlayer = await resPlayer.json();

    console.log(teams.length);
    console.log(teams.map(team => team.name));

    return {props: {player: player, teams: teams}}
}

export default editPlayer