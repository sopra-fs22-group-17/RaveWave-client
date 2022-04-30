import { Button, Center, Container, Stack, Title } from "@mantine/core";
import { FC } from "react";

import BaseContainer from "components/ui/BaseContainer";
import { QRCodeCanvas } from "qrcode.react";
import { IGameController } from "./GameController";

export interface IDisplayQRProps {
    controller: IGameController;
    gameId: string;
}

export const DisplayQR: FC<IDisplayQRProps> = ({ controller, gameId }) => {
    const startAction = () => controller.startGame();

    const url = `${window.location.origin}/game/${gameId || "1"}`;
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
                        <Button onClick={startAction} className="displayqr start">
                            Start Game
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
