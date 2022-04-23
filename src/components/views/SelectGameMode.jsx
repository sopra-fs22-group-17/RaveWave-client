import { Button } from "@mantine/core";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

const SelectGameMode = (props) => {
    // use react-router-dom's hook to access the history
    const history = useHistory();

    let content = (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Game Mode</FormLabel>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                <FormControlLabel value="female" control={<Radio />} label="Guess the Song" />
                <FormControlLabel value="male" control={<Radio />} label="Guess the Artist" />
                <FormControlLabel value="other" control={<Radio />} label="Guess the Player" />
            </RadioGroup>
        </FormControl>
    );

    const marksRounds = [
        {
            value: 5,
            label: "5",
        },
        {
            value: 10,
            label: "10",
        },
        {
            value: 15,
            label: "15",
        },
        {
            value: 20,
            label: "20",
        },
    ];

    const marksPlaybackSpeed = [
        {
            value: 5,
            label: "5",
        },
        {
            value: 10,
            label: "10",
        },
        {
            value: 15,
            label: "15",
        },
        {
            value: 20,
            label: "20",
        },
    ];

    const marksPlaybackDuration = [
        {
            value: 5,
            label: "5",
        },
        {
            value: 10,
            label: "10",
        },
        {
            value: 15,
            label: "15",
        },
        {
            value: 20,
            label: "20",
        },
    ];

    const marksTimeToAnswer = [
        {
            value: 5,
            label: "5",
        },
        {
            value: 10,
            label: "10",
        },
        {
            value: 15,
            label: "15",
        },
        {
            value: 20,
            label: "20",
        },
    ];

    function valuetext(value) {
        return `${value}`;
    }

    const itemData = [
        {
            img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
            title: "Breakfast",
            rows: 2,
            cols: 2,
            featured: true,
        },
        {
            img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
            title: "Burger",
        },
        {
            img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
            title: "Camera",
        },
        {
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
            title: "Coffee",

            cols: 2,
        },
        {
            img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
            title: "Hats",

            cols: 2,
        },
        {
            img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
            title: "Honey",

            rows: 2,
            cols: 2,
            featured: true,
        },
        {
            img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
            title: "Basketball",
        },
        {
            img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
            title: "Fern",
        },
        {
            img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
            title: "Mushrooms",

            rows: 2,
            cols: 2,
        },
        {
            img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
            title: "Tomato basil",
        },
        {
            img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
            title: "Sea star",
        },
        {
            img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
            title: "Bike",

            cols: 2,
        },
    ];

    const images = (
        <ImageList sx={{ width: 500, height: 450 }}>
            <ImageListItem key="Subheader" cols={2}></ImageListItem>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        actionIcon={<IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }} aria-label={`info about ${item.title}`}></IconButton>}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );

    return (
        <BaseContainer className="game container">
            <p className="game paragraph">Select Game Parameters</p>
            {content}
            <p className="Round Parameters">Number of Rounds</p>
            <Slider aria-label="Always visible" defaultValue={10} getAriaValueText={valuetext} step={5} marks={marksRounds} valueLabelDisplay="on" />
            <p className="Playback Speed Parameters">Playback Speed</p>
            <Slider aria-label="Always visible" defaultValue={10} getAriaValueText={valuetext} step={5} marks={marksPlaybackSpeed} valueLabelDisplay="on" />
            <p className="Playback Duration Parameters">Playback Duration</p>
            <Slider aria-label="Always visible" defaultValue={10} getAriaValueText={valuetext} step={5} marks={marksPlaybackDuration} valueLabelDisplay="on" />
            <p className="Time to Answer Parameters">Time to Answer</p>
            <Slider aria-label="Always visible" defaultValue={10} getAriaValueText={valuetext} step={5} marks={marksTimeToAnswer} valueLabelDisplay="on" />
            <Button onClick={() => history.push("/guessthesong")} width="100%">
                Start Game
            </Button>
            <p className="song library">Select Song Library</p>
            {images}
        </BaseContainer>
    );
};

export default SelectGameMode;
