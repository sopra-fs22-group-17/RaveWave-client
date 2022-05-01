import { Button, Container, Stack, Title } from "@mantine/core";
import { useContext, useEffect } from "react";
import Lottie from "react-lottie";
import { Link, useParams } from "react-router-dom";

import { BaseContainer } from "components/ui/BaseContainer";
import { GameContext } from "contexts/GameContext";

import animationData from "./lotties/RaveWaveAnimation.json";

export const LandingPlayer = (props) => {
    const context = useContext(GameContext);
    const { id } = useParams<any>();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    useEffect(() => {
        context.setUserRole("player");
        if (id) {
            context.setLobbyId(id);
        }
    }, [id]);

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        RaveWave Player
                    </Title>
                    <Lottie options={defaultOptions} speed={1} />
                    <Stack align="stretch">
                        <Button component={Link} to="/guest">
                            Guest
                        </Button>
                        <Button component={Link} to="/register">
                            Register
                        </Button>
                        <Button component={Link} to="/login">
                            Login
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
