import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import notImage from "../image/image.png";

type Props = {
  name: string;
  price: number;
};

export default function ProductCard({ name }: Props) {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia sx={{ height: 140 }} title="green iguana" image={notImage} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        {/* <Typography variant="body2">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">Editar</Button>
        <Button size="small">Agregar</Button>
      </CardActions>
    </Card>
  );
}
