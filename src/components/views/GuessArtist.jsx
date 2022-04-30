import React, {useState, useCallback, createRef} from "react";
import Box from "@mui/material/Box";
import {Button} from "@mantine/core";
import Slider from "@mui/material/Slider";
import {styled, useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/GuessArtist.scss";
import {useHistory} from "react-router-dom";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';

const songURL = "https://p.scdn.co/mp3-preview/1ac449e52145d1c44dc4346afdb2d8b70e93969b?cid=d7d44473ad6a47cd86c580fcee015449";

const imageURL = "";

const SpotifyPlayer = (url, duration) => {

    console.log(url);
    console.log(duration);

    return (
        <AudioPlayer className="guessartist audioplayer"
            src={songURL}
            autoplay={true}
            showJumpControls={false}
            showDownloadProgress={false}
            customProgressBarSection={
                [
                    RHAP_UI.CURRENT_TIME,
                    RHAP_UI.PROGRESS_BAR,
                    RHAP_UI.DURATION
                ]
            }
            customControlsSection={
                [
                    RHAP_UI.MAIN_CONTROLS,
                ]
            }
        />
    );
}

const GuessArtist = (controller, question) => {

    const history = useHistory();

    //props.answer
    const theme = useTheme();
    const duration = 200; // seconds
    const [position, setPosition] = React.useState(32);

    // const [question, setQuestion] = useState();
    const [answered, setAnswered] = useState(false);

    //if (!question) return null;
    const sendAnswer = (selection) => {
        setAnswered(true);
        controller.answer(question, selection.id);
    };

    return (
        <BaseContainer className="guessartist">
            { /*
            <div className="guessartist column-item">{question.question}</div>
            {question.options.map((option, i) => {
                return (
                    <Button key={i} disabled={answered} onClick={() => sendAnswer(option)}>
                        {option.label}
                    </Button>
                );
            })}
            */
            }

            <Button className="guessartist opt1">
                Opt1
            </Button>
            <Button className="guessartist opt2">
                Opt2
            </Button>
            <Button className="guessartist opt3">
                Opt3
            </Button>
            <Button className="guessartist opt4">
                Opt4
            </Button>

            <SpotifyPlayer url={songURL} duration={20}/>

            <Button className="guessartist opt4">
                Unmute
            </Button>

        </BaseContainer>
    );
};

export default GuessArtist;
