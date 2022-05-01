import { Button, Container, Input, InputWrapper, Stack, Title } from "@mantine/core";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import { GameContext } from "../../contexts/GameContext";

export const Guest: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const [stompConnected, setStompConnected] = useState(false);
    const [username, setUsername] = useState(null);
    const stompMessage = stompConnected ? "StompConnected" : "Stomp not connected";

    const connectServer = () => {
        context.api.connect(context.lobbyId, () => {
            setStompConnected(true);
        });
    };

    const startGame = () => {
        context.api.startGame(context.lobbyId);
    };

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Guest
                    </Title>{" "}
                    <InputWrapper id="guestname" required label="Guest name" description="" error="">
                        <Input placeholder="Username" onChange={(un) => setUsername(un)} sx={{ backgroundColor: "#2f036b", color: "white" }} />
                    </InputWrapper>
                    <Stack align="stretch">
                        <Button component={Link} to="/landingplayer">
                            Back
                        </Button>
                        <Button onClick={() => connectServer()}>Connect server</Button>
                        <Button onClick={() => startGame()}>Start game</Button>
                        <Button component={Link} to="/game">
                            Continue
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
