import { Box, Center, Container, Grid, Stack, Text, UnstyledButton } from "@mantine/core";
import { FC, useContext, useEffect, useState } from "react";

import { IGuessOption, IGuessQuestion } from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import { IGameController } from "./GameController";
import { SpotifyPlayer } from "./SpotifyPlayer";

export interface IGuessLikedSongProps {
    controller: IGameController;
    question: IGuessQuestion;
}

export const GuessLikedSong: FC<IGuessLikedSongProps> = ({ controller, question }) => {
    const context = useContext(GameContext);
    const { gameConfiguration, lobbyId, stomp } = context;
    const imageSize = 200;
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
        <Container size={500}>
            <Stack align="center">
                <h1>Guess the Liked Song</h1>
                <Grid gutter={40} justify="center">
                    {question.options.map((option, i) => {
                        return (
                            <Grid.Col key={i} span={6}>
                                <Center>
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
                                            }}
                                        >
                                            <Stack align="center" justify="center" sx={{ height: "100%" }}>
                                                <Text sx={{ fontSize: 30, fontWeight: 700, textShadow: "1px 2px #00000063" }}>{option.answer}</Text>
                                            </Stack>
                                        </Box>
                                    </UnstyledButton>
                                </Center>
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Stack>
            <Box sx={{ paddingTop: 20 }}>
                <div>{passedSeconds}</div>
                <SpotifyPlayer url={question.previewURL} duration={question.playDuration || 20} />
            </Box>
        </Container>
    );
};
