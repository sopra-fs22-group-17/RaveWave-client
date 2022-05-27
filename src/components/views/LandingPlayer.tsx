import {Button, Container, Group, LoadingOverlay, Stack, Title} from "@mantine/core";
import {BaseContainer} from "components/ui/BaseContainer";
import {GameContext} from "contexts/GameContext";
import {useContext, useEffect, useState} from "react";
import Lottie from "react-lottie";
import {Link, useHistory, useParams} from "react-router-dom";
import animationData from "./lotties/RaveWaveAnimation.json";
import customLoader from "./RWLogo";

export const LandingPlayer = (props) => {
    const context = useContext(GameContext);
    const {id} = useParams<any>();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const history = useHistory();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        context.setUserRole("player");
        sessionStorage.setItem('role', "player");
        if (id) {
            context.setLobbyId(id);
        }
    }, [id]);

    async function willGuest() {
        setVisible(true);
        history.push('/guest');
    }

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
            <LoadingOverlay visible={visible} loader={customLoader}/>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{color: "white", padding: 20}}>
                        RaveWave
                    </Title>
                    <Lottie options={defaultOptions} speed={1}/>
                    <Group sx={{paddingTop: 30}}>

                        <Button onClick={willGuest} size="md">
                            Guest
                        </Button>

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