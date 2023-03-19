import {Header} from "@/components/layout/Header";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "@/styles/Team.module.css";
import axios from "axios";
import {baseUrl} from "@/environments/apiBaseUrl";
import {IBasketballTeam} from "@/interfaces/IBasketballTeam";
import {InputLabel} from "@mui/material";

const createTeam = () => {

    const [teamForm, setTeamForm] = useState<IBasketballTeam>(
        {
            id: 0,
            name: '',
            championshipWins: 0,
            creationDate: '',
            trainer: '',
            professional: false,
            players: []
        }
    );


    const handleInputChange = (event: any) => {
        console.log(event.target.value)
        setTeamForm({
            ...teamForm,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const team = {
            name: teamForm.name,
            championshipWins: teamForm.championshipWins,
            creationDate: teamForm.creationDate,
            trainer: teamForm.trainer,
            professional: teamForm.professional,
            players: teamForm.players
        }

        team.championshipWins = parseInt(String(team.championshipWins))
        team.professional = team.professional === 1;

        console.log(team)

        axios.post(baseUrl.apiUrl + `basketball-team/`, team)
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("Basketball Team created successfully")
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
                    <h1 className={styles.titleEdit}>Add &nbsp; a  &nbsp; new &nbsp; team &nbsp;</h1>
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
                        label="Championship wins"
                        size="small"
                        type="number"
                        name="championshipWins"
                        id="championshipWins"
                        onChange={handleInputChange}
                    />

                    <InputLabel id="creationDate">Creation date</InputLabel>
                    <TextField
                        size="small"
                        type="date"
                        name="creationDate"
                        id="creationDate"
                        onChange={handleInputChange}
                    />

                    <TextField
                        label="Trainer"
                        size="small"
                        type="text"
                        name="trainer"
                        id="trainer"
                        onChange={handleInputChange}
                    />

                    <div className={styles.formProfessional}>
                        <label htmlFor="professional">Professional</label>
                        <Select
                            labelId="professional"
                            id="professional"
                            name="professional"
                            size="small"
                            onChange={handleInputChange}
                        >
                            <MenuItem value={1}>Yes</MenuItem>
                            <MenuItem value={0}>No</MenuItem>
                        </Select>
                    </div>

                    <Button className={styles.buttonSubmit} type={"submit"}>Add team</Button>
                </form>
            </div>
        </div>
    )
}

export default createTeam