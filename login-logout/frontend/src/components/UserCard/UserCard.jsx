import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const RANDOM_IMAGE_URL = `https://robohash.org/`

export default function UserCard({name, email}) {
    const robotId = parseInt(Math.random() * 100) 
    return (
        <Card sx={{ maxWidth: 345, flexGrow: 1 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={RANDOM_IMAGE_URL + robotId}
                    alt={`robot ${robotId}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {email}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}