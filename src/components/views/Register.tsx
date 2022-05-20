import {Button, Container, TextInput, PasswordInput, Stack, Title} from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import {FC, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {GameContext} from "../../contexts/GameContext";

export const Register: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const {api, userRole, currentURL} = context;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setrePassword] = useState('');

    let redirectPath = "";

    if (currentURL.includes("landinghost")) {
        // host
        const roleofPlayer = "host";
        context.setUserRole(roleofPlayer);
        sessionStorage.setItem('role', roleofPlayer);
        redirectPath = "/connectspotify";
    } else {
        // player
        const roleofPlayer = "player";
        context.setUserRole(roleofPlayer);
        sessionStorage.setItem('role', roleofPlayer);
        redirectPath = "/game";
    }

    async function doRegister() {
        try {
            const nameofPlayer = username;
            context.setPlayerName(nameofPlayer);
            sessionStorage.setItem('name', nameofPlayer);
            await api.registerUser(username, password);
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
                    <Stack align="stretch">
                        <Link to={redirectPath}>
                            <Button onClick={doRegister}
                                    disabled={!username || !password || !repassword || !(password === repassword)}>
                                Register
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
