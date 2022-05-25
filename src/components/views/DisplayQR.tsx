import {Button, Center, Container, LoadingOverlay, Stack, Text, Title, Group, ActionIcon} from "@mantine/core";
import { useClipboard } from '@mantine/hooks';
import BaseContainer from "components/ui/BaseContainer";
import {QRCodeCanvas} from "qrcode.react";
import {FC, useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {GameContext} from "../../contexts/GameContext";
import {IGameController} from "./GameController";
import { Copy, Check } from 'tabler-icons-react';
import {IMessageEvent} from "../../api/@def";

export interface IDisplayQRProps {
    controller: IGameController;
}

export const DisplayQR: FC<IDisplayQRProps> = ({controller}) => {
    const context = useContext(GameContext);
    const {lobbyId, stomp} = context;
    const history = useHistory();

    const [visible, setVisible] = useState(false);

    const clipboard = useClipboard({ timeout: 1250 });

    async function start() {
        setVisible(true);
        history.push('/game');
    }

    const url = `${window.location.origin}/landingplayer/${lobbyId || "1"}`;
    console.log("Game URL: " + url);
    const connected = context.stomp.connect(lobbyId);
    const listener = (message: IMessageEvent) => {
        if (message.type === "playerJoin") {
            context.info("Player " + message.data.name + " joined the lobby");
        }
    };
    stomp.join(listener);

    return (
        <BaseContainer>
            <LoadingOverlay visible={visible} />
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{color: "white", paddingBottom: 15}}>
                        Join game
                    </Title>{" "}
                    <Stack align="stretch">
                        <Center className="displayqr column-item">
                            <QRCodeCanvas value={url} size={250}/>
                        </Center>
                    </Stack>
                    <Group align="center">
                        <Text>{url}</Text>
                        <ActionIcon onClick={() => clipboard.copy(url)}>
                            {clipboard.copied ? <Check size={19}/> : <Copy size={19}/>}
                        </ActionIcon>
                    </Group>
                    <Button onClick={start}>
                        Start Game
                    </Button>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
