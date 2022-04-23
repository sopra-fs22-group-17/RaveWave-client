import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/ConnectSpotify.scss";
import { Button } from "@mantine/core";
import { Link } from "react-router";

const ConnectSpotify = (props) => {
    const history = useHistory();

    return (
        <BaseContainer className="game container">
            <p>Connect with Spotify</p>
            <Button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "http://google.com";
                }}
            >
                {" "}
                Click here
            </Button>
        </BaseContainer>
    );
};

export default ConnectSpotify;