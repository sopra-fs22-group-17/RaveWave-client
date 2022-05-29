import { Box, Container, LoadingOverlay, Stack, Text, Title } from "@mantine/core";
import { FC, useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";

import BaseContainer from "components/ui/BaseContainer";
import { GameContext } from "contexts/GameContext";

import { IGameController } from "./GameController";
import RWLogo from "./RWLogo";

export interface IWaitingRoomProps {
    controller: IGameController;
}

export const WaitingRoom: FC<IWaitingRoomProps> = () => {
    const context = useContext(GameContext);
    const { userRole, lobbyId, stomp } = context;

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (userRole === "host") {
            setVisible(true);
            stomp.startGame(lobbyId);
        }
    }, []);

    return (
        <BaseContainer>
            <LoadingOverlay visible={visible} loader={RWLogo} />
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Waiting Room
                    </Title>
                    <Text>Connected to Lobby {context.lobbyId}.</Text>
                    <GridLoader color="white" size={30} margin={4} />
                    <Stack align="stretch" sx={{ paddingTop: 40 }}>
                        <Box>Waiting for the host to start the game.</Box>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
