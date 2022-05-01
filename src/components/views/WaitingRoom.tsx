import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { FC, useContext } from "react";
import GridLoader from "react-spinners/GridLoader";

import BaseContainer from "components/ui/BaseContainer";
import { GameContext } from "contexts/GameContext";

import { IGameController } from "./GameController";

export interface IWaitingRoomProps {
    controller: IGameController;
}

export const WaitingRoom: FC<IWaitingRoomProps> = ({ controller }) => {
    const context = useContext(GameContext);

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Waiting Room
                    </Title>
                    <Text>{context.userRole}</Text>
                    <Text>{context.lobbyId}</Text>
                    <GridLoader color="white" size={30} margin={4} />
                    <Stack align="stretch" sx={{ paddingTop: 40 }}>
                        <Box>Waiting for the host to start the game.</Box>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
