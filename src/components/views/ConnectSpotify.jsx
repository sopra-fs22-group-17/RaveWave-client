import { Button } from "@mantine/core";
import { Link } from "react-router";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/ConnectSpotify.scss";

const ConnectSpotify = (props) => {
    const history = useHistory();

    return (
        <BaseContainer className="container">
            <Button onClick={() => history.push('/')} class="connectSpotify">Connect Spotify</Button>
        </BaseContainer>
    );
};

export default ConnectSpotify;
