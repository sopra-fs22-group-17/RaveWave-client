import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export const PlayerGuard = (props) => {
    if (sessionStorage.getItem("token")) {
        return props.children;
    }
    return <Redirect to="/landingplayer" />;
};

PlayerGuard.propTypes = {
    children: PropTypes.node,
};
