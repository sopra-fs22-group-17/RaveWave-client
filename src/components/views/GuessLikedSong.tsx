import { Box, Progress, RingProgress, SimpleGrid, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { FC, useContext, useEffect, useState } from "react";

import { IGuessOption, IGuessQuestion } from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import BaseContainer from "../ui/BaseContainer";
import { IGameController } from "./GameController";
import { SpotifyPlayer } from "./SpotifyPlayer";

export interface IGuessLikedSongProps {
    controller: IGameController;
    question: IGuessQuestion;
}

let imageSize = 225;
let RingSectors = [];

export const GuessLikedSong: FC<IGuessLikedSongProps> = ({ controller, question }) => {
    const context = useContext(GameContext);
    const { gameConfiguration, lobbyId, stomp } = context;
    let windowSize = window.innerWidth;

    let totalNrRounds = question.totalRounds;
    let currentRound = question.currentRound;

    const valueAdd = Math.floor(100 / totalNrRounds);

    if (windowSize <= 900) {
        imageSize = Math.floor((window.innerWidth - 60) / 2);
    }
    const [answered, setAnswered] = useState(false);

    const timeToAnswer = gameConfiguration.playBackDuration;
    const [passedSeconds, setSeconds] = useState(timeToAnswer);

    const progressVal = Math.floor((100 / timeToAnswer) * (timeToAnswer - passedSeconds));

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((seconds) => seconds - 1);
        }, 1000);

        JsonConstructorForRounds();

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

    function JsonConstructorForRounds() {
        for (let i = 0; i < currentRound; i++) {
            RingSectors.push({ value: valueAdd, color: "green" });
        }
    }

    return (
        <BaseContainer>
            <Stack align="center">
                <Title order={2}>Guess the Liked Song</Title>
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
                <Stack sx={{ width: imageSize * 2 + 15, paddingTop: 15 }}>
                    <Progress value={progressVal} size="md" />
                </Stack>
                <SimpleGrid sx={{ paddingTop: 10 }} cols={2}>
                    <Stack spacing={0} align={"center"}>
                        <RingProgress
                            size={60}
                            thickness={3}
                            roundCaps
                            label={
                                <Text align="center">
                                    {currentRound}/{totalNrRounds}
                                </Text>
                            }
                            sections={RingSectors}
                        />
                        <Text>Round</Text>
                    </Stack>
                    <Stack spacing={0} align={"center"}>
                        <RingProgress
                            size={60}
                            thickness={3}
                            roundCaps
                            label={
                                <Text align="center">
                                    {currentRound}/{totalNrRounds}
                                </Text>
                            }
                            sections={RingSectors}
                        />
                        <Text>Answered</Text>
                    </Stack>
                </SimpleGrid>
                <SpotifyPlayer url={question.previewURL} duration={question.playDuration || 20} />
            </Stack>
        </BaseContainer>
    );
};
