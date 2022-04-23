import { Button } from "@mantine/core";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/DisplayQR.scss";

const DisplayQR = (props) => {
    const history = useHistory();

    return (
        <BaseContainer className="game container">
            <p>Let other Players join via QR Code</p>
            <Button onClick={() => history.push("/selectgamemode")} className="displayqr backbutton" width="100%">
                Back
            </Button>
            <Button onClick={() => history.push("/guessthesong")} className="displayqr startgamebutton" width="100%">
                Start Game
            </Button>
        </BaseContainer>
    );
};

export default DisplayQR;
