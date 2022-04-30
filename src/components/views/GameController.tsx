import { Avatar, Button, Group, Slider, Stack, Text, Title } from "@mantine/core";
import { QRCodeCanvas } from "qrcode.react";
import { FC, useEffect, useRef, useState } from "react";

import { IGameAnswerOption, IGameConfiguration, IGameQuestion, IGameResult, IGameSummary, IMessageEvent, TUserRole } from "../../api/@def";
import { stompClient } from "../../api/StompApi";
import { useAPI } from "../../hooks/useAPI";
import GuessArtist from "./GuessArtist";
import GuessSong from "./GuessSong";
import GuessLyrics from "./GuessLyrics";
import SelectGameMode from "./SelectGameMode";
import DisplayQR from "./DisplayQR";
import WaitingRoom from "./WaitingRoom";
import PostGame from "./PostGame";
import PostRound from "./PostRound";

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
    startGame: () => void;
    answer: (question: string, answerId: string) => void;
    configure: (gameMode: string, numberOfRounds: number, playbackSpeed: number, playbackDuration: number) => void;
    setConfig: (configuration: IGameConfiguration) => void;
}

export const GameController: FC<IGameControllerProps> = ({ role }): any => {
    const [state, setState] = useState<TGameState>(role === "player" ? "waiting" : "configure");
    const [config, setConfig] = useState<IGameConfiguration>();
    const [question, setQuestion] = useState<IGameQuestion>();
    const [result, setResult] = useState<IGameResult>();
    const [summary, setSummary] = useState<IGameSummary>();

    const ref = useRef<any>();
    const api = useAPI();

    useEffect(() => {
        const listener = (message: IMessageEvent) => {
            if (message.type === "question") {
                setState("question");
                setQuestion(message.data);
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
    }, []);

    const ctrl: IGameController = {
        gotoState: (newState: TGameState) => {
            setState(newState);
        },
        configure: (gameMode: string, numberOfRounds: number, playbackSpeed: number, playbackDuration: number) => {
            api.send("ch1", "command", { method: "configure", configure: { gameMode, numberOfRounds, playbackSpeed, playbackDuration } });
        },
        startGame: () => {
            api.send("ch1", "command", { method: "start", config });
        },
        answer: (question: string, answerId: string) => {
            api.send("ch1", "command", { method: "answer", answer: { question, answerId } });
        },
        setConfig: (configuration: IGameConfiguration) => {
            setConfig(configuration);
        },
    };

    if (state === "configure") {
        return <SelectGameMode controller={ctrl} />;
    } else if (state === "invite") {
        return <DisplayQR controller={ctrl} />;
    } else if (state === "waiting") {
        return <WaitingRoom controller={ctrl} />;
    } else if (state === "question" && question.question === "Guess the song artist") {
        return <GuessArtist controller={ctrl} question={question} />;
    } else if (state === "question" && question.question === "Guess the song name") {
        return <GuessSong controller={ctrl} question={question} />;
    } else if (state === "question" && question.question === "Guess the song lyrics") {
        return <GuessLyrics controller={ctrl} question={question} />;
    } else if (state === "result") {
        return <PostRound controller={ctrl} result={result} />;
    } else if (state === "summary") {
        return <PostGame controller={ctrl} summary={summary} />;
    } else {
        return <ErrorView controller={ctrl} />;
    }
};

export interface IGameViewProps {
    controller: IGameController;
}

export interface IConfigurationViewProps extends IGameViewProps {
    // configuration: IGameConfiguration;
}

const GameConfigureView: FC<IConfigurationViewProps> = ({ controller }) => {
    const [config, setConfig] = useState<IGameConfiguration>({
        gameMode: "guesstheartist",
        numberOfRounds: 5,
        playbackSpeed: 1,
        playbackDuration: 15,
    });

    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        stompClient.connect(setIsConnected(true));
    }, []);

    if (!isConnected) {
        return null;
    }

    const updateConfig = (configuration: Partial<IGameConfiguration>) => {
        setConfig(Object.assign({}, config, configuration));
    };
    const inviteAction = () => {
        controller.setConfig(config);
        controller.gotoState("invite");
    };

    return (
        <Stack align="center">
            <Title>GameConfigureView</Title>
            <Stack>
                <Text>Number of Roundss</Text>
                <Slider value={config.numberOfRounds} min={1} max={10} onChange={(value) => updateConfig({ numberOfRounds: value })} />
            </Stack>
            <Button onClick={inviteAction}>Invite</Button>
        </Stack>
    );
};

const InviteView: FC<IGameViewProps> = ({ controller }) => {
    const startAction = () => controller.startGame();

    return (
        <Stack align="center">
            <QRCodeCanvas value="http://192.168.1.116:3000/game/abcd" size={250} />
            <Button onClick={startAction}>Start</Button>
        </Stack>
    );
};

const WaitingRoomView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>WaitingRoomView</Title>;
};

export interface IQuestionViewProps extends IGameViewProps {
    question: IGameQuestion;
}

const QuestionView: FC<IQuestionViewProps> = ({ controller, question }) => {
    const [answered, setAnswered] = useState(false);
    // const sendAnswer = (answer: {questionId: question.questionId, answerId: answer) => {
    //     controller.answer()
    // };
    if (!question) return null;
    const sendAnswer = (selection: IGameAnswerOption) => {
        setAnswered(true);
        controller.answer(question.question, selection.id);
    };

    return (
        <Stack>
            <Title>QuestionView</Title>
            <div>{question.question}</div>
            {question.options.map((option, i) => {
                return (
                    <Button key={i} disabled={answered} onClick={() => sendAnswer(option)}>
                        {option.label}
                    </Button>
                );
            })} { //<GuessArtist question={question} answer={answer} />
                }
        </Stack>
    );
};

export interface IResultViewProps extends IGameViewProps {
    result: IGameResult;
}

const ResultView: FC<IResultViewProps> = ({ controller, result }) => {
    if (!result) return null;

    return (
        <Stack align="center">
            <Title>ResultView</Title>
            <div>{result.correctAnswer.label}</div>
            {result.results.map((res, i) => {
                return (
                    <Group key={i}>
                        <Avatar color="cyan" radius="xl">
                            {res.username.substring(0, 1)}
                        </Avatar>
                        {res.correctness ? "OK" : "FAIL"}
                        {res.currentPoints}
                        {res.currentRank}
                    </Group>
                );
            })}
        </Stack>
    );
};

export interface IFinalResultViewProps extends IGameViewProps {
    summary: IGameSummary;
}

const SummaryView: FC<IFinalResultViewProps> = ({ controller, summary }) => {
    if (!summary) {
        return null;
    }

    return (
        <Stack align="center">
            <Title>SummaryView</Title>
            {summary.summary.map((res, i) => {
                return (
                    <Group key={i}>
                        <Avatar color="cyan" radius="xl">
                            {res.username.substring(0, 1)}
                        </Avatar>
                        {res.finalPoints}
                        {res.finalRank}
                    </Group>
                );
            })}
        </Stack>
    );
};

const ErrorView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>OOOpppps</Title>;
};