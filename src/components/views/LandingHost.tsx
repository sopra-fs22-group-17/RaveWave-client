import {Button, Container, Group, LoadingOverlay, Stack, Title} from "@mantine/core";
import {BaseContainer} from "components/ui/BaseContainer";
import {GameContext} from "contexts/GameContext";
import {useContext, useEffect, useState} from "react";
import Lottie from "react-lottie";
import {Link, useHistory} from "react-router-dom";
import animationData from "./lotties/RaveWaveAnimation.json";

export const LandingHost = (props) => {
    const context = useContext(GameContext);
    const history = useHistory();
    const [visible, setVisible] = useState(false);

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

    async function willRegister() {
        setVisible(true);
        history.push('/register');
    }

    async function willLogin() {
        setVisible(true);
        history.push('/login');
    }

    return (
        <BaseContainer>
            <LoadingOverlay visible={visible} />
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{color: "white", padding: 20, align: "justify"}}>
                        RaveWave
                    </Title>
                    <Lottie options={defaultOptions} speed={1}/>
                    <Group sx={{paddingTop: 30}}>
                            <Button onClick={willRegister} size="md">
                                Register
                            </Button>
                            <Button onClick={willLogin} size="md">
                                Login
                            </Button>
                    </Group>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
