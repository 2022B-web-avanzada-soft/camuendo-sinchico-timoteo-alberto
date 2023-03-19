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
import {InputLabel} from "@mui/material";


const createPlayer = ({teams}: { teams: IBasketballTeam [] }) => {

    const [playerForm, setPlayerForm] = useState<IPlayer>(
        {
            id: 0,
            name: '',
            age: 0,
            height: 0,
            weight: 0,
            birthDate: '',
            basketballTeam: {
                id: 0,
                name: '',
                creationDate: '',
                trainer: '',
                championshipWins: 0,
                professional: false,
                players: []
            }
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
            name: playerForm.name,
            age: playerForm.age,
            height: playerForm.height,
            weight: playerForm.weight,
            birthDate: playerForm.birthDate,
            basketballTeam: playerForm.basketballTeam
        }

        player.age = parseInt(String(player.age));
        player.height = parseFloat(String(player.height));
        player.weight = parseFloat(String(player.weight));

        console.log(player)

        axios.post(baseUrl.apiUrl + `player/`, player)
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("Player created successfully")
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
                    <h1 className={styles.titleEdit}>Add &nbsp; a  &nbsp; new &nbsp; player &nbsp;</h1>
                    <img
                        className={styles.image}
                        src="https://www.si.com/.image/t_share/MTkzNDQ4MTU4NzM3NDc0Nzg4/cbb-1-363-graphic.jpg"
                        alt=""
                    />
                    <TextField
                        name="name"
                        label="Name"
                        size="small"
                        id="name"
                        onChange={handleInputChange}
                    />

                    <TextField
                        name="age"
                        label="Age"
                        type="text"
                        size="small"
                        id="age"
                        onChange={handleInputChange}
                    />

                    <TextField
                        name="height"
                        label="Height"
                        type="text"
                        size="small"
                        id="height"
                        onChange={handleInputChange}
                    />

                    <TextField
                        name="weight"
                        label="Weight"
                        type="text"
                        size="small"
                        id="weight"
                        onChange={handleInputChange}
                    />

                    <InputLabel id="date">Birth date</InputLabel>
                    <TextField
                        name="birthDate"
                        type="date"
                        size="small"
                        id="birthDate"
                        onChange={handleInputChange}
                    />

                    <InputLabel id="team-label">Select a team</InputLabel>
                    <Select
                        label="Select a team"
                        labelId="team-label"
                        name="basketballTeam"
                        size="small"
                        id="basketballTeam"
                        onChange={handleInputChange}
                        value={selectedBasketballTeamId}
                    >
                        {teams.map((team) => (
                            <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
                        ))}
                    </Select>

                    <Button className={styles.buttonSubmit} type={"submit"}>Add player</Button>
                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps() {

    const resTeam = await fetch(baseUrl.apiUrl + `basketball-team/`);
    const teams: IBasketballTeam[] = await resTeam.json();
    console.log(teams.length);

    return {props: {teams: teams}}
}

export default createPlayer;