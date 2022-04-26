import {Button} from "@mantine/core";
import {useHistory} from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/LandingPlayer.scss";
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
        <BaseContainer className="landingplayer">
            <Button onClick={() => history.push('/landingplayer')} class="landingplayer column-item">RaveWave Player</Button>
            <Lottie class="column-item" options={defaultOptions} speed={0.2}/>
            <Button onClick={() => history.push("/guest")} className="landingplayer guest">
                Guest
            </Button>
            <Button onClick={() => history.push("/register")} className="landingplayer register">
                Register
            </Button>
            <Button onClick={() => history.push("/login")} className="landingplayer login">
                Login
            </Button>
        </BaseContainer>
    );
};

export default LandingPlayer;
