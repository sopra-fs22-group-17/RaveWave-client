import { ActionIcon, Button, Center, Container, Group, LoadingOverlay, Stack, Text, Title } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { QRCodeCanvas } from "qrcode.react";
import { FC, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Check, Copy } from "tabler-icons-react";

import BaseContainer from "components/ui/BaseContainer";

import { GameContext } from "../../contexts/GameContext";
import { GameController, IGameController } from "./GameController";

export interface IDisplayQRProps {
    controller: IGameController;
}

export const DisplayQR: FC<IDisplayQRProps> = ({ controller }) => {
    const context = useContext(GameContext);
    const { lobbyId } = context;
    const history = useHistory();

    const [visible, setVisible] = useState(false);

    const clipboard = useClipboard({ timeout: 1250 });

    async function start() {
        setVisible(true);
        history.push("/game");
    }

    useEffect(() => {
        const connected = context.stomp.connect(lobbyId);
    });

    const url = `${window.location.origin}/landingplayer/${lobbyId || "1"}`;
    console.log("Game URL: " + url);

    return (
        <BaseContainer>
            <GameController role={context.userRole} />
            <LoadingOverlay visible={visible} />
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Join Game
                    </Title>{" "}
                    <Stack align="stretch">
                        <Center className="displayqr column-item" sx={{ backgroundColor: "white", padding: "10px", borderRadius: "10px" }}>
                            <QRCodeCanvas value={url} size={250} />
                        </Center>
                    </Stack>
                    <Group align="center">
                        <Text>{url}</Text>
                        <ActionIcon onClick={() => clipboard.copy(url)}>{clipboard.copied ? <Check size={19} /> : <Copy size={19} />}</ActionIcon>
                    </Group>
                    <Button onClick={start}>Start Game</Button>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
