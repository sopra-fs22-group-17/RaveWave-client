import {Button, Container, Group, Stack, Title} from "@mantine/core";
import {BaseContainer} from "components/ui/BaseContainer";
import {GameContext} from "contexts/GameContext";
import {useContext, useEffect} from "react";
import Lottie from "react-lottie";
import {Link} from "react-router-dom";
import animationData from "./lotties/RaveWaveAnimation.json";

export const LandingHost = (props) => {
    const context = useContext(GameContext);

    useEffect(() => {
        context.setUserRole("host");
    },);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{color: "white", padding: 20, align: "justify"}}>
                        RaveWave
                    </Title>
                    <Lottie options={defaultOptions} speed={1}/>
                    <Group sx={{paddingTop: 30}}>
                        <Link to="/register">
                            <Button size="md">
                                Register
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button size="md">
                                Login
                            </Button>
                        </Link>
                    </Group>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
