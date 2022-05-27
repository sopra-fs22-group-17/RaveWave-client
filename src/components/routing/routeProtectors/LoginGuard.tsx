import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const LoginGuard = (props) => {
    if (sessionStorage.getItem("raveWaverToken") && sessionStorage.getItem("role") === "host") {
        return <Redirect to="/selectgamemode" />;
    }
    // if user is already logged in, redirects to the main /app
    return props.children;
};

LoginGuard.propTypes = {
    children: PropTypes.node,
};
