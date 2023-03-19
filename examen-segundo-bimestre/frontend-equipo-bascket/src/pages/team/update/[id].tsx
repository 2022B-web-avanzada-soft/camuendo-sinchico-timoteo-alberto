import {IBasketballTeam} from "@/interfaces/IBasketballTeam";
import {Header} from "@/components/layout/Header";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "@/styles/Team.module.css";
import axios from "axios";
import {baseUrl} from "@/environments/apiBaseUrl";


const editTeam = ({team}: { team: IBasketballTeam }) => {

    const [teamForm, setTeamForm] = useState<IBasketballTeam>(
        {
            id: team.id,
            name: team.name,
            championshipWins: team.championshipWins,
            creationDate: team.creationDate,
            trainer: team.trainer,
            professional: team.professional,
            players: team.players
        }
    );

    const handleInputChange = (event: any) => {
        setTeamForm({
            ...teamForm,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const team = {
            id: teamForm.id,
            name: teamForm.name,
            championshipWins: teamForm.championshipWins,
            creationDate: teamForm.creationDate,
            trainer: teamForm.trainer,
            professional: teamForm.professional,
        }
        team.professional = team.professional === 1;
        team.championshipWins = parseInt(String(team.championshipWins));

        console.log(team)

        axios.put(baseUrl.apiUrl + `basketball-team/${team.id}`, team)
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("Team updated successfully")
                window.location.href = "/team";
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
                    <h1 className={styles.titleEdit}>Do &nbsp; you &nbsp; want &nbsp; to &nbsp; edit &nbsp; the &nbsp; {team.name} &nbsp;</h1>
                    <img
                        className={styles.image}
                        src="https://www.si.com/.image/t_share/MTkzNDQ4MTU4NzM3NDc0Nzg4/cbb-1-363-graphic.jpg"
                        alt=""
                    />
                    <h4>Information about the {team.name} team</h4>
                    <TextField
                        label="Name"
                        size="small"
                        type="text"
                        name="name"
                        id="name"
                        value={teamForm.name}
                        onChange={handleInputChange}
                    />

                    <TextField
                        label="Championship wins"
                        size="small"
                        type="number"
                        name="championshipWins"
                        id="championshipWins"
                        value={teamForm.championshipWins}
                        onChange={handleInputChange}
                    />

                    <TextField
                        label="Creation date"
                        size="small"
                        type="date"
                        name="creationDate"
                        id="creationDate"
                        value={teamForm.creationDate}
                        onChange={handleInputChange}
                    />

                    <TextField
                        label="Trainer"
                        size="small"
                        type="text"
                        name="trainer"
                        id="trainer"
                        value={teamForm.trainer}
                        onChange={handleInputChange}
                    />

                    <div className={styles.formProfessional}>
                        <label htmlFor="professional">Professional</label>
                        <Select
                            labelId="professional"
                            id="professional"
                            name="professional"
                            size="small"
                            value={teamForm.professional ? 1 : 0}
                            onChange={handleInputChange}
                        >
                            <MenuItem value={1}>Yes</MenuItem>
                            <MenuItem value={0}>No</MenuItem>
                        </Select>
                    </div>

                    <Button className={styles.buttonSubmit} type={"submit"}>Edit</Button>
                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps({query}: { query: { id: string } }) {
    const res = await fetch(`http://localhost:3000/api/basketball-team/${query.id}`)
    const team: IBasketballTeam = await res.json()
    console.log(team)
    return {props: {team: team}}
}

export default editTeam