import { Button, Container, Group, LoadingOverlay, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FC, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import { GameContext } from "../../contexts/GameContext";
import customLoader from "./RWLogo";

export const Login: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const { api, userRole, playerName, currentURL } = context;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const [visible, setVisible] = useState(false);

    let redirectPath = "";
    let backPath = "";

    if (userRole === "host") {
        redirectPath = "/selectgamemode";
        backPath = "/landinghost";
    } else {
        redirectPath = "/game";
        const lobbyID = context.lobbyId;
        backPath = "/landingplayer/" + lobbyID.toString();
        context.setLobbyId(lobbyID);
    }

    async function doLogin() {
        setVisible(true);

        try {
            const nameofPlayer = username;
            context.setPlayerName(nameofPlayer);
            sessionStorage.setItem("name", nameofPlayer);
            await api.loginUser(username, password);
            if (context.userRole === "player") {
                await api.addPlayer(context.lobbyId, username);
                sessionStorage.setItem("name", "[RW] " + username);
                context.setPlayerName(sessionStorage.getItem("name"));
            }
            showNotification({ message: "Login was successful. Welcome back RaveWaver " + nameofPlayer + ".", autoClose: 3000 });
            history.push(redirectPath);
        } catch (error) {
            console.error(`Something went wrong while logging in the user: \n${api.handleError(error)}`);
            setVisible(false);
        }
    }

    async function doBack() {
        history.push(backPath);
    }

    return (
        <BaseContainer>
            <LoadingOverlay visible={visible} loader={customLoader} />
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 5 }}>
                        Login
                    </Title>{" "}
                    <Container size={200}>
                        <Stack spacing="lg">
                            <TextInput value={username} placeholder="Username" label="Username" onChange={(un) => setUsername(un.currentTarget.value)} />
                            <PasswordInput value={password} placeholder="Password" label="Password" onChange={(pw) => setPassword(pw.currentTarget.value)} />
                        </Stack>
                    </Container>
                    <Group sx={{ paddingTop: 10 }}>
                        <Button onClick={doBack} size="md">
                            Back
                        </Button>
                        <Button onClick={doLogin} disabled={!username || !password} size="md">
                            Login
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
