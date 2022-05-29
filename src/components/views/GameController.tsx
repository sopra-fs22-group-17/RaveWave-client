import { Box, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FC, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { IGameConfiguration, IGameResult, IGuessQuestion, IMessageEvent, TUserRole } from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import { GuessArtist } from "./GuessArtist";
import { GuessLikedSong } from "./GuessLikedSong";
import { GuessSong } from "./GuessSong";
import { PostGame } from "./PostGame";
import { PostRound } from "./PostRound";
import { WaitingRoom } from "./WaitingRoom";

export type TGameState = "waiting" | "question" | "result" | "summary";

export interface IGameControllerProps {
    role: TUserRole;
}

export interface IGameController {
    answer: (question: string, answerId: string, answerT: string) => void;

    gotoState(state: IGameState): void;
}

interface IGameState {
    type: TGameState;
    data?: IGuessQuestion | IGameResult;
}

export const GameController: FC<IGameControllerProps> = ({ role }): any => {
    const context = useContext(GameContext);
    const { stomp, lobbyId, playerName, gameConfiguration, userRole } = context;
    const [state, setState] = useState<IGameState>({ type: role === "player" ? "waiting" : "waiting" });

    const [connected, setConnected] = useState(false);
    const [likedSongsGameUnlocked, setLikedSongsGameUnlocked] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const setup = async () => {
            const connected = await context.stomp.connect(lobbyId);

            if (userRole === "host") {
                stomp.sendSettings(lobbyId, gameConfiguration);
            }
            setConnected(true);
        };

        const listener = (message: IMessageEvent) => {
            if (message.type === "question") {
                if (
                    message.data.question === "Guess the song title" ||
                    message.data.question === "Guess the song artist" ||
                    message.data.question === "Guess the liked song"
                ) {
                    setState({ type: "question", data: message.data });
                }
            } else if (message.type === "result") {
                setState({ type: "result", data: message.data });
                if (message.data.gameOver === true) {
                    setTimeout(() => {
                        setState({ type: "summary", data: message.data });
                    }, 3000);
                }
            } else if (message.type === "summary") {
                setState({ type: "summary", data: message.data });
            } else if (message.type === "playerJoin") {
                showNotification({ message: message.data.name + " joined the Lobby.", autoClose: 3000 });
                setLikedSongsGameUnlocked(message.data.likedGameModeUnlocked);
            } else if (message.type === "setup") {
                const config: IGameConfiguration = {
                    gameMode: message.data.gameMode,
                    gameRounds: message.data.gameRounds,
                    playBackDuration: message.data.playBackDuration,
                    songPool: message.data.songPool,
                    roundDuration: message.data.roundDuration,
                };
                context.setGameConfiguration(config);
            }
        };
        stomp.join(listener);
        setup();
        return () => stomp.leave(listener);
    }, []);

    const ctrl: IGameController = {
        gotoState: (newState: IGameState) => {},

        answer: (question: string, answerId: string, answerT: string) => {
            const token = sessionStorage.getItem("token");
            stomp.saveAnswer(lobbyId, { playerGuess: answerId, answerTime: answerT, token });
        },
    };

    if (!connected) {
        return null;
    }

    if (state.type === "waiting") {
        return <WaitingRoom controller={ctrl} />;
    } else if (state.type === "question") {
        const question = state.data as IGuessQuestion;
        if (question.question === "Guess the song title") {
            return <GuessSong controller={ctrl} question={question} />;
        } else if (question.question === "Guess the song artist") {
            return <GuessArtist controller={ctrl} question={question} />;
        } else if (question.question === "Guess the liked song") {
            return <GuessLikedSong controller={ctrl} question={question} />;
        }
        return <Box>{"Unknown question type: " + question.question}</Box>;
    } else if (state.type === "result") {
        const result = state.data as IGameResult;
        return <PostRound controller={ctrl} result={result} />;
    } else if (state.type === "summary") {
        const summary = state.data as IGameResult;
        return <PostGame controller={ctrl} result={summary} />;
    } else {
        return <ErrorView controller={ctrl} />;
    }
};

export interface IGameViewProps {
    controller: IGameController;
}

const ErrorView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>OOOpppps</Title>;
};
