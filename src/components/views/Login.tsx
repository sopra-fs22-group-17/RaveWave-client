import {Button, Container, TextInput, PasswordInput, Stack, Title} from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import {FC, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {GameContext} from "../../contexts/GameContext";

export const Login: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const {api, userRole, playerName, currentURL} = context;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let redirectPath = "";

    if (currentURL.includes("landinghost")) {
        // host
        context.setUserRole("host");
        redirectPath = "/connectspotify";
    } else {
        // player
        context.setUserRole("player");
        redirectPath = "/game";
    }

    async function doLogin() {
        try {
            await api.loginUser(username, password);
            context.setPlayerName(username);
        } catch (error) {
            console.error(`Something went wrong while loggin in the user: \n${api.handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while loggin in the user! See the console for details.");
        }
    }

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{color: "white", padding: 20}}>
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
                    <Stack align="stretch">
                        <Link to={redirectPath}>
                            <Button onClick={doLogin} disabled={!username || !password}>
                                Login
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
