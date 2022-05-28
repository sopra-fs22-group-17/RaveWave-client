import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export const LoginGuard = (props) => {
    if (sessionStorage.getItem("raveWaverToken") && sessionStorage.getItem("role") === "host") {
        return <Redirect to="/selectgamemode" />;
    }
    return props.children;
};

LoginGuard.propTypes = {
    children: PropTypes.node,
};
