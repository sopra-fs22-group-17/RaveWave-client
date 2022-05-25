import {Button, Container, Group, LoadingOverlay, PasswordInput, Stack, TextInput, Title} from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import {FC, useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {GameContext} from "../../contexts/GameContext";

export const Login: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const {api, userRole, playerName, currentURL} = context;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const [visible, setVisible] = useState(false);

    let redirectPath = "";
    let backPath = "";

    async function doLogin() {
        setVisible(true);
        if (currentURL.includes("landinghost")) {
            // host
            const roleofPlayer = "host";
            context.setUserRole(roleofPlayer);
            sessionStorage.setItem('role', roleofPlayer);
            redirectPath = "/selectgamemode";
            backPath = "/landinghost";
        } else {
            // player
            const roleofPlayer = "player";
            context.setUserRole(roleofPlayer);
            sessionStorage.setItem('role', roleofPlayer);
            redirectPath = "/game";
            backPath = "/landingplayer";
        }

        try {
            const nameofPlayer = username;
            context.setPlayerName(nameofPlayer);
            sessionStorage.setItem('name', nameofPlayer);
            await api.loginUser(username, password);
            if (context.userRole === "player") {
                await api.addPlayer(context.lobbyId, username);
            }
            history.push(redirectPath);
        } catch (error) {
            console.error(`Something went wrong while loggin in the user: \n${api.handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while loggin in the user! See the console for details.");
            setVisible(false);
        }
    }

    async function doBack() {
        setVisible(true);
        history.push(backPath);
    }

    return (
        <BaseContainer>
            <LoadingOverlay visible={visible} />
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{color: "white", padding: 5}}>
                        Login
                    </Title>{" "}
                    <Container size={200}>
                        <Stack spacing="lg">
                            <TextInput value={username} placeholder="Username" label="Username"
                                       onChange={(un) => setUsername(un.currentTarget.value)}/>
                            <PasswordInput value={password} placeholder="Password" label="Password"
                                           onChange={(pw) => setPassword(pw.currentTarget.value)}/>
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