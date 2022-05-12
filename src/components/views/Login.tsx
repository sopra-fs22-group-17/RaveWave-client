import { Button, Container, Input, InputWrapper, PasswordInput, Stack, Title } from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";

export const Login: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const [password, setPassword] = useState(null);

    const setUserName = (name: string) => {
        context.setPlayerName(name);
    };

    const redirectPath = context.userRole === "host" ? "/selectgamemode" : "/game";

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Login
                    </Title>{" "}
                    <Container size={200}>
                        <Stack spacing="lg">
                            <InputWrapper id="username" required label="Username" description="" error="">
                                <Input
                                    placeholder="Username"
                                    onChange={(evt) => setUserName(evt.target.value)}
                                    sx={{ backgroundColor: "#2f036b", color: "white" }}
                                />
                            </InputWrapper>
                            <PasswordInput placeholder="Password" label="Password" description="" required onChange={(pw) => setPassword(pw)} />
                        </Stack>
                    </Container>
                    <Stack align="stretch">
                        <Button component={Link} to={redirectPath}>
                            Login
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
