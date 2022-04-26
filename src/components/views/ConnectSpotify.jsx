import { Button } from "@mantine/core";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/ConnectSpotify.scss";

const ConnectSpotify = (props) => {
    const history = useHistory();

    return (
        <BaseContainer className="container">
            <Button onClick={() => history.push("/selectgamemode")} className="container back">
                Back
            </Button>
            <Button onClick={() => history.push("/displayqr")} className="container connectSpotify">
                Connect Spotify
            </Button>
        </BaseContainer>
    );
};

export default ConnectSpotify;
