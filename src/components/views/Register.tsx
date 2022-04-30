import { Button, Container, Input, InputWrapper, PasswordInput, Stack, Title } from "@mantine/core";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

export const Register: FC<{}> = ({}) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Register
                    </Title>{" "}
                    <Container size={200}>
                        <Stack spacing="lg">
                            <InputWrapper id="username" required label="Username" description="" error="">
                                <Input placeholder="Username" onChange={(un) => setUsername(un)} sx={{ backgroundColor: "#2f036b", color: "white" }} />
                            </InputWrapper>
                            <PasswordInput placeholder="Password" label="Password" description="" required onChange={(pw) => setPassword(pw)} />
                        </Stack>
                    </Container>
                    <Stack align="stretch">
                        <Button component={Link} to="/selectGameMode">
                            Register
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};