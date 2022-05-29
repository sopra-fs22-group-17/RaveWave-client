import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export const SpotifyGuard = (props) => {
    if (sessionStorage.getItem("spotifyAccess")) {
        return props.children;
    }
    return <Redirect to="/connectspotify" />;
};

SpotifyGuard.propTypes = {
    children: PropTypes.node,
};
