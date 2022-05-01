import { Box, Title } from "@mantine/core";
import { FC, useContext, useEffect, useRef, useState } from "react";

import { IGameConfiguration, IGameResult, IGuessQuestion, IMessageEvent, TUserRole } from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import { DisplayQR } from "./DisplayQR";
import { GuessArtist } from "./GuessArtist";
import { GuessLyrics } from "./GuessLyrics";
import { GuessSong } from "./GuessSong";
import { PostGame } from "./PostGame";
import { PostRound } from "./PostRound";
import { SelectGameMode } from "./SelectGameMode";
import { WaitingRoom } from "./WaitingRoom";

//different states in the game
export type TGameState =
    // host
    | "configure"
    | "invite" // QR code
    // all
    | "waiting"
    | "question"
    | "result"
    | "summary";

export interface IGameControllerProps {
    role: TUserRole;
}

export interface IGameController {
    gotoState(state: TGameState): void;
    answer: (question: string, answerId: string) => void;
}

export const GameController: FC<IGameControllerProps> = ({ role }): any => {
    const context = useContext(GameContext);
    const [userId, setUserId] = useState("3");
    const [state, setState] = useState<TGameState>(role === "player" ? "waiting" : "waiting");
    const [config, setConfig] = useState<IGameConfiguration>();
    const [question, setQuestion] = useState<IGuessQuestion>();
    const [result, setResult] = useState<IGameResult>();
    const [summary, setSummary] = useState<IGameResult>();

    const ref = useRef<any>();
    const api = context.api;

    //wird einmal aufgerufen im lifecycle vom gamecontroller
    useEffect(() => {
        const listener = (message: IMessageEvent) => {
            if (message.data) {
                if (
                    message.data.question === "Guess the song" ||
                    message.data.question === "Guess the artist" ||
                    message.data.question === "Guess the lyrics"
                ) {
                    setQuestion(message.data);
                    setState("question");
                }
            } else if (message.type === "result") {
                setState("result");
                ref.current = message;
                setResult(message.data);
            } else if (message.type === "summary") {
                setState("summary");
                ref.current = message;
                setSummary(message.data);
            }
        };
        api.join(listener);
        return () => api.leave(listener); //wer de funktion aufruft veranlasst unds zu leave
    }, []);

    const ctrl: IGameController = {
        gotoState: (newState: TGameState) => {
            setState(newState);
        },

        answer: (question: string, answerId: string) => {
            //api.send("ch1", "command", { method: "answer", answer: { question, answerId } });
        },
    };

    if (state === "configure") {
        return <SelectGameMode controller={ctrl} />;
    } else if (state === "invite") {
        return <DisplayQR controller={ctrl} />;
    } else if (state === "waiting") {
        return <WaitingRoom controller={ctrl} />;
    } else if (state === "question") {
        if (question.question === "Guess the song") {
            return <GuessSong controller={ctrl} question={question} />;
        } else if (question.question === "Guess the artist") {
            return <GuessArtist controller={ctrl} question={question} />;
        } else if (question.question === "Guess the lyrics") {
            return <GuessLyrics controller={ctrl} question={question} />;
        }
        return <Box>{"Unknown question type: " + question.question}</Box>;
    } else if (state === "result") {
        return <PostRound controller={ctrl} result={result} />;
    } else if (state === "summary") {
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
