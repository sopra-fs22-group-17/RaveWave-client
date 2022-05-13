import { Button, Container, TextInput, PasswordInput, Stack, Title } from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import { FC, useContext, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";

export const Register: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const history = useHistory();
    const { api, userRole, playerName } = context;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setrePassword] = useState('');

    const setUserName = (name: string) => {
        context.setPlayerName(name);
    };

    const redirectPath = userRole === "host" ? "/connectspotify" : "/game";

    async function doRegister() {
        try {
            if (password === repassword) {
                const confirmation = await api.registerUser(username, password);
                setUserName(username);
                context.setUserId(confirmation.id);
                context.info(`Player '${playerName}' registered.`);
                context.setUserRole("host");
                history.push("/connectspotify");
            } else {
                alert("your passwords don't match'");
            }
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
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
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
                        <Button onClick={doRegister} disabled={!username || !password || !repassword}>
                            Register
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
