import { Button, Container, TextInput, Stack, Title } from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import { FC, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";
import {remote} from "../../api/RestApi";

export const Guest: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const history = useHistory();
    const { api, playerName } = context;

    const [username, setUsername] = useState('');

    const setUserName = (name: string) => {
        context.setPlayerName(name);
    };

    async function doGuest() {
        try {
            const confirmation = await api.addPlayer(context.lobbyId, username);
            setUserName(username);
            context.setUserId(confirmation.id);
            context.info(`Player '${playerName}' registered.`);
            context.setUserRole("player");
            history.push("/game");
        } catch (error) {
            console.error(`Something went wrong while registering the user: \n${api.handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while registering the user! See the console for details.");
        }
    }

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{color: "white", padding: 20}}>
                        Guest
                    </Title>{" "}
                    <TextInput value={username} placeholder="Username" label="Username"
                               onChange={(un) => setUsername(un.currentTarget.value)}/>
                    <Stack align="stretch">
                        <Button component={Link} to="/landingplayer">
                            Back
                        </Button>
                        <Button onClick={doGuest} disabled={!username}>
                            Continue
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
