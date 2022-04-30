import { Button, Container, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

export const ConnectSpotify: FC<{}> = ({}) => {
    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Connect Spotify
                    </Title>{" "}
                    <Stack align="stretch">
                        <Button color="green" component={Link} to="/selectGameMode">
                            Authorize Spotify
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
