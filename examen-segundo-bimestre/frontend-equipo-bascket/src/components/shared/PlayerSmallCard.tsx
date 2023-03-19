import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {IPlayer} from "@/interfaces/IPlayer";

export const PlayerSmallCard = ({player}: { player: IPlayer }) => {

    const {name} = player;

    return (
        <Card sx={{width: 150}}>
            <CardMedia
                sx={{ height: 100 }}
                image={`https://library.sportingnews.com/2021-08/anthony-davis_9usgr9gm6uyd11875wce9yzsx.jpg`}
                title="NBA player"
            />
            <CardContent>
                <Typography variant="body2" color="text">
                    {name}
                </Typography>
            </CardContent>

        </Card>
    );
}