import { Button, Container, Input, InputWrapper, Stack, Title } from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";

export const Guest: FC<{}> = ({}) => {
    const context = useContext(GameContext);

    const setUserName = (name: string) => {
        context.setPlayerName(name);
    };

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Guest
                    </Title>{" "}
                    <InputWrapper id="guestname" required label="Guest name" description="" error="">
                        <Input placeholder="Username" onChange={(evt) => setUserName(evt.target.value)} sx={{ backgroundColor: "#2f036b", color: "white" }} />
                    </InputWrapper>
                    <Stack align="stretch">
                        <Button component={Link} to="/game">
                            Continue
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
