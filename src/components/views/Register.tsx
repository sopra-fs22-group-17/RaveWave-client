import { Button, Container, Group, LoadingOverlay, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FC, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import { GameContext } from "../../contexts/GameContext";
import customLoader from "./RWLogo";

export const Register: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const { api, userRole, currentURL } = context;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setrePassword] = useState("");
    const history = useHistory();

    const [visible, setVisible] = useState(false);

    let redirectPath = "";
    let backPath = "";

    console.log("THIS IS USER ROLE " + userRole);
    if (userRole === "host") {
        redirectPath = "/connectspotify";
        backPath = "/landinghost";
    } else {
        redirectPath = "/connectspotify";
        const lobbyID = context.lobbyId;
        backPath = "/landingplayer/" + lobbyID.toString();
        context.setLobbyId(lobbyID);
    }

    async function doRegister() {
        setVisible(true);

        try {
            const nameofPlayer = username;
            context.setPlayerName(nameofPlayer);
            sessionStorage.setItem("name", nameofPlayer);
            await api.registerUser(username, password);
            showNotification({ message: "Registration was successful. Welcome RaveWaver " + nameofPlayer + "." });
            if (context.userRole === "player") {
                sessionStorage.setItem("lobbyId", context.lobbyId);
                await api.addPlayer(context.lobbyId, username);
                showNotification({ message: "Registration was successful. Welcome RaveWaver " + nameofPlayer + "." });
            }
            history.push(redirectPath);
        } catch (error) {
            console.error(`Something went wrong while registering the user: \n${api.handleError(error)}`);
            setVisible(false);
        }
    }

    async function doBack() {
        setVisible(true);
        history.push(backPath);
    }

    return (
        <BaseContainer>
            <LoadingOverlay visible={visible} loader={customLoader} />
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 5 }}>
                        Register
                    </Title>{" "}
                    <Container size={200}>
                        <Stack spacing="lg">
                            <TextInput value={username} placeholder="Username" label="Username" onChange={(un) => setUsername(un.currentTarget.value)} />
                            <PasswordInput value={password} placeholder="Password" label="Password" onChange={(pw) => setPassword(pw.currentTarget.value)} />
                            <PasswordInput
                                value={repassword}
                                placeholder="Password"
                                label="Password"
                                onChange={(rpw) => setrePassword(rpw.currentTarget.value)}
                            />
                        </Stack>
                    </Container>
                    <Group sx={{ paddingTop: 10 }}>
                        <Button onClick={doBack} size="md">
                            Back
                        </Button>
                        <Button onClick={doRegister} disabled={!username || !password || !repassword || password !== repassword} size="md">
                            Register
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
