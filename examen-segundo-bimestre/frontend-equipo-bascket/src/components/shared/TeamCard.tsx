import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IBasketballTeam} from "@/interfaces/IBasketballTeam";
import {BsFillTrophyFill} from "react-icons/bs";
import {BiBasketball} from "react-icons/bi";
import {BsFillCalendarCheckFill} from "react-icons/bs";
import {BsFillArrowDownCircleFill} from "react-icons/bs";
import {BsFillStarFill} from "react-icons/bs";
import {AiFillThunderbolt} from "react-icons/ai";
import {
    Accordion,
    AccordionDetails, AccordionSummary,
} from "@mui/material";
import {PlayerSmallCard} from "@/components/shared/PlayerSmallCard";
import styles from "../../styles/Team.module.css"
import Link from "next/link";
import axios from "axios";
import {baseUrl} from "@/environments/apiBaseUrl";


export const TeamCard = ({team}: { team: IBasketballTeam }) => {

    const {name, championshipWins, creationDate, trainer, professional, players} = team;

    const handleDelete = (id: number) => {
        axios.delete(baseUrl.apiUrl + `basketball-team/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("Basketball Team deleted successfully")
                // link to player list
                window.location.href = "/team";
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Card sx={{width: 600}}>
            <CardMedia
                sx={{height: 250}}
                image={`https://www.si.com/.image/t_share/MTkzNDQ4MTU4NzM3NDc0Nzg4/cbb-1-363-graphic.jpg`}
                title="NBA player"
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className={styles.teamName}
                >
                    {name}
                </Typography>
                <Typography variant="body2" color="text">
                    <BsFillTrophyFill/> &nbsp;Championship wins: {championshipWins}
                </Typography>
                <Typography variant="body2" color="text">
                    <BiBasketball/> &nbsp;Trainer: {trainer}
                </Typography>
                <Typography variant="body2" color="text">
                    <BsFillCalendarCheckFill/> &nbsp;Creation date: {creationDate}
                </Typography>
                <Typography variant="body2" color="text">
                    <BsFillStarFill/> Professional: {professional ? "Yes" : "No"}
                </Typography>
                <br/>
                <Typography variant="body2" color="text.secondary">
                    <AiFillThunderbolt/> Meet our players, we currently
                    have {players.length} players <AiFillThunderbolt/>
                </Typography>
                <br/>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<BsFillArrowDownCircleFill/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="body2" color="text.secondary">Players</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.smallCardPlayer}>
                            {players.map((player) => (
                                <PlayerSmallCard
                                    key={player.id}
                                    player={player}/>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>

            </CardContent>
            <CardActions>
                <Button>
                    <Link className={styles.link} href={`/team/update/${team.id}`}>
                        Edit
                    </Link>
                </Button>
                <Button className={styles.link} onClick={() => handleDelete(team.id)}>
                        Delete
                </Button>
            </CardActions>

        </Card>
    );
}