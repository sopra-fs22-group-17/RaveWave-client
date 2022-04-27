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
import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/SelectGameMode.scss";

const SelectGameMode = (props) => {
    // use react-router-dom's hook to access the history
    const history = useHistory();

    localStorage.setItem("gameMode", "guess the song");

    let content = (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Game Mode</FormLabel>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                <FormControlLabel value="song" control={<Radio />} label="Guess the Song" />
                <FormControlLabel value="artist" control={<Radio />} label="Guess the Artist" />
                <FormControlLabel value="lyrics" control={<Radio />} label="Guess the Lyrics" />
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
            value: 0.5,
            label: "0.5",
        },
        {
            value: 1.0,
            label: "1.0",
        },
        {
            value: 1.5,
            label: "1.5",
        },
        {
            value: 2.0,
            label: "2.0",
        },
        {
            value: 2.5,
            label: "2.5",
        },
        {
            value: 3.0,
            label: "3.0",
        },
    ];

    const marksPlaybackDuration = [
        {
            value: 10,
            label: "10",
        },
        {
            value: 12,
            label: "12",
        },
        {
            value: 14,
            label: "14",
        },
        {
            value: 16,
            label: "16",
        },
        {
            value: 18,
            label: "18",
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

    const [gameMode, setGameMode] = useState("guessartist");

    const [numberOfRounds, setRound] = useState(10);
    const [playbackSpeed, setPlaySpeed] = useState(1.0);
    const [playbackDuration, setPlaybackDuration] = useState(10);

    const [songPool, setSongPool] = useState();

    function startgameButton() {
        localStorage.setItem("gameMode", gameMode);
        localStorage.setItem("numberOfRounds", numberOfRounds.toString());
        localStorage.setItem("playbackSpeed", playbackSpeed.toString());
        localStorage.setItem("playbackDuration", playbackDuration.toString());
        history.push("/displayqr");
    }

    return (
        <BaseContainer className="selectgamemode">
            <Button onClick={() => history.push('/selectgamemode')} class="column-item">Select Game Mode</Button>

            <FormControl className="selectgamemode column-item">
                <RadioGroup row sx={{ justifyContent: 'center' }} aria-labelledby="demo-radio-buttons-group-label" defaultValue="Song" name="radio-buttons-group" value={gameMode} onChange={(e) => setGameMode(e.target.value)}>
                    <FormControlLabel value="guesssong" control={<Radio />} label="Guess the Song" />
                    <FormControlLabel value="guessartist" control={<Radio />} label="Guess the Artist" />
                    <FormControlLabel value="guesslyrics" control={<Radio />} label="Guess the Lyrics" />
                </RadioGroup>
            </FormControl>

            <Button class="selectgamemode column-item">Game parameters:</Button>
            <div className="selectgamemode label">Number of Rounds</div>
            <Slider className="selectgamemode slider" defaultValue={10} getAriaValueText={valuetext} step={5} marks={marksRounds} valueLabelDisplay="auto" min={5} max={20} value={numberOfRounds} onChange={(e) => setRound(e.target.value)}/>
            <div className="selectgamemode label">Playback Speed</div>
            <Slider className="selectgamemode slider" defaultValue={1} getAriaValueText={valuetext} step={0.5} marks={marksPlaybackSpeed} valueLabelDisplay="auto" min={0.5} max={3} value={playbackSpeed} onChange={(e) => setPlaySpeed(e.target.value)}/>
            <div className="selectgamemode label">Playback Duration</div>
            <Slider className="selectgamemode slider" defaultValue={10} getAriaValueText={valuetext} step={2} marks={marksPlaybackDuration} valueLabelDisplay="auto" min={10} max={20} value={playbackDuration} onChange={(e) => setPlaybackDuration(e.target.value)}/>

            <Button class="selectgamemode column-item">Chose song library:</Button>

            <ImageList sx={{ justifyContent: 'center', height: 450, flexGrow: 1, flexWrap: 'wrap' }}>
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

            <Button onClick={() => history.push("/connectspotify")} className="selectgamemode backinio">
                Back
            </Button>
            <Button onClick={() => history.push("/displayqr")} className="selectgamemode addplayers">
                Add players
            </Button>
        </BaseContainer>
    );
};

export default SelectGameMode;
