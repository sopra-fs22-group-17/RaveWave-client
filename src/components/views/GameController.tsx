import { Button, Center, Stack, Title } from "@mantine/core";
import { QRCodeCanvas } from "qrcode.react";
import { FC, useEffect, useState } from "react";

export type TUserRole = "host" | "player";
export type TGameState =
    | "login"
    | "register"
    | "login-spotify"
    | "game-configuration" /* configure the game */
    | "qrcode"
    | "landing"
    | "waiting"
    | "question"
    | "result"
    | "summary";

export const GameController: FC<{}> = ({}) => {
    const [role, setRole] = useState<TUserRole>("host");
    const [state, setState] = useState<TGameState>("game-configuration");

    const ctrl: IGameController = {
        gotoState: (newState: TGameState) => {
            setState(newState);
        },
    };

    if (state === "login") {
        return <LoginView controller={ctrl} />;
    } else if (state === "register") {
        return <RegisterView controller={ctrl} />;
    } else if (state === "login-spotify") {
        return <SpotifyLoginView controller={ctrl} />;
    } else if (state === "game-configuration") {
        return <GameConfigureView controller={ctrl} />;
    } else if (state === "qrcode") {
        return <QRCodeView controller={ctrl} />;
    } else if (state === "landing") {
        return <LandingView controller={ctrl} />;
    } else if (state === "waiting") {
        return <WaitingRoomView controller={ctrl} />;
    } else if (state === "question") {
        return <QuestionView controller={ctrl} />;
    } else if (state === "result") {
        return <ResultView controller={ctrl} />;
    } else if (state === "summary") {
        return <SummaryView controller={ctrl} />;
    } else {
        return <ErrorView controller={ctrl} />;
    }
};

export interface IGameController {
    gotoState(state: TGameState): void;
}

export interface IGameViewProps {
    controller: IGameController;
}

export const LoginView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>LoginView</Title>;
};

export const RegisterView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>RegisterView</Title>;
};

export const SpotifyLoginView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>SpotifyLoginView</Title>;
};

export const GameConfigureView: FC<IGameViewProps> = ({ controller }) => {
    return (
        <Stack>
            <Center>
                <Title>GameConfigureView</Title>;<Button onClick={() => controller.gotoState("qrcode")}>Show QR</Button>
            </Center>
        </Stack>
    );
};

export const QRCodeView: FC<IGameViewProps> = ({ controller }) => {
    useEffect(() => {
        setTimeout(() => {
            controller.gotoState("waiting");
        }, 5000);
    }, []);

    return (
        <Stack>
            <Center>
                <QRCodeCanvas value="https://frontwerks.com/" size={250} />,
            </Center>
        </Stack>
    );
};

export const LandingView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>LandingView</Title>;
};

export const WaitingRoomView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>WaitingRoomView</Title>;
};

export const QuestionView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>QuestionView</Title>;
};

export const ResultView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>ResultView</Title>;
};

export const SummaryView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>SummaryView</Title>;
};

export const ErrorView: FC<IGameViewProps> = ({ controller }) => {
    return <Title>OOOpppps</Title>;
};
