import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Easy = "ExerciseDifficulty/Easy.png";
const Medium = "ExerciseDifficulty/Medium.png";
const Hard = "ExerciseDifficulty/Hard.png";


interface ExerciseCardProps {
  id: number;
  name: string;
  description: string;
  difficulty: number;
}


const ExerciseCard: React.FC<ExerciseCardProps> = ({ id, name, description, difficulty, }) => {
  const defaultImage = "/ExerciseCatalog/missing.png";
  const imageUrl = `/ExerciseCatalog/${id}.png` || defaultImage;

    const Difficulty = ({ difficulty }: { difficulty: number }) => {
      let boxStyle = {
        width: "25%",
        position: "relative",
        left: "20%",
        top: "0%",
      };
      const images = {
        1: Easy,
        2: Medium,
        3: Hard,
      };
      const altTexts = {
        1: "easy",
        2: "medium",
        3: "hard",
      };

      return (
        <Box sx={boxStyle}>
          <img
            src={images[difficulty]}
            style={{ width: "100%" }}
            alt={altTexts[difficulty]}
          />
        </Box>
      );
    };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        alt="Exercise Image"
        height="180"
        image={imageUrl}
        onError={(e) => {
          const imgElement = e.target as HTMLImageElement;
          imgElement.onerror = null;
          imgElement.src = defaultImage;
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <Typography
          gutterBottom
          color="primary"
          sx={{ position: "relative", left: "15%" }}
        >
          DIFFICULTY:{" "}
        </Typography>
        <Difficulty difficulty={difficulty}></Difficulty>
      </CardActions>
    </Card>
  );
};

export default ExerciseCard;
