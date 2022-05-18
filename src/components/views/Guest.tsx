import { Button, Container, Stack, TextInput, Title } from "@mantine/core";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import { GameContext } from "../../contexts/GameContext";

export const Guest: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const { api, playerName } = context;

    const [username, setUsername] = useState("");

    async function doGuest() {
        try {
            await api.addPlayer(context.lobbyId, username, context.userRole);
            context.setPlayerName(username);
            context.setUserRole("player");
        } catch (error) {
            console.error(`Something went wrong while guest the user: \n${api.handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while registering the user! See the console for details.");
        }
    }

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Guest
                    </Title>{" "}
                    <TextInput value={username} placeholder="Username" label="Username" onChange={(un) => setUsername(un.currentTarget.value)} />
                    <Stack align="stretch">
                        <Button component={Link} to="/landingplayer">
                            Back
                        </Button>
                        <Link to="/game">
                            <Button onClick={doGuest} disabled={!username}>
                                Continue
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
