import { Box, Title } from "@mantine/core";
import { FC, useContext, useEffect, useState } from "react";

import { IGameResult, IGuessQuestion, IMessageEvent, TUserRole } from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import { GuessArtist } from "./GuessArtist";
import { GuessLyrics } from "./GuessLyrics";
import { GuessSong } from "./GuessSong";
import { PostGame } from "./PostGame";
import { PostRound } from "./PostRound";
import { WaitingRoom } from "./WaitingRoom";

//different states in the game
export type TGameState =
    // host
    // | "configure"
    // | "invite" // QR code
    // all
    "waiting" | "question" | "result" | "summary";

export interface IGameControllerProps {
    role: TUserRole;
}

export interface IGameController {
    gotoState(state: IGameState): void;
    answer: (question: string, answerId: string) => void;
}

interface IGameState {
    type: TGameState;
    data?: IGuessQuestion | IGameResult;
}

export const GameController: FC<IGameControllerProps> = ({ role }): any => {
    const context = useContext(GameContext);
    const { stomp, lobbyId, playerName, gameConfiguration, userRole } = context;
    const [state, setState] = useState<IGameState>({ type: role === "player" ? "waiting" : "waiting" });
    // const [question, setQuestion] = useState<IGuessQuestion>();
    // const [result, setResult] = useState<IGameResult>();
    // const [summary, setSummary] = useState<IGameResult>();
    const [connected, setConnected] = useState(false);

    //wird einmal aufgerufen im lifecycle vom gamecontroller
    useEffect(() => {
        const setup = async () => {
            //const confirmation = await context.api.addPlayer(lobbyId, playerName);
            //context.setUserId(confirmation.playerId);
            //context.info(`Player '${playerName}' registered.`);

            const connected = await context.stomp.connect(lobbyId);
            context.info(`Player '${playerName}' connected.`);

            console.log(userRole);

            if (userRole === "host") {
                stomp.sendSettings(lobbyId, gameConfiguration);
            }
            setConnected(true);
        };

        const listener = (message: IMessageEvent) => {
            if (message.type === "question") {
                if (
                    message.data.question === "Guess the song" ||
                    message.data.question === "Guess the artist" ||
                    message.data.question === "Guess the lyrics"
                ) {
                    setState({ type: "question", data: message.data });
                }
            } else if (message.type === "result") {
                setState({ type: "result", data: message.data });
            } else if (message.type === "summary") {
                setState({ type: "summary", data: message.data });
            }
        };
        stomp.join(listener);
        setup();
        return () => stomp.leave(listener); //wer de funktion aufruft veranlasst unds zu leave
    }, []);

    const ctrl: IGameController = {
        gotoState: (newState: IGameState) => {
            // setState(newState);
        },

        answer: (question: string, answerId: string) => {
            const token = localStorage.getItem('token');
            stomp.saveAnswer(lobbyId, { playerGuess: answerId, answerTime: "30", token });
        },
    };

    if (!connected) {
        return null;
    }

    if (state.type === "waiting") {
        return <WaitingRoom controller={ctrl} />;
    } else if (state.type === "question") {
        const question = state.data as IGuessQuestion;
        if (question.question === "Guess the song") {
            return <GuessSong controller={ctrl} question={question} />;
        } else if (question.question === "Guess the artist") {
            return <GuessArtist controller={ctrl} question={question} />;
        } else if (question.question === "Guess the lyrics") {
            return <GuessLyrics controller={ctrl} question={question} />;
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
