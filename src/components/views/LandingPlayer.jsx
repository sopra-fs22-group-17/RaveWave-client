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
        <BaseContainer className="container">
            <Button onClick={() => history.push('/landingplayer')} class="column-item">RaveWave Player</Button>
            <Lottie class="column-item" options={defaultOptions} speed={0.2}/>
            <Button onClick={() => history.push("/guest")} className="container back">
                Guest
            </Button>
            <Button onClick={() => history.push("/register")} className="container start">
                Register
            </Button>
            <Button onClick={() => history.push("/guesssong")} className="container continue">
                Login
            </Button>
        </BaseContainer>
    );
};

export default LandingPlayer;
