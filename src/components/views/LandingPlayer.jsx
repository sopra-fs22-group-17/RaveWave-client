import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/LandingPlayer.scss";
import { Button } from "@mantine/core";

const LandingPlayer = (props) => {
    const history = useHistory();

    return (
        <BaseContainer className="game container">
            <p>RaveWave Player</p>
            <Button onClick={() => history.push("/guest")} className="guest button" width="100%">
                Guest
            </Button>
            <Button onClick={() => history.push("/login")} className=" login button" width="100%">
                Login
            </Button>
            <Button onClick={() => history.push("/register")} className=" register button" width="100%">
                Register
            </Button>
        </BaseContainer>
    );
};

export default LandingPlayer;