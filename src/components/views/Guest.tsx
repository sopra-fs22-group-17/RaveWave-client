import {Button, Container, LoadingOverlay, Group, Stack, TextInput, Title} from "@mantine/core";
import {FC, useContext, useState} from "react";
import {useHistory} from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import {GameContext} from "../../contexts/GameContext";
import customLoader from "./RWLogo";

export const Guest: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const {api, playerName} = context;
    const history = useHistory();

    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");

    async function doGuest() {
        try {
            setVisible(true);
            const nameofPlayer = username;
            const roleofPlayer = "player";
            context.setPlayerName(nameofPlayer);
            context.setUserRole(roleofPlayer);
            sessionStorage.setItem('name', nameofPlayer);
            sessionStorage.setItem('role', roleofPlayer);
            await api.addPlayer(context.lobbyId, username);
            history.push('/game');
        } catch (error) {
            console.error(`Something went wrong while guest the user: \n${api.handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while registering the user! See the console for details.");
            setVisible(false);
        }
    }

    async function doBack() {
        setVisible(true);
        const lobbyID = context.lobbyId;
        context.setLobbyId(lobbyID);
        history.push("/landingplayer/" + lobbyID.toString());
    }

    return (
        <BaseContainer>
            <LoadingOverlay visible={visible} loader={customLoader}/>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{color: "white", padding: 20}}>
                        Guest
                    </Title>{" "}
                    <TextInput value={username} placeholder="Username" label="Username"
                               onChange={(un) => setUsername(un.currentTarget.value)}/>
                    <Group sx={{ paddingTop: 10 }}>
                        <Button onClick={doBack}>
                            Back
                        </Button>
                        <Button onClick={doGuest} disabled={!username}>
                            Continue
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
