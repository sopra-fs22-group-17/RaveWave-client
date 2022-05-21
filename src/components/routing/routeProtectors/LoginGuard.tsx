import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 */
export const LoginGuard = props => {
    if (sessionStorage.getItem("raveWaverToken")) {
        return <Redirect to="/selectgamemode"/>;
    }
    // if user is already logged in, redirects to the main /app
    return props.children;

};

LoginGuard.propTypes = {
    children: PropTypes.node
}