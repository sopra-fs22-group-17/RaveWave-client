import Box from "@mui/material/Box";
import {Button} from "@mantine/core";
import Slider from "@mui/material/Slider";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { IGameController } from "./GameController"; // how to import tsx interfaces in jsx?
import { IGameQuestion } from "../../api/@def"; // how to import tsx interfaces in jsx?

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/GuessArtist.scss";
import {useState} from "@types/react";

const Widget = styled("div")(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: "100%",
    margin: "auto",
    position: "relative",
    zIndex: 1,
    backgroundColor: theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
    backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
    width: 100,
    height: 100,
    objectFit: "cover",
    overflow: "hidden",
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.08)",
    "& > img": {
        width: "100%",
    },
});

const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
}

const GuessArtist = (props) => {
    const theme = useTheme();
    const duration = 200; // seconds
    const [position, setPosition] = React.useState(32);

    let controller = IGameController;
    let question = IGameQuestion; // or do we need IGameQuestion.question here?

    const [answered, setAnswered] = useState(false);

    if (!question) return null;
    const sendAnswer = (IGameAnswerOption) => {
        setAnswered(true);
        controller.answer(question.question, IGameAnswerOption.id);
    };

    return (
        <BaseContainer className="guessartist">
            <div className="guessartist column-item">{question.question}</div>
            {question.options.map((option, i) => {
                return (
                    <Button key={i} disabled={answered} onClick={() => sendAnswer(option)}>
                        {option.label}
                    </Button>
                );
            })}

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
                <Widget>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CoverImage>
                            <img alt="can't win - Chilling Sunday" src="lotties/chilling-sunday.jpg" />
                        </CoverImage>
                        <Box sx={{ ml: 1.5, minWidth: 0 }}>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                Jun Pulse
                            </Typography>
                            <Typography noWrap>
                                <b>asd (Can&apos;t win)</b>
                            </Typography>
                            <Typography noWrap letterSpacing={-0.25}>
                                Chilling Sunday &mdash; คนเก่าเขาทำไว้ดี
                            </Typography>
                        </Box>
                    </Box>
                    <Slider
                        aria-label="time-indicator"
                        size="small"
                        value={position}
                        min={0}
                        step={1}
                        max={duration}
                        onChange={(_, value) => setPosition(value)}
                        sx={{
                            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
                            height: 4,
                            "& .MuiSlider-thumb": {
                                width: 8,
                                height: 8,
                                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                                "&:before": {
                                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                                },
                                "&:hover, &.Mui-focusVisible": {
                                    boxShadow: `0px 0px 0px 8px ${theme.palette.mode === "dark" ? "rgb(255 255 255 / 16%)" : "rgb(0 0 0 / 16%)"}`,
                                },
                                "&.Mui-active": {
                                    width: 20,
                                    height: 20,
                                },
                            },
                            "& .MuiSlider-rail": {
                                opacity: 0.28,
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: -2,
                        }}
                    >
                        <TinyText>{formatDuration(position)}</TinyText>
                        <TinyText>-{formatDuration(duration - position)}</TinyText>
                    </Box>
                </Widget>
        </BaseContainer>
    );
};

export default GuessArtist;
