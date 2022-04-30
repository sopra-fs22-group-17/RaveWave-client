import { Button, Container, Input, InputWrapper, Stack, Title } from "@mantine/core";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

export const Guest: FC<{}> = ({}) => {
    const [username, setUsername] = useState(null);

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Guest
                    </Title>{" "}
                    <InputWrapper id="guestname" required label="Guest name" description="" error="">
                        <Input placeholder="Username" onChange={(un) => setUsername(un)} sx={{ backgroundColor: "#2f036b", color: "white" }} />
                    </InputWrapper>
                    <Stack align="stretch">
                        <Button component={Link} to="/landingplayer">
                            Back
                        </Button>
                        <Button component={Link} to="/waitingroom">
                            Continue
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
