import {Box, Center, Container, SimpleGrid, Stack, Text, Title, UnstyledButton} from "@mantine/core";
import {FC, useContext, useEffect, useState} from "react";

import {IGuessOption, IGuessQuestion} from "../../api/@def";
import {IGameController} from "./GameController";
import {SpotifyPlayer} from "./SpotifyPlayer";
import {GameContext} from "../../contexts/GameContext";
import BaseContainer from "../ui/BaseContainer";

export interface IGuessLikedSongProps {
    controller: IGameController;
    question: IGuessQuestion;
}

let imageSize = 200;

export const GuessLikedSong: FC<IGuessLikedSongProps> = ({controller, question}) => {
    const context = useContext(GameContext);
    const {gameConfiguration, lobbyId, stomp} = context;
    let windowSize = window.innerWidth;

    if (windowSize <= 900) {
        imageSize = Math.floor((window.innerWidth - 60)/2);
    }
    const [answered, setAnswered] = useState(false);

    const timeToAnswer = gameConfiguration.playBackDuration;
    const [passedSeconds, setSeconds] = useState(timeToAnswer);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((seconds) => seconds - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!question) return null;
    const sendAnswer = (selection: IGuessOption) => {
        setAnswered(true);
        controller.answer(question as any, String(selection.answerId), String(timeToAnswer - passedSeconds));
    };

    if (passedSeconds <= 0) {
        stomp.endRound(lobbyId);
        console.log("endround was called");
    }

    return (
        <BaseContainer>
            <Stack align="center">
                <h1>Guess the Liked Song</h1>
                <Text weight={700}>
                    Round {question.currentRound} of {question.totalRounds}
                </Text>
                <SimpleGrid cols={2}>
                    {question.options.map((option, i) => {
                        return (
                                    <UnstyledButton disabled={answered} onClick={() => sendAnswer(option)}>
                                        <Box
                                            style={{
                                                backgroundImage: `url(${option.picture})`,
                                                opacity: answered ? 0.5 : 1,
                                                cursor: answered ? "default" : "pointer",
                                            }}
                                            sx={{
                                                width: imageSize,
                                                height: imageSize,
                                                borderRadius: 10,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                wordWrap: "break-word",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                textAlign: "center",
                                                boxShadow: "rgba(0, 0, 0, 0.3) 15px 34px 53px, rgba(0, 0, 0, 0.22) 15px 30px 27px",
                                                transition: "transform 130ms ease-out",
                                                zIndex: 1,
                                                "&:hover": {
                                                    transform: "translateY(-2px) scale(0.985)",
                                                    opacity: 0.85,
                                                    zIndex: 0,
                                                },
                                            }}
                                        >
                                            <Stack align="center" justify="center" sx={{ height: "100%" }}>
                                                <Text
                                                    sx={{
                                                        fontSize: 30,
                                                        fontWeight: 700,
                                                        textShadow: "2px 2px 2px #000000C3",
                                                    }}
                                                >
                                                    {option.answer}
                                                </Text>
                                            </Stack>
                                        </Box>
                                    </UnstyledButton>

                        );
                    })}
                </SimpleGrid>
            </Stack>
        </BaseContainer>
    );
};
