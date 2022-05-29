import { Box, Progress, RingProgress, SimpleGrid, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { FC, useContext, useEffect, useState } from "react";

import BaseContainer from "components/ui/BaseContainer";

import {IGuessOption, IGuessQuestion, IMessageEvent} from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import { IGameController } from "./GameController";
import { SpotifyPlayer } from "./SpotifyPlayer";

export interface IGuessArtistProps {
    controller: IGameController;
    question: IGuessQuestion;
}

let imageSize = 225;
let RingSectorsRounds = [];
let RingSectorsAnswers = [];
let currentAnswers = 0;

export const GuessArtist: FC<IGuessArtistProps> = ({controller, question}) => {
    const context = useContext(GameContext);
    const {gameConfiguration, lobbyId, stomp} = context;

    let totalNrRounds = question.totalRounds;
    let currentRound = question.currentRound;

    let expectedAnswers = question.expectedAnswers;

    if (expectedAnswers === currentAnswers) {
        currentAnswers = 0;
    }

    let windowSize = window.innerWidth;

    if (windowSize <= 900) {
        imageSize = Math.floor((window.innerWidth - 60) / 2);
    }

    const [answered, setAnswered] = useState(false);

    const timeToAnswer = gameConfiguration.playBackDuration;
    const [passedSeconds, setSeconds] = useState(timeToAnswer);

    const progressVal = Math.floor((100 / timeToAnswer) * (timeToAnswer - passedSeconds));

    const listener = (message: IMessageEvent) => {
        if (message.type === "answerCount") {
            currentAnswers = message.data.currentAnswers;
        }
    };

    const clearStuff = (interval) => {
        RingSectorsAnswers = [];
        currentAnswers = 0;
        RingSectorsRounds = [];

        clearInterval(interval)
    }

    useEffect(() => {
        JsonConstructorForRounds();

        currentAnswers = 0;

        const interval = setInterval(() => {
            setSeconds((seconds) => seconds - 1);
        }, 1000);

        stomp.join(listener);

        return () => clearStuff(interval);
    }, []);

    if (!question) return null;
    const sendAnswer = (selection: IGuessOption) => {
        setAnswered(true);
        controller.answer(question as any, String(selection.answerId), String(timeToAnswer - passedSeconds));
    };

    if (passedSeconds <= 0 && context.userRole === "host") {
        stomp.endRound(lobbyId);
    }

    function JsonConstructorForRounds() {
        RingSectorsRounds = [];

        const valueAdd = 100 / totalNrRounds;

        for (let i = 0; i < currentRound; i++) {
            RingSectorsRounds.push({value: valueAdd, color: 'green'});
        }
    }

    function JsonConstructorForAnswers() {
        RingSectorsAnswers = [];

        const valueAdd = 100 / expectedAnswers;

        for (let i = 0; i < currentAnswers; i++) {
            RingSectorsAnswers.push({value: valueAdd, color: 'green'});
        }
    }

    JsonConstructorForAnswers();

    return (
        <BaseContainer>
            <Stack align="center" sx={{paddingTop: 10}}>
                <Title order={2}>Guess the Artist</Title>
                <SimpleGrid cols={2}>
                    {question.options.map((option) => {
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
                                    <Text>
                                    </Text>
                                    <Stack align="center" justify="center" sx={{height: "100%"}} style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
                                        <Text lineClamp={3}
                                            sx={{
                                                fontSize: 30,
                                                fontWeight: 700,
                                                textShadow: "2px 2px 2px #000000C3",
                                                padding: 6,
                                            }}
                                        >
                                            {option.answer}
                                        </Text>
                                    </Stack>
                                </Box>
                    </UnstyledButton>
                    );})}
                </SimpleGrid>
                <Stack sx={{width: (imageSize * 2 + 15), paddingTop: 15}}>
                    <Progress value={progressVal} size="md"/>
                </Stack>
                <SimpleGrid sx={{paddingTop: 10}} cols={2}>
                    <Stack spacing={0} align={"center"}>
                        <RingProgress
                            size={65}
                            thickness={3}
                            roundCaps
                            label={
                                <Text align="center">
                                    {currentRound}/{totalNrRounds}
                                </Text>
                            }
                            sections={RingSectorsRounds}
                        />
                        <Text>Round</Text>
                    </Stack>
                    <Stack spacing={0} align={"center"}>
                        <RingProgress
                            size={65}
                            thickness={3}
                            roundCaps
                            label={
                                <Text align="center">
                                    {currentAnswers}/{expectedAnswers}
                                </Text>
                            }
                            sections={RingSectorsAnswers}
                        />
                        <Text>Answered</Text>
                    </Stack>
                </SimpleGrid>
                <SpotifyPlayer url={question.previewURL} duration={question.playDuration || 20}/>
            </Stack>
        </BaseContainer>
    );
};
