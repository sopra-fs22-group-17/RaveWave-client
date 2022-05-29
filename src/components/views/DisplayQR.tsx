import { ActionIcon, Button, Center, Container, Group, LoadingOverlay, Stack, Text, Title } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { QRCodeCanvas } from "qrcode.react";
import { FC, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Check, Copy } from "tabler-icons-react";

import BaseContainer from "components/ui/BaseContainer";

import { IMessageEvent } from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import { GameController, IGameController } from "./GameController";
import RWLogo from "./RWLogo";

export interface IDisplayQRProps {
    controller: IGameController;
}

export const DisplayQR: FC<IDisplayQRProps> = () => {
    const context = useContext(GameContext);
    const { stomp, lobbyId, gameConfiguration } = context;
    const history = useHistory();

    context.setLobbyId(sessionStorage.getItem("lobbyId"));
    context.setPlayerName(sessionStorage.getItem("name"));
    if (sessionStorage.getItem("role") == "host") {
        context.setUserRole("host");
    } else {
        context.setUserRole("player");
    }

    const [visible, setVisible] = useState(false);
    const [likedSongsGameUnlocked, setLikedSongsGameUnlocked] = useState(false);

    const clipboard = useClipboard({ timeout: 1250 });

    async function start() {
        setVisible(true);
        history.push("/game");
    }
    useEffect(() => {
        if (gameConfiguration.gameMode === "Guess the song artist" || gameConfiguration.gameMode === "Guess the song title") {
            setLikedSongsGameUnlocked(true);
        }
        const setup = async () => {
            await context.stomp.connect(lobbyId);
            stomp.sendSettings(lobbyId, gameConfiguration);
        };
        const listener = (message: IMessageEvent) => {
            if (message.type === "playerJoin") {
                setLikedSongsGameUnlocked(message.data.likedGameModeUnlocked);
            }
        };

        stomp.join(listener);
        setup();
        return () => stomp.leave(listener);
    });

    const url = `${window.location.origin}/landingplayer/${lobbyId || "1"}`;

    return (
        <BaseContainer>
            <GameController role={context.userRole} />
            <LoadingOverlay visible={visible} loader={RWLogo} />
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
                    <Group align="center" sx={{ justifyContent: "center" }}>
                        <Text>{url}</Text>
                        <ActionIcon onClick={() => clipboard.copy(url)}>{clipboard.copied ? <Check size={19} /> : <Copy size={19} />}</ActionIcon>
                        {!likedSongsGameUnlocked ? <Text>This Game Mode requires 4 Players with a RaveWaver Account.</Text> : <div></div>}
                    </Group>
                    {!likedSongsGameUnlocked ? <Text>You need at least 4 players !!</Text> : <Text></Text>}
                    <Button onClick={start} disabled={!likedSongsGameUnlocked}>
                        Start Game
                    </Button>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
