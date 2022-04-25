import { Button } from "@mantine/core";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import animationData from "./lotties/RaveWaveAnimation.json";

import "styles/views/LandingHost.scss";

const LandingHost = (props) => {
    // use react-router-dom's hook to access the history
    const history = useHistory();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <BaseContainer className="container">

            <Button onClick={() => history.push('/landinghost')} class="column-item">RaveWave Host</Button>
            <Lottie class="column-item" options={defaultOptions} speed={0.2}/>
            <Button onClick={() => history.push("/register")} className="container back">
                Register
            </Button>
            <Button onClick={() => history.push("/login")} className="container start">
                Login
            </Button>

        </BaseContainer>
    );
};

export default LandingHost;
