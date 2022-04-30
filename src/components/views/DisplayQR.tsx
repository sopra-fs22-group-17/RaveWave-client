import { Button, Center } from "@mantine/core";

import { Container, Stack, Title } from "@mantine/core";
import { FC } from "react";

import BaseContainer from "components/ui/BaseContainer";
import { QRCodeCanvas } from "qrcode.react";
import { IGameController } from "./GameController";

export interface IDisplayQRProps {
    controller: IGameController;
}

export const DisplayQR: FC<IDisplayQRProps> = ({ controller }) => {
    const startAction = () => controller.startGame();

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Connect Spotify
                    </Title>{" "}
                    <Stack align="stretch">
                        <Center className="displayqr column-item">
                            <QRCodeCanvas value="https://google.com/" size={250} />
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
