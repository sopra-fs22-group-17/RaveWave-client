import {Button, Container, Group, PasswordInput, Stack, TextInput, Title} from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import {FC, useContext, useState} from "react";
import {useHistory} from "react-router-dom";

import {GameContext} from "../../contexts/GameContext";


export const Register: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const {api, userRole, currentURL} = context;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setrePassword] = useState('');
    const history = useHistory();

    const [visible, setVisible] = useState(false);

    let redirectPath = "";
    let backPath = "";

    async function doRegister() {
        setVisible(true);
        if (currentURL.includes("landinghost")) {
            // host
            const roleofPlayer = "host";
            context.setUserRole(roleofPlayer);
            sessionStorage.setItem('role', roleofPlayer);
            redirectPath = "/connectspotify";
            backPath = "/landinghost";
        } else {
            // player
            const roleofPlayer = "player";
            context.setUserRole(roleofPlayer);
            sessionStorage.setItem('role', roleofPlayer);
            redirectPath = "/connectspotify";
            backPath = "/landingplayer";
        }

        try {
            const nameofPlayer = username;
            context.setPlayerName(nameofPlayer);
            sessionStorage.setItem('name', nameofPlayer);
            await api.registerUser(username, password);
            if (context.userRole === "player") {
                sessionStorage.setItem('lobbyId', context.lobbyId);
                await api.addPlayer(context.lobbyId, username);
            }
            history.push(redirectPath);
        } catch (error) {
            console.error(`Something went wrong while registering the user: \n${api.handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while registering the user! See the console for details.");
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
                        Register
                    </Title>{" "}
                    <Container size={200}>
                        <Stack spacing="lg">
                            <TextInput value={username} placeholder="Username" label="Username"
                                       onChange={(un) => setUsername(un.currentTarget.value)}/>
                            <PasswordInput value={password} placeholder="Password" label="Password"
                                           onChange={(pw) => setPassword(pw.currentTarget.value)}/>
                            <PasswordInput value={repassword} placeholder="Password" label="Password"
                                           onChange={(rpw) => setrePassword(rpw.currentTarget.value)}/>
                        </Stack>
                    </Container>
                    <Group sx={{ paddingTop: 10, boxShadow: "rgba(0, 0, 0, 0.3) 15px 34px 53px, rgba(0, 0, 0, 0.22) 15px 30px 27px" }}>
                        <Button onClick={doBack} size="md">
                            Back
                        </Button>
                        <Button onClick={doRegister}
                                disabled={!username || !password || !repassword || (password !== repassword)} size="md">
                            Register
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </BaseContainer>
    );
};