import {Button, Center, Container, LoadingOverlay, Stack, Text, Title} from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import {QRCodeCanvas} from "qrcode.react";
import {FC, useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {GameContext} from "../../contexts/GameContext";
import {IGameController} from "./GameController";

export interface IDisplayQRProps {
    controller: IGameController;
}

export const DisplayQR: FC<IDisplayQRProps> = ({controller}) => {
    const context = useContext(GameContext);
    const {lobbyId} = context;
    const history = useHistory();

    const [visible, setVisible] = useState(false);

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
                    <Title order={1} sx={{color: "white", padding: 20}}>
                        Join RaveWave
                    </Title>{" "}
                    <Stack align="stretch">
                        <Center className="displayqr column-item">
                            <QRCodeCanvas value={url} size={250}/>
                        </Center>
                        <Text>{url}</Text>
                    </Stack>
                    <Button onClick={start}>
                        Start Game
                    </Button>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
