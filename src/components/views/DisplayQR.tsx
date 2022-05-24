import {Button, Center, Container, LoadingOverlay, Stack, Text, Title, Group, ActionIcon} from "@mantine/core";
import { useClipboard } from '@mantine/hooks';
import BaseContainer from "components/ui/BaseContainer";
import {QRCodeCanvas} from "qrcode.react";
import {FC, useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {GameContext} from "../../contexts/GameContext";
import {IGameController} from "./GameController";
import { Copy, Check } from 'tabler-icons-react';

export interface IDisplayQRProps {
    controller: IGameController;
}

export const DisplayQR: FC<IDisplayQRProps> = ({controller}) => {
    const context = useContext(GameContext);
    const {lobbyId} = context;
    const history = useHistory();

    const [visible, setVisible] = useState(false);

    const clipboard = useClipboard({ timeout: 1000 });

    async function start() {
        setVisible(true);
        history.push('/game');
    }

    const url = `${window.location.origin}/landingplayer/${lobbyId || "1"}`;
    console.log("Game URL: " + url);

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
                        <Text>{url}</Text>
                    </Stack>
                    <Group sx={{ paddingTop: 10 }}>
                        <ActionIcon onClick={() => clipboard.copy(url)}>
                            {clipboard.copied ? <Check/> : <Copy/>}
                        </ActionIcon>
                    <Button onClick={start}>
                        Start Game
                    </Button>
                    </Group>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
