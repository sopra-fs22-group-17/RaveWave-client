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
        <BaseContainer className="flex-column">
            <Button onClick={() => history.push("/landing")} class="column-item">
                RaveWave Host
            </Button>
            <Lottie class="column-item" options={defaultOptions} speed={0.2} />
            <Button onClick={() => history.push("/register")} class="register">
                Register
            </Button>
            <Button onClick={() => history.push("/login")} class="login">
                Login
            </Button>
        </BaseContainer>
    );
};

export default LandingHost;
