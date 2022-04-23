import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/LandingPlayer.scss";
import { Button } from "@mantine/core";
import Lottie from "react-lottie";
import animationData from "./lotties/RaveWaveAnimation.json";

const LandingPlayer = (props) => {
    const history = useHistory();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <BaseContainer className="flex-column">
            <Button onClick={() => history.push('/landingplayer')} class="column-item">RaveWave Player</Button>
            <Lottie class="column-item" options={defaultOptions} speed={0.2}/>
            <Button onClick={() => history.push("/guest")} class="guest" width="100%">
                Guest
            </Button>
            <Button onClick={() => history.push("/register")} class="register" width="100%">
                Register
            </Button>
            <Button onClick={() => history.push("/login")} class="login" width="100%">
                Login
            </Button>
        </BaseContainer>
    );
};

export default LandingPlayer;