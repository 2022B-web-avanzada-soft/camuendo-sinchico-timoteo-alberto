import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IPlayer} from "@/interfaces/IPlayer";
import {BiBasketball} from "react-icons/bi";
import React from "react";
import Link from "next/link";
import styles from "@/styles/Team.module.css";
import {baseUrl} from "@/environments/apiBaseUrl";
import axios from "axios";


export const PlayerCard = ({player}: { player: IPlayer }) => {

    const {name, height, age, weight, birthDate, basketballTeam} = player;

    const handleDelete = (id: number) => {
        axios.delete(baseUrl.apiUrl + `player/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("Player deleted successfully")
                // link to player list
                window.location.href = "/player";
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Card sx={{width: 300}}>
            <CardMedia
                sx={{height: 150}}
                image={`https://library.sportingnews.com/2021-08/anthony-davis_9usgr9gm6uyd11875wce9yzsx.jpg`}
                title="NBA"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text" paddingBottom={1}>
                    <BiBasketball/> Play for {basketballTeam.name} team
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Age: {age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Height: {height}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Weight: {weight}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Birth date: {birthDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Button>
                    <Link className={styles.link} href={`/player/update/${player.id}`}>
                        Edit
                    </Link>
                </Button>
                <Button className={styles.link} onClick={() => handleDelete(player.id)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}