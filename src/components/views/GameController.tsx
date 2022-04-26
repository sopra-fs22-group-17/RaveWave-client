import { Avatar, Button, Group, Stack, Title } from "@mantine/core";
import { QRCodeCanvas } from "qrcode.react";
import { FC, useEffect, useRef, useState } from "react";
import { IGameAnswerOption, IGameQuestion, IGameResult, TUserRole } from "../../api/@def";
import { IMessageEvent } from "../../api/API";
import { useAPI } from "../../hooks/useAPI";
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
    answer: (questionId: string, answerId: string) => void;
}

export const GameController: FC<IGameControllerProps> = ({ role }) => {
    const [state, setState] = useState<TGameState>(role === "player" ? "waiting" : "configure");
    const [question, setQuestion] = useState<IGameQuestion>();
    const [result, setResult] = useState<IGameResult>();

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
            }
        };
        api.join(listener);
    }, []);

    const ctrl: IGameController = {
        gotoState: (newState: TGameState) => {
            setState(newState);
        },
        startGame: () => {
            api.send("ch1", "command", { method: "start" });
        },
        answer: (questionId: string, answerId: string) => {
            api.send("ch1", "command", { method: "answer", answer: { questionId, answerId } });
        },
    };

    if (state === "configure") {
        return <GameConfigureView controller={ctrl} />;
    } else if (state === "invite") {
        return <InviteView controller={ctrl} />;
    } else if (state === "waiting") {
        return <WaitingRoomView controller={ctrl} />;
    } else if (state === "question") {
        return <QuestionView controller={ctrl} question={question} />;
    } else if (state === "result") {
        return <ResultView controller={ctrl} result={result} />;
    } else if (state === "summary") {
        return <SummaryView controller={ctrl} />;
    } else {
        return <ErrorView controller={ctrl} />;
    }
};

export interface IGameViewProps {
    controller: IGameController;
}

const GameConfigureView: FC<IGameViewProps> = ({ controller }) => {
    const inviteAction = () => controller.gotoState("invite");

    return (
        <Stack align="center">
            <Title>GameConfigureView</Title>
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
        controller.answer(question.questionId, selection.id);
    };
    return (
        <Stack>
            <Title>QuestionView</Title>
            <div>{question.questionId}</div>
            <div>{question.type}</div>
            {question.options.map((option, i) => {
                return (
                    <Button key={i} disabled={answered} onClick={() => sendAnswer(option)}>
                        {option.label}
                    </Button>
                );
            })}
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
                    </Group>
                );
            })}
        </Stack>
    );
};

const SummaryView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>SummaryView</Title>;
};

const ErrorView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>OOOpppps</Title>;
};
