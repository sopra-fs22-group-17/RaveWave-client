import { Button } from "@mantine/core";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/DisplayQR.scss";

const DisplayQR = (props) => {
    const history = useHistory();

    return (
        <BaseContainer className="displayqr">
            <div className="displayqr column-item">Let other Players join via QR Code</div>
            <Button onClick={() => history.push("/selectgamemode")} className="displayqr back">
                Back
            </Button>
            { // make button redirect to right game mode (via localstorage)
                }
            <Button onClick={() => history.push("/guesssong")} className="displayqr start">
                Start Game
            </Button>
        </BaseContainer>
    );
};

export default DisplayQR;
