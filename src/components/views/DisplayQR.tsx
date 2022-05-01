import { Button, Center, Container, Stack, Text, Title } from "@mantine/core";
import { QRCodeCanvas } from "qrcode.react";
import { FC, useContext } from "react";

import BaseContainer from "components/ui/BaseContainer";

import { GameContext } from "../../contexts/GameContext";
import { IGameController } from "./GameController";

export interface IDisplayQRProps {
    controller: IGameController;
}

export const DisplayQR: FC<IDisplayQRProps> = ({ controller }) => {
    const context = useContext(GameContext);
    const { lobbyId } = context;
    const startAction = () => {};

    const url = `${window.location.origin}/landingplayer/${lobbyId || "1"}`;
    console.log("Game URL: " + url);

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Join RaveWave
                    </Title>{" "}
                    <Stack align="stretch">
                        <Center className="displayqr column-item">
                            <QRCodeCanvas value={url} size={250} />
                        </Center>
                        <Text>{url}</Text>
                        <Button onClick={startAction} className="displayqr start">
                            Start Game
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
